#!/bin/bash
# publish-to-nostr.sh - Publish Markdown articles to Nostr
# Usage: ./publish-to-nostr.sh /path/to/article.md

ARTICLE_PATH="$1"

if [ -z "$ARTICLE_PATH" ]; then
  echo "Usage: $0 /path/to/article.md"
  exit 1
fi

if [ ! -f "$ARTICLE_PATH" ]; then
  echo "Error: File not found: $ARTICLE_PATH"
  exit 1
fi

# Extract frontmatter metadata
TITLE=$(grep '^title:' "$ARTICLE_PATH" | sed 's/^title: *"\(.*\)"/\1/')
D_TAG=$(grep '^slug:' "$ARTICLE_PATH" | sed 's/^slug: *//;s/"//g')
SUMMARY=$(grep '^description:' "$ARTICLE_PATH" | sed 's/^description: *"\(.*\)"/\1/')
IMAGE=$(grep '^heroImage:' "$ARTICLE_PATH" | sed 's/^heroImage: *//;s/"//g')

# Extract tags (supports YAML list format and inline format)
TAGS=()

# YAML list format
while IFS= read -r tag; do
  tag=$(echo "$tag" | tr -d '[:space:]')
  if [ -n "$tag" ]; then
    TAGS+=("$tag")
  fi
done < <(sed -n '/^tags:/,/^[a-z]/p' "$ARTICLE_PATH" | grep '^ *- ' | sed 's/^ *- //')

# Fallback: Inline format
if [ ${#TAGS[@]} -eq 0 ]; then
  TAGS_LINE=$(grep '^tags:' "$ARTICLE_PATH" | head -1)
  if [ -n "$TAGS_LINE" ]; then
    TAGS_RAW=$(echo "$TAGS_LINE" | sed 's/^tags: *\[//;s/\].*//;s/"//g;s/,/ /g')
    for tag in $TAGS_RAW; do
      tag=$(echo "$tag" | xargs)
      if [ -n "$tag" ]; then
        TAGS+=("$tag")
      fi
    done
  fi
fi

if [ -z "$TITLE" ] || [ -z "$D_TAG" ]; then
  echo "❌ Error: Could not extract title or slug from frontmatter"
  exit 1
fi

# Extract content (everything after the second ---)
CONTENT=$(awk '/^---$/{ if (++count == 2) {p=1; next} } p' "$ARTICLE_PATH")

# Get nsec from macOS Keychain (secure!)
echo "🔑 Loading nsec from Keychain..."
NOSTR_NSEC=$(security find-generic-password -a "$USER" -s "nostr-nsec" -w 2>/dev/null)

if [ -z "$NOSTR_NSEC" ]; then
  echo ""
  echo "❌ Error: nsec not found in Keychain"
  echo ""
  echo "First-time setup:"
  echo "  security add-generic-password -a \"\$USER\" -s \"nostr-nsec\" -w \"nsec1...\""
  echo ""
  echo "Or set temporarily:"
  echo "  export NOSTR_NSEC='nsec1...'"
  exit 1
fi

# Your relays (publish to all)
RELAYS=(
  "wss://relay.stevennoack.de"
  "wss://relay.primal.net"
  "wss://nos.lol"
  "wss://relay.nostr.band"
  "wss://nostr.pareto.space"
)

# Relays for naddr encoding (keep short)
NADDR_RELAYS=(
  "wss://relay.stevennoack.de"
  "wss://relay.primal.net"
  "wss://nos.lol"
)

echo "📝 Publishing to Nostr:"
echo "  Title: $TITLE"
echo "  D-Tag: $D_TAG"
if [ -n "$IMAGE" ]; then
  echo "  Image: $IMAGE"
fi
if [ ${#TAGS[@]} -gt 0 ]; then
  echo "  Tags: ${TAGS[*]}"
fi
echo "  Content: $(echo "$CONTENT" | wc -c | tr -d ' ') bytes"
echo "  Relays: ${#RELAYS[@]}"
echo ""

# Publish with nak
# Kind 30023 = Long-form Content

CMD="nak event -k 30023"
CMD="$CMD --content $(printf %q "$CONTENT")"
CMD="$CMD --tag title=$(printf %q "$TITLE")"
CMD="$CMD --tag d=$(printf %q "$D_TAG")"
CMD="$CMD --tag summary=$(printf %q "$SUMMARY")"
CMD="$CMD --tag published_at=$(date +%s)"
CMD="$CMD --sec $NOSTR_NSEC"

if [ -n "$IMAGE" ]; then
  CMD="$CMD --tag image=$(printf %q "$IMAGE")"
fi

# Add hashtags as t tags
for tag in "${TAGS[@]}"; do
  CMD="$CMD --tag t=$(printf %q "$tag")"
done

# Add relays individually
for relay in "${RELAYS[@]}"; do
  CMD="$CMD $relay"
done

# Execute the command
EVENT_OUTPUT=$(eval "$CMD" 2>&1)

# Extract event ID from JSON output
EVENT_ID=$(echo "$EVENT_OUTPUT" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

if [ -z "$EVENT_ID" ]; then
  echo "❌ Error: Could not extract Event ID. Output:"
  echo "$EVENT_OUTPUT"
  exit 1
fi

# Extract signature from event output
EVENT_SIG=$(echo "$EVENT_OUTPUT" | grep -o '"sig":"[^"]*"' | head -1 | cut -d'"' -f4)

echo ""
echo "✅ Published successfully!"

# === AUTO-UPDATE SIG IN FRONTMATTER ===
if [ -n "$EVENT_SIG" ]; then
  echo ""
  echo "🔐 Updating sig in frontmatter..."
  
  # Check if sig field already exists
  if grep -q '^sig:' "$ARTICLE_PATH"; then
    # Update existing sig
    sed -i '' "s|^sig:.*|sig: \"$EVENT_SIG\"|" "$ARTICLE_PATH"
    echo "  ✅ sig updated"
  else
    # Add sig after description line
    sed -i '' "/^description:/a\\
sig: \"$EVENT_SIG\"
" "$ARTICLE_PATH"
    echo "  ✅ sig added"
  fi
  
  echo "  → ${EVENT_SIG:0:16}...${EVENT_SIG: -8}"
fi
echo ""

# Generate both nevent and naddr
# WICHTIG: nak key public gibt HEX zurück, nicht npub!
PUBKEY_HEX=$(nak key public "$NOSTR_NSEC")
NPUB=$(nak encode npub "$PUBKEY_HEX")

# nevent with relays (zeigt auf dieses spezifische Event)
NEVENT=$(nak encode nevent "$EVENT_ID" \
  --author "$PUBKEY_HEX" \
  --relay "wss://relay.stevennoack.de" \
  --relay "wss://relay.primal.net" \
  --relay "wss://nos.lol")

# naddr with relays (zeigt immer auf neueste Version!)
NADDR=$(nak encode naddr \
  --kind 30023 \
  --pubkey "$PUBKEY_HEX" \
  --identifier "$D_TAG" \
  --relay "${NADDR_RELAYS[0]}" \
  --relay "${NADDR_RELAYS[1]}" \
  --relay "${NADDR_RELAYS[2]}")

TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

echo "📋 Event IDs:"
echo "  nevent: $NEVENT"
echo "  naddr:  $NADDR"
echo "  hex:    $EVENT_ID"
echo "  npub:   $NPUB"
echo "  sig:    ${EVENT_SIG:0:16}...${EVENT_SIG: -8}"
echo ""
echo "🔗 View on:"
echo "  • njump (naddr): https://njump.me/$NADDR"
echo "  • Habla:         https://habla.news/a/$NADDR"
echo "  • Your site:     https://stevennoack.de/nostr/read/$NADDR"
echo ""
echo "  (nevent für diese Version: https://njump.me/$NEVENT)"

# Save publishing log
LOG_DIR="$HOME/dev/mein-garten/nostr-artikel/.published"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/$D_TAG.txt"

cat > "$LOG_FILE" << EOF
# Nostr Publishing Log
# Generated: $TIMESTAMP

Title: $TITLE
Slug: $D_TAG
Published: $TIMESTAMP
Tags: ${TAGS[*]}

## Event IDs
naddr:  $NADDR   ← TEILE DIESEN (immer aktuelle Version)
nevent: $NEVENT  ← Diese spezifische Version
hex:    $EVENT_ID
npub:   $NPUB
pubkey: $PUBKEY_HEX
sig:    $EVENT_SIG

## URLs
njump:     https://njump.me/$NADDR
Habla:     https://habla.news/a/$NADDR
Your site: https://stevennoack.de/nostr/read/$NADDR

## Metadata
Content size: $(echo "$CONTENT" | wc -c | tr -d ' ') bytes
Relays: ${RELAYS[*]}
EOF

echo "💾 Log saved: $LOG_FILE"

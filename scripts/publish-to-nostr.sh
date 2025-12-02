#!/bin/bash
# publish-to-nostr.sh - Publish Markdown articles to Nostr
# Usage: ./publish-to-nostr.sh /path/to/article.md

set -e

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

if [ -z "$TITLE" ] || [ -z "$D_TAG" ]; then
  echo "❌ Error: Could not extract title or slug from frontmatter"
  exit 1
fi

# Extract content (everything after the second ---)
CONTENT=$(awk '/^---$/{ if (++count == 2) {p=1; next} } p' "$ARTICLE_PATH")

# Get nsec from macOS Keychain (secure!)
echo "🔐 Loading nsec from Keychain..."
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

# Your relays
RELAYS=(
  "wss://relay.stevennoack.de"
  "wss://relay.primal.net"
  "wss://nos.lol"
)

echo "📝 Publishing to Nostr:"
echo "  Title: $TITLE"
echo "  D-Tag: $D_TAG"
echo "  Content: $(echo "$CONTENT" | wc -c | tr -d ' ') bytes"
echo "  Relays: ${#RELAYS[@]}"
echo ""

# Publish with nak
# Kind 30023 = Long-form Content
# Relays are passed as arguments at the end
# Capture the event JSON output to extract the event ID
EVENT_OUTPUT=$(nak event -k 30023 \
  --content "$CONTENT" \
  --tag "title=$TITLE" \
  --tag "d=$D_TAG" \
  --tag "summary=$SUMMARY" \
  --tag "published_at=$(date +%s)" \
  --sec "$NOSTR_NSEC" \
  "${RELAYS[@]}")

# Extract event ID from JSON output
EVENT_ID=$(echo "$EVENT_OUTPUT" | grep -o '"id":"[^"]*"' | head -1 | cut -d'"' -f4)

echo ""
echo "✅ Published successfully!"
echo ""

# Generate both nevent and naddr
NPUB=$(nak key public "$NOSTR_NSEC")

# nevent with relays (this is what works!)
NEVENT=$(nak encode nevent "$EVENT_ID" \
  --author "$NPUB" \
  --relay "wss://relay.stevennoack.de" \
  --relay "wss://relay.primal.net" \
  --relay "wss://nos.lol")

# naddr with relays (for reference)
NADDR=$(nak encode naddr --kind 30023 --pubkey "$NPUB" --identifier "$D_TAG" \
  --relay "wss://relay.stevennoack.de" \
  --relay "wss://relay.primal.net" \
  --relay "wss://nos.lol")

TIMESTAMP=$(date "+%Y-%m-%d %H:%M:%S")

echo "📋 Event IDs:"
echo "  nevent: $NEVENT (← use this everywhere!)"
echo "  hex:    $EVENT_ID"
echo ""
echo "🔗 URLs:"
echo "  • Your site: https://stevennoack.de/nostr/read/$NEVENT"
echo "  • Habla:     https://habla.news/a/$NPUB/$D_TAG"
echo "  • njump:     https://njump.me/$NEVENT"
echo ""
echo "⚠️  Note: naddr doesn't work reliably with nostr-tools"
echo "    Use nevent for all URLs!"

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

## Event IDs
naddr:  $NADDR (primary - always latest version)
nevent: $NEVENT (specific version)
hex:    $EVENT_ID
npub:   $NPUB

## Primary URLs (use these!)
Your site: https://stevennoack.de/nostr/read/$NADDR
Habla:     https://habla.news/a/$NPUB/$D_TAG

## Fallback URLs
njump:     https://njump.me/$NEVENT

## Metadata
Content size: $(echo "$CONTENT" | wc -c | tr -d ' ') bytes
Relays: ${RELAYS[@]}
EOF

echo ""
echo "💾 Log saved: $LOG_FILE"

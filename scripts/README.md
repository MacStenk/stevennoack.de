# Nostr Publishing Scripts

## publish-to-nostr.sh

Publisht Markdown-Artikel aus Obsidian direkt zu Nostr (Kind 30023 - Long-form Content).

### Setup

1. **Installiere nak:**
   ```bash
   brew install nak
   ```

2. **Speichere dein nsec sicher im macOS Keychain:**
   ```bash
   security add-generic-password -a "$USER" -s "nostr-nsec" -w "nsec1..."
   ```
   
   ✅ **Sicher:** Verschlüsselt, durch dein Login-Passwort geschützt  
   ✅ **Persistent:** Überlebt Terminal-Neustarts  
   ✅ **Privat:** Nur für deinen User lesbar  
   
   **Alternativ** (temporär, nur für diese Session):
   ```bash
   export NOSTR_NSEC='nsec1...'
   ```

### Usage

```bash
./scripts/publish-to-nostr.sh /path/to/mein-garten/nostr-artikel/artikel.md
```

### Was es macht

1. Liest dein Markdown aus Obsidian
2. Extrahiert Frontmatter (title, slug, description)
3. Nimmt den **kompletten Content** (nicht wie das Plugin gekürzt)
4. Published als Kind 30023 Event zu deinen Relays
5. Zeigt dir die URLs zum Anschauen

### Frontmatter-Anforderungen

Dein Artikel braucht mindestens:
```yaml
---
title: "Artikel Titel"
slug: artikel-slug
description: "Kurze Beschreibung"
---
```

Der Rest des Frontmatters wird ignoriert, aber der **gesamte Content nach dem Frontmatter** wird published.

### Beispiel

```bash
# Artikel publishen
./scripts/publish-to-nostr.sh ~/dev/mein-garten/nostr-artikel/bilder-metadaten-branding.md

# Output:
# 📝 Publishing to Nostr:
#   Title: Deine Bilder sprechen nicht. Noch nicht.
#   D-Tag: bilder-metadaten-branding
#   Content: 15234 bytes
#   Relays: 3
# 
# ✅ Published successfully!
# 
# View on:
#   • Habla: https://habla.news/a/npub1.../bilder-metadaten-branding
#   • njump: https://njump.me/naddr1...
#   • Your site: https://stevennoack.de/nostr/read/naddr1...
```

### Relays

Default:
- `wss://relay.stevennoack.de`
- `wss://relay.primal.net`
- `wss://nos.lol`

Du kannst die Liste im Script anpassen.

#!/bin/bash
# setup-nostr-key.sh - Einmalige Einrichtung deines Nostr nsec im Keychain

echo "🔐 Nostr Key Setup"
echo ""
echo "Dein nsec wird sicher im macOS Keychain gespeichert."
echo "Er ist verschlüsselt und nur mit deinem Login-Passwort zugänglich."
echo ""

read -p "Gib dein nsec ein (nsec1...): " NSEC

if [[ ! "$NSEC" =~ ^nsec1 ]]; then
  echo ""
  echo "❌ Error: Das sieht nicht nach einem nsec aus (sollte mit 'nsec1' starten)"
  exit 1
fi

# Speichern im Keychain
security add-generic-password -a "$USER" -s "nostr-nsec" -w "$NSEC" 2>/dev/null

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ nsec erfolgreich im Keychain gespeichert!"
  echo ""
  echo "Testen:"
  echo "  ./scripts/publish-to-nostr.sh /path/to/artikel.md"
else
  # Möglicherweise existiert schon ein Eintrag
  echo ""
  echo "⚠️  Ein nsec ist bereits im Keychain gespeichert."
  echo ""
  read -p "Überschreiben? [y/N]: " OVERWRITE
  
  if [[ "$OVERWRITE" =~ ^[Yy]$ ]]; then
    security delete-generic-password -a "$USER" -s "nostr-nsec" 2>/dev/null
    security add-generic-password -a "$USER" -s "nostr-nsec" -w "$NSEC"
    echo "✅ nsec aktualisiert!"
  else
    echo "Abgebrochen."
    exit 1
  fi
fi

echo ""
echo "🚀 Du kannst jetzt Artikel publishen:"
echo "   ./scripts/publish-to-nostr.sh ~/dev/mein-garten/nostr-artikel/artikel.md"

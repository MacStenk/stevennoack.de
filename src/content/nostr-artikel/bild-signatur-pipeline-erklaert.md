---
# === TITEL & SLUG ===
title: "Wie du beweisen kannst, dass ein Bild dir gehört"
subtitle: "Die VisionFusen Bild-Signatur Pipeline – so einfach erklärt, dass es jeder versteht"
slug: bild-signatur-pipeline-erklaert
description: "Digitale Bild-Signierung verständlich erklärt: Unsichtbare Stempel, Fingerabdrücke und digitale Notare. Plus: Der komplette technische Workflow."
type: long-artikel

# === KATEGORISIERUNG ===
category: tutorial
tags:
  - visionfusen
  - bild-signatur
  - nostr
  - nip-94
  - tutorial
  - workflow

# === TIMESTAMPS ===
date: 2026-01-28
created: 2026-01-28T11:00
modified: 2026-01-28T12:15
published_at: ""

# === STATISTIKEN ===
word_count: 900
reading_time: 5min

# === HERO IMAGE (von VisionFusen signiert) ===
heroImage: "https://cdn.visionfusen.org/images/bild-signatur-pipeline-dein-bild-bekommt-einen-ausweis.vf1063-1e30d00a.webp"
heroImageAlt: "Dunkles Bild mit türkisfarbenen Akzenten. Links ein stilisierter Bilderrahmen, in der Mitte fließen leuchtende Datenströme nach rechts. Rechts sind drei Symbole sichtbar: ein Stempel, ein Fingerabdruck und ein Siegel. Oben steht in weißer Schrift Dein Bild bekommt einen Ausweis, darunter in Cyan Für immer. Unten rechts steht klein stevennoack.de."
heroImageCaption: "Dein Bild bekommt einen Ausweis – für immer."
heroImageHash: "1e30d00a7af4bd4878ee2254f5c01ed9dae00b732be758bc0ff0a00efeb19c77"
heroImageEvent: "b84a33a757c1da7a862fae75767a7aee954be3fb69f8c737119188942abf8409"

# === OPEN GRAPH / SOCIAL ===
ogImage: "https://cdn.visionfusen.org/images/bild-signatur-pipeline-dein-bild-bekommt-einen-ausweis.vf1063-1e30d00a.webp"
ogImageAlt: "Dunkles Bild mit türkisfarbenen Akzenten. Links ein stilisierter Bilderrahmen, in der Mitte fließen leuchtende Datenströme nach rechts. Rechts sind drei Symbole sichtbar: ein Stempel, ein Fingerabdruck und ein Siegel. Oben steht in weißer Schrift Dein Bild bekommt einen Ausweis, darunter in Cyan Für immer. Unten rechts steht klein stevennoack.de."

# === PUBLISHING STATUS ===
status: published
canonical_url: "https://stevennoack.de/nostr/artikel/bild-signatur-pipeline-erklaert"

# === NOSTR (Kind 30023 = Long-form) ===
nostr:
  kind: 30023
  d_tag: bild-signatur-pipeline-erklaert
  published: true
  note_id: "6f0a4a4a2a56a4bdb06a34661474b337760ad8230c1396fbd6aa508a86640087"
  naddr: "naddr1qq0ky6tvvskhx6t8deshgatj94cxjur9d35kuefdv4exkmrpv4e8gqg6waehxw309aex2mrp0yh8xar9wejkumn0v93kktnyv5q3vamnwvaz7tmjv4kxz7fwwpexjmtpdshxuet5qyxhwumn8ghj7mn0wvhxcmmvqgsvrwh57axds2vk8q5trk5dw0jjej2v4fkcmj2y7l9y2zn4cjenz8crqsqqqa28gt3rsq"
  relays:
    - wss://relay.stevennoack.de
    - wss://relay.visionfusen.org.de
    - wss://relay.primal.net
    - wss://nos.lol
    - wss://relay.nostr.band

# === VISIONFUSEN SIGNATUR ===
visionfusen:
  article_signed: false
  article_event_id: ""
  article_hash: ""

# === SYNC-KANÄLE ===
substack:
  published: false
  url: ""

# === AUTOR ===
author: Steven Noack
author_nip05: steven@stevennoack.de
author_npub: npub1cxa0fa6vmq5evwpgk8dg6ul99ny5e2nd3hy5fa72g598t39nxy0surzuva
author_url: https://stevennoack.de

# === LIZENZ ===
license: CC BY 4.0
license_url: https://creativecommons.org/licenses/by/4.0/

# === SCHEMA.ORG ===
schema:
  type: Article
  datePublished: 2026-01-28
  dateModified: 2026-01-28
  author:
    type: Person
    name: Steven Noack
    url: https://stevennoack.de

# === TRANSPARENZ ===
ai_disclosure:
  written_by: "Claude (Anthropic)"
  source: "MCP-Zugriff auf Vault + vergangene Chats"
  human_reviewed: true
---

> [!abstract]- **Darum geht's**
> Deine Bilder im Internet haben keinen Ausweis. Jeder kann sie klauen und behaupten, sie wären seine. Mit der VisionFusen Pipeline bekommt jedes Bild einen unsichtbaren Stempel, zwei Fingerabdrücke und wird bei einem digitalen Notar registriert – für immer, auf tausenden Computern weltweit.

> [!tldr]- **Das Wichtigste**
> - **Metadaten:** Unsichtbare Informationen IN deinem Bild (Autor, Lizenz, Beschreibung)
> - **SHA-256:** Exakter Fingerabdruck – ändert sich bei jedem Pixel
> - **pHash:** Visueller Fingerabdruck – erkennt das Bild auch nach Crop/Resize
> - **Nostr:** Dezentraler "Notar" – speichert den Beweis auf tausenden Servern
> - **VisionFusen:** Die Pipeline die alles automatisch macht

---

# Wie du beweisen kannst, dass ein Bild dir gehört

*5 Minuten Lesezeit*

## Das Problem – einfach erklärt

**Stell dir vor, du malst ein Bild.**

Du bist stolz darauf und willst es im Internet zeigen. Aber was passiert, wenn jemand es klaut und sagt "Das hab ICH gemalt!"?

Früher konntest du nur sagen: "Nein, das war ich!" Aber beweisen? Schwierig.

---

## Die Lösung – in drei Schritten

**Schritt 1: Stempel drauf**

Wie wenn du hinten auf dein Bild schreibst: "Gemalt von Max, 28. Januar 2026". Nur dass wir es *in* das Bild reinschreiben, unsichtbar. Das sind die **Metadaten**.

**Schritt 2: Fingerabdruck nehmen**

Wir machen zwei Fingerabdrücke vom Bild:
- Einen **exakten** (SHA-256) – wie ein Barcode, der sich ändert wenn sich auch nur ein Pixel ändert
- Einen **ungefähren** (pHash) – erkennt das Bild auch wenn jemand es zuschneidet oder kleiner macht

**Schritt 3: Zum digitalen Notar**

Wir gehen zu einem "digitalen Notar" (das Nostr-Protokoll) und sagen: "Dieses Bild mit diesem Fingerabdruck gehört Max, heute um 10:23 Uhr."

Das wird auf vielen Computern weltweit gespeichert. Keiner kann es löschen.

---

## Wenn jemand dein Bild klaut

Du lädst die geklaute Version hoch → Wir vergleichen den Fingerabdruck → "Hey, das ist zu 94% das Bild von Max vom 28. Januar!"

**Beweis. Fertig.**

*Es ist wie ein unsichtbares, unfälschbares Namensschild, das für immer an deinem Bild klebt.*

---

## Die technische Pipeline

So sieht der Workflow in der Praxis aus:

```
PNG/JPEG hochladen
       ↓
WebP konvertieren (cwebp -q 85)
       ↓
Metadaten schreiben (exiftool - volle Breitseite mit CC BY 4.0)
       ↓
VisionFusen signieren (API Call)
       ↓
Automatisch: SHA-256 + pHash + R2 CDN + 4 Relays + KV-Index
       ↓
Fertig. Verifizierbar. Für immer.
```

---

## Schritt für Schritt

### 1. WebP konvertieren

```bash
cwebp -q 85 input.png -o output.webp
```

### 2. Metadaten schreiben ( vereinfacht )

```bash
exiftool \
  -Title="Bild-Signatur Pipeline: Dein Bild bekommt einen Ausweis" \
  -Description="[Semantische Beschreibung für LLMs]" \
  -ImageDescription="[Visuelle Beschreibung für Screenreader]" \
  -Creator="Steven Noack" \
  -Copyright="© 2026 Steven Noack" \
  ...
  ...
  ...
  ...
  ...
  '-XMP-cc:License=https://creativecommons.org/licenses/by/4.0/' \
  '-XMP-iptcExt:DigitalSourceType=http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia' \
  output.webp
```

### 3. VisionFusen signieren

Das Bild wird über die VisionFusen API signiert und auf Nostr veröffentlicht.

---

## Was dann automatisch passiert

1. **SHA-256 Hash** berechnen
2. **pHash** berechnen (Perceptual Hash für Bild-Erkennung)
3. **Duplikat-Check** auf Relays
4. **NIP-94 Event** erstellen (Kind 1063)
5. **Bunker signieren** (mit key_name)
6. **R2 Upload** → `cdn.visionfusen.org/DeineBilder/...`
7. **4 Relays publishen** (damus, primal, nos.lol, visionfusen)
8. **KV-Index** speichern (pHash → Event für Reverse-Lookup)
9. **Statische Event-Page** generieren

---

## DigitalSourceType – wichtig für AI-Bilder

| Wert | Verwendung |
|------|------------|
| `trainedAlgorithmicMedia` | AI-generierte Bilder (NotebookLM, DALL-E, Midjourney) |
| `digitalCapture` | Screenshots, Fotos, Bildschirmaufnahmen |
| `compositeWithTrainedAlgorithmicMedia` | Mix aus AI + manuelle Bearbeitung |

---

## SHA-256 vs pHash – der Unterschied

| Kriterium | SHA-256 | pHash |
|-----------|---------|-------|
| Länge | 64 Zeichen | 16 Zeichen |
| Erkennt Duplikate | ❌ Nur exakt | ✅ Auch modifiziert |
| Kryptografisch | ✅ Ja | ❌ Nein |
| Verwendung | Datei-Integrität | Bild-Erkennung |

**SHA-256** = Beweis dass die Datei unverändert ist
**pHash** = Erkennt das Bild auch nach Manipulation (Crop, Resize, Screenshot)

---

## Verifizieren

### Per Hash

```bash
curl "https://visionfusen.org/Dein-api-Key/verify?hash=417a77b5..."
```

### Per Web-Interface

**Sieh selbst:** [Verifiziere das Hero-Image dieses Artikels →](https://visionfusen.org/verify?hash=1e30d00a7af4bd4878ee2254f5c01ed9dae00b732be758bc0ff0a00efeb19c77)

---

## Die Infrastruktur dahinter

| Service | Zweck |
|---------|-------|
| **VisionFusen API** | Signierung, Verifizierung |
| **Bunker (Railway)** | nsecBunker für Key Management |
| **R2 (Cloudflare)** | CDN für Bilder |
| **KV (Cloudflare)** | pHash Index für Reverse-Lookup |
| **Nostr Relays** | Event-Speicherung |

---

## Dateinamen-Konvention

```
{slug}.vf{kind}-{sha256:8}.{ext}

Beispiel:
mein-bild.vf1063-417a77b5.webp
```

---

## Zusammenfassung

1. **Für Nicht-Techniker:** Dein Bild bekommt einen unsichtbaren Stempel, einen Fingerabdruck und wird bei einem digitalen Notar registriert. Für immer.

2. **Für Techniker:** WebP + exiftool Metadaten + NIP-94 Event auf Nostr mit SHA-256 und pHash für Reverse-Lookup.

3. **Für alle:** Wenn jemand dein Bild klaut, hast du den Beweis.

---

> **Gemäß EU AI Act (Art. 50):** Dieser Text wurde mit Claude (Anthropic) erstellt, basierend auf: meinem Chatverlauf, meinem Obsidian Vault (MCP), VectorGraph (Neo4j) und der VisionFusen Codebase.

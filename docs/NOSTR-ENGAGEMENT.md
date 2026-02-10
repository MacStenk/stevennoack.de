# Nostr Engagement Stats — Dokumentation

> Stand: 2026-02-10

## Übersicht

Der Nostr Reader (`/nostr/read/[...id].astro`) zeigt Engagement-Stats für Artikel:
- **Likes** (Kind 7, NIP-25 Reactions mit `content === "+"`)
- **Comments** (Kind 1 mit `#a` Referenz, ohne `#q` Tag)
- **Quotes** (Kind 1 mit `#q` Tag) — aktuell nicht implementiert
- **Reposts** (Kind 6)
- **Zaps** (Kind 9735)

## Architektur

### Client-Side Loading

Stats werden **nach dem Pageload** via JavaScript geladen — nicht SSR.

**Warum?**
- SSR mit mehreren Relays = 10-17s Ladezeit
- Timeout-Probleme bei langsamen Relays
- Client-side: Seite lädt schnell, Stats poppen nach

### Scripts

```
src/scripts/
├── nostr-engagement.ts  ← Stats-Loading
└── nostr-qrcode.ts      ← QR-Code Modal
```

Diese werden von Vite gebundelt und als `?url` importiert:

```astro
import nostrEngagementUrl from "../../../scripts/nostr-engagement.ts?url";
<script type="module" src={nostrEngagementUrl}></script>
```

**Wichtig:** Inline `<script type="module">` mit bare imports (`from "nostr-tools"`) funktioniert NICHT im Browser. Vite bundelt nur externe .ts Files.

## Relays

Aktuell werden 3 Relays parallel abgefragt:

```typescript
const RELAYS = [
    "wss://nos.lol",
    "wss://relay.damus.io",
    "wss://relay.primal.net",
];
```

### Getestete Relays

| Relay | Status | Anmerkung |
|-------|--------|-----------|
| `relay.nostr.band` | ❌ Nicht erreichbar | Vermutlich DNS-Block (1Host) |
| `nostr-02.yakihonne.com` | ❌ Gibt 0 zurück | Anderes Datenformat? |
| `nos.lol` | ✅ Funktioniert | Unvollständige Daten |
| `relay.damus.io` | ✅ Funktioniert | — |
| `relay.primal.net` | ✅ Funktioniert | — |

### Das Dezentralitäts-Problem

Nostr ist dezentral — Stats sind über hunderte Relays verteilt:
- User A liked auf `relay.damus.io`
- User B liked auf `nos.lol`
- User C zapped auf `relay.snort.social`

**Kein einzelner Relay hat alle Daten.**

YakiHonne, Primal & Co. lösen das mit eigenen **Aggregator-Services** die 24/7 von vielen Relays sammeln und in einer eigenen DB speichern.

## Data Attributes

Die Stats-Spans haben Data-Attributes für das Client-Script:

```html
<span data-engagement-a="30023:pubkey:d-tag" data-engagement-field="likes">—</span>
```

- `data-engagement-a`: Addressable Reference (`kind:pubkey:d-tag`)
- `data-engagement-field`: `likes` | `comments` | `quotes` | `reposts` | `zaps`

## Nostr Event Kinds

| Kind | Beschreibung | Filter |
|------|--------------|--------|
| 7 | Reaction (Like) | `#a` auf Artikel, `content === "+"` |
| 1 | Note (Comment/Quote) | `#a` auf Artikel |
| 6 | Repost | `#a` auf Artikel |
| 9735 | Zap Receipt | `#a` auf Artikel |

### Addressable Events (Kind 30023)

Artikel sind "addressable events" mit:
- `kind`: 30023
- `pubkey`: Author's Public Key
- `d-tag`: Unique Identifier (z.B. `ki-agenten-gedaechtnis-lokal`)

Reference-Format: `30023:83440373de4aaca7b39618dea357467c7c9ea5bfe9ee3e7ca8b21dd05d46eb7c:ki-agenten-gedaechtnis-lokal`

## Bekannte Limitierungen

1. **Unvollständige Stats** — Nicht alle Relays haben alle Events
2. **Keine Sat-Summe** — Zaps zeigen Count, nicht Betrag
3. **Quotes nicht implementiert** — Wären Kind 1 mit `#q` Tag
4. **Keine Echtzeit-Updates** — Stats werden einmal beim Pageload geholt

## Offene Verbesserungen

- [ ] Mehr Relays abfragen (Balance: Vollständigkeit vs. Performance)
- [ ] Sat-Summe aus Zap-Events extrahieren (bolt11 parsen)
- [ ] Caching-Layer (Stats für X Minuten speichern)
- [ ] SSR Queries optimieren (Profile-Seite noch 13s)
- [ ] `relay.nostr.band` Whitelist in 1Host/Little Snitch

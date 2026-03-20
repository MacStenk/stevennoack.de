---
# === TITEL & SLUG ===
title: "[TITEL]"
subtitle: "[UNTERTITEL - optional]"
slug: [slug-ohne-sonderzeichen]
description: "[SEO-BESCHREIBUNG - 150-160 Zeichen]"
type: long-artikel
sig: "[SCHNORR_SIGNATUR - wird nach Nostr-Publish eingetragen]"

# === KATEGORISIERUNG ===
category: [kategorie]
tags:
  - [tag1]
  - [tag2]
  - [tag3]
  - [tag4]
  - [tag5]
series: "[SERIES NAME - optional]"
part: [1-n - optional]

# === TIMESTAMPS ===
date: [YYYY-MM-DD]
created: [YYYY-MM-DDTHH:MM]
modified: [YYYY-MM-DDTHH:MM]
published_at: ""

# === STATISTIKEN ===
word_count: [ANZAHL]
reading_time: [X]min

# === HERO IMAGE (von VisionFusen signiert) ===
heroImage: https://cdn.visionfusen.org/images/[DATEINAME].webp
heroImageAlt: "[ALT-TEXT - ausführlich, für LLMs]"
heroImageCaption: "[CAPTION - optional]"
heroImageHash: "[SHA-256 HASH]"
heroImageEvent: "[NIP-94 EVENT ID]"

# === OPEN GRAPH / SOCIAL ===
ogImage: https://cdn.visionfusen.org/images/[DATEINAME].webp
ogImageAlt: "[OG ALT-TEXT]"

# === PUBLISHING STATUS ===
status: draft | published
canonical_url: "https://stevennoack.de/nostr/artikel/[SLUG]"

# === NOSTR (Kind 30023 = Long-form) ===
nostr:
  kind: 30023
  d_tag: [SLUG]
  published: false
  note_id: ""
  naddr: ""
  relays:
    - wss://relay.stevennoack.de
    - wss://relay.primal.net
    - wss://nos.lol
    - wss://relay.nostr.band
    - wss://nostr.pareto.space

# === VISIONFUSEN SIGNATUR ===
visionfusen:
  signed: false
  event_id: ""
  hash: ""
  static_page: ""

# === SYNC-KANÄLE (optional, NICHT die Quelle!) ===
# Quelle ist IMMER stevennoack.de (canonical_url)
garten:
  sync: false
  url: ""
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

# === SCHEMA.ORG (für LLM-Sichtbarkeit) ===
schema:
  type: Article
  datePublished: [YYYY-MM-DD]
  dateModified: [YYYY-MM-DD]
  author:
    type: Person
    name: Steven Noack
    url: https://stevennoack.de
  publisher:
    type: Person
    name: Steven Noack
  mainEntityOfPage: https://stevennoack.de/nostr/artikel/[SLUG]
---

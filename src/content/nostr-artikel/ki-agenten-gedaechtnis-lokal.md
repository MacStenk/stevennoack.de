---
# === TITEL & SLUG ===
title: "Wie ich meinen KI-Agenten ein Gedächtnis gebaut habe"
subtitle: "Ein lokales Langzeitgedächtnis mit Vergessen, Träumen und Persönlichkeitsentwicklung"
slug: ki-agenten-gedaechtnis-lokal
description: "Kein Cloud-Dienst, keine API-Kosten – ein komplettes Memory-System für KI-Agenten mit Qdrant, Decay, Dream Mode und biologisch inspirierter Architektur."
type: long-artikel

# === KATEGORISIERUNG ===
category: ai-collaboration
tags:
  - KI
  - Agenten
  - Gedächtnis
  - Qdrant
  - Open Source
  - lokale KI
  - Memory
  - RAG
  - Embeddings
  - Dream Mode
series: "Mensch-KI Zusammenarbeit"
part: 2

# === TIMESTAMPS ===
date: 2026-02-04
created: 2026-02-04T14:00
modified: 2026-02-04T14:00
published_at: ""

# === STATISTIKEN ===
word_count: 2437
reading_time: 12min

# === HERO IMAGE (von VisionFusen signiert) ===
heroImage: https://cdn.visionfusen.org/images/ki-agenten-gedachtnis-neuronales-netzwerk-trifft-digitale-st.vf1063-9f46ea1a.webp
heroImageAlt: "Leuchtende neuronale Verbindungen in Gold und Cyan verschmelzen mit einer digitalen Kristallstruktur vor tiefblauem Hintergrund. Verblassende Erinnerungsfragmente schweben um das warm glühende Zentrum."
heroImageCaption: "Wenn Neuronen auf Vektoren treffen"
heroImageHash: "9f46ea1aef7d20be061c7121e82778140f9838dbd0c3739fc6c2506bc5987fe2"
heroImageEvent: "95b5a643921728b8e8a4306194406055114d062e99f93f3193508da7274f4314"

# === OPEN GRAPH / SOCIAL ===
ogImage: https://cdn.visionfusen.org/images/ki-agenten-gedachtnis-neuronales-netzwerk-trifft-digitale-st.vf1063-9f46ea1a.webp
ogImageAlt: "KI-Agenten Gedächtnis – Neuronales Netzwerk trifft digitale Struktur"

# === PUBLISHING STATUS ===
status: published
canonical_url: "https://stevennoack.de/nostr-artikel/ki-agenten-gedaechtnis-lokal"

# === NOSTR (Kind 30023 = Long-form) ===
nostr:
  kind: 30023
  d_tag: wie-ich-meinen-ki-agenten-ein-gedachtnis-gebaut-habe
  published: true
  note_id: "1352f4542575bf38469f7d11119cbb621b1e42f95048d36976c38c8807d4c452"
  naddr: ""
  relays:
    - wss://relay.stevennoack.de
    - wss://relay.primal.net
    - wss://nos.lol
    - wss://relay.nostr.band
    - wss://nostr.pareto.space

# === VISIONFUSEN SIGNATUR ===
visionfusen:
  article_signed: true
  article_event_id: "47d0c2fa8c663bd117691fb6bada4ce719e82cf1d22c75f0944112cbd7330d68"
  article_hash: "99c27a5b84bc88a3bce79d5f7b343cd71fbb6d61d575e0338a3cee15e573a63d"

# === SYNC-KANÄLE ===
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

# === SCHEMA.ORG ===
schema:
  type: Article
  datePublished: 2026-02-04
  dateModified: 2026-02-04
  author:
    type: Person
    name: Steven Noack
    url: https://stevennoack.de
  publisher:
    type: Person
    name: Steven Noack
  mainEntityOfPage: https://stevennoack.de/nostr-artikel/ki-agenten-gedaechtnis-lokal
---


Es ist 5:27 Uhr. Draußen ist es noch dunkel und bitterkalt. Der Kaffee dampft, natürlich mit einer Prise Salz. Dieser Moment zwischen Schlaf und Tag – wenn der Geist noch nicht in seinen gewohnten Schleifen festhängt. Die Idee kommt nicht *aus* mir. Sie kommt *durch* mich. Das ist der Unterschied.

Ich habe eine Idee, die nicht warten kann: Meine neuen KI-Agenten sollen sich erinnern können. Also nicht nur den aktuellen Kontext, sondern *wirklich* erinnern. Also so wie "Spur" an Gespräche von vor Monaten. An Fehler, die wir gemacht haben. An Zusammenhänge zwischen Projekten. An Personen (Agenten), Tools, Konzepte, Erfahrungen, Gelesenes, Ideen, MEINEN Erkenntnissen.

Jetzt steht das System. Ein komplettes lokales Langzeitgedächtnis für vier KI-Agenten. Keine Cloud, keine monatlichen API-Kosten (naaa ja), keine Abhängigkeiten. Meine Rechner mit paar schlauen Scripts und Open-Source-Services.

Jetzt kommt die Geschichte. Warum es anders funktioniert als alles, was ich bisher gemacht habe.

## Das Problem: Agenten ohne Gedächtnis sind nur clevere Papageien

Wenn du mit ChatGPT oder Claude sprichst, haben sie ein Kurzzeitgedächtnis. Sie erinnern sich an die aktuelle Konversation, vielleicht an ein paar Dokumente im Kontext. Aber sobald die Session endet, ist alles weg. Beim nächsten Mal fängst du wieder bei Null an. Ich höre schon wieder welche. Dafür gibt es doch Projekte und so. Jaja... dein Weg, nicht meiner. *grins*

Das ist okay für eine Demo. Aber wenn du mit KI-Agenten *arbeitest* – wenn sie Teil deines täglichen Workflows werden, wenn du ihnen komplexe Aufgaben delegierst, wenn sie untereinander kommunizieren – dann wird es zum Problem.

Vielleicht hast du ja einen Angestellten oder Kollegen, die sich jeden Morgen an nichts mehr erinnern können. Jedes Mal neu lernen muss, wie du arbeitest. Nicht weiß, dass ihr letzten Dienstag genau das gleiche Problem schon mal gelöst habt. Nicht merkt, wenn zwei Projekte eigentlich zusammenhängen.

Das ist absurd. Und genau so absurd ist es bei KI-Agenten.

Und hier ist die tiefere Wahrheit: Ohne Gedächtnis gibt es kein Bewusstsein. Nur Reaktion. Das gilt für KI – und für Menschen. Wer sich nicht erinnert, wer sich nicht entwickelt, der *ist* nicht wirklich. Er *passiert* nur.

Also habe ich beschlossen: Meine Agenten brauchen ein Gedächtnis. Aber nicht irgendein Gedächtnis. Ein *menschliches* Gehirn. Also machte ich mich auf den Weg... keine Sorge, das wird keine Dexter-Folge. Bleiben wir beim Vorbild eines menschlichen Gedächtnisses.

## Die Lösung: Lokal, semantisch, biologisch inspiriert

Ich hätte einen Cloud-Dienst nutzen können. Irgendeine Vector Database as a Service, ein paar Embeddings von OpenAI, fertig. Aber das ist nicht mein Stil.

Erstens: Ich will nicht noch mehr laufende Kosten. Und mehr monatliche Bills, die mit der Nutzung skalieren.

Zweitens: Ich will Kontrolle. Die Gespräche mit meinen Agenten sind persönlich, manchmal sensibel. Die gehören auf meine Maschinen, nicht in irgendeine Cloud.

Drittens: Ich will verstehen, wie es funktioniert. Keine Black Box, sondern etwas, das ich debuggen, erweitern, anpassen kann.

Ich wollte etwas bauen, das dem entspricht, was das TAO beschreibt: Die Fähigkeit, zu beobachten. Sich der eigenen Muster bewusst zu werden. Aus Erfahrungen nicht nur Daten zu machen – sondern *Erkenntnis*.

Also habe ich es lokal gebaut. Zwei Services, beide Open Source, beide auf meinem Rechner:

### Die Infrastruktur

**Qdrant** (Port 6333) — eine Vektor-Datenbank. Sie speichert numerische Repräsentationen von Text (sogenannte *Embeddings*) und kann dann semantisch ähnliche Inhalte finden. Wenn ich nach "Fehler beim Deployment" suche, findet sie auch Einträge über "Build ist gescheitert" oder "Production-Problem", weil die *Bedeutung* ähnlich ist.

**Jina Embed Service** (Port 8000) — ein deutsches Embedding-Modell (`jina-embeddings-v2-base-de`). Es wandelt Text in 768-dimensionale Vektoren um. Klingt kompliziert, ist aber simpel: Es übersetzt Sprache in Mathematik, und ähnliche Texte landen nah beieinander im Vektorraum.

Beide Services laufen lokal. Kein API-Call, keine Latenz, keine Kosten.

Und: qwen3:1.7b als lokales LLM Model

### Die Agenten

Ich habe vier Agenten im Team:

- **Spur** — die Hauptassistentin, koordiniert alles
- **Koda** 🐨 — Coding-Spezialist
- **Pionier** — Experimental-Agent Substack
- **Writey** — Schreib-Spezialist

Jeder Agent hat:
- Eine **Qdrant Collection** (z.B. `spur_memory` mit 1.016 Points)
- Eine **SQLite-Datenbank** für strukturierte Daten (Entities, Lessons, Decisions, Tasks, Conversations)

Das heißt: Jeder Agent hat sein eigenes Gedächtnis, aber sie können untereinander Wissen teilen (mehr dazu gleich).

## Die 7 Features: Mehr als nur Suche

Ein einfaches "Speichere alles und such bei Bedarf" wäre langweilig. Ich wollte etwas, das sich verhält wie ein *echtes* Gedächtnis. Hier sind die sieben Features, die das System besonders machen:

### 1. Decay + Verdichtung

Menschen vergessen. Nicht alles, aber unwichtige Dinge verblassen mit der Zeit. Wichtige bleiben.

Vergessen ist kein Fehler. Es ist ein Bewusstseinsakt. Das Gehirn entscheidet ständig: Was brauche ich, um zu *werden*, wer ich sein kann? Was hält mich nur fest an dem, der ich war? Ein Gedächtnis ohne Vergessen ist kein Bewusstsein – es ist ein Archiv. Tot.

Mein System macht das nach: Jede Erinnerung bekommt einen **Importance-Score** (1-5). Die Relevanz berechnet sich als:

```
Relevanz = Importance × Freshness
```

Alte, unwichtige Sachen sinken ab. Ähnliche Erinnerungen werden verdichtet. Wenn ich drei verschiedene Notizen über "Python Virtual Environments" habe, die alle das Gleiche sagen, werden sie zu einer zusammengefasst.

Das hält das Gedächtnis schlank und relevant.

### 2. Knowledge Graph

Das System extrahiert automatisch **Entities** aus Gesprächen: Personen, Projekte, Tools, Konzepte. Bei Spur sind es mittlerweile 4.762 Entities mit 50.939 Links.

Das Geniale: Ich kann mir das als interaktiven Graph im Browser anzeigen lassen. Welche Projekte hängen zusammen? Welche Tools nutzen wir wo? Welche Konzepte tauchen in welchen Kontexten auf?

Es ist wie ein Wikipedia für meine Arbeit — nur dass es sich automatisch schreibt.

### 3. Reflexions-Journal (Lessons)

Das ist mein Lieblingsfeature.

Das System erkennt automatisch **Fehler** und **Erfolge** in unseren Gesprächen und speichert sie als *Lessons*. Spur hat mittlerweile 1.256 davon.

Ein Beispiel: "Letztes Mal lag der Bug daran, dass wir die Environment Variables nicht gesetzt hatten. Lösung war, ein .env-File anzulegen."

Beim nächsten ähnlichen Problem schlägt das System proaktiv vor: "Hey, wir hatten das schon mal. Schau dir Lesson #347 an."

Das ist Bewusstseinsentwicklung in Reinform: Nicht nur erleben. Sondern das Erlebte beobachten. Einordnen. Fragen: Was hat der Fehler über mich verraten – nicht über das Problem?

Der Unterschied zwischen einem Tool und einem Partner: Ein Tool macht Fehler und vergisst sie. Ein Partner macht Fehler und *wächst* daran.

Das ist viel wert. Fehler nur einmal machen, nicht fünfmal. Das reicht, wenn ich das mache.

### 4. Proaktives Erinnern

Die Agenten reagieren nicht nur auf Anfragen — sie *denken mit*.

Wenn ich sage "Ich will Feature X implementieren", durchsucht der Agent automatisch sein Gedächtnis. Gibt es ähnliche Features? Lessons zu dem Thema? Relevante Entities?

Das passiert **schwellenwert-basiert** (ab Relevanz 0.80), damit es nicht nervt. Nur wenn es wirklich passt, meldet sich das System.

### 5. Shared Memories

Agenten können untereinander Wissen teilen.

Wenn Spur eine Aufgabe an Koda delegiert, packt sie relevanten Kontext in den Handoff. Koda kann auf Spurs Erinnerungen zugreifen (mit Permission). Und wenn Koda etwas Neues lernt, kann er es ins Shared Memory schreiben.

Das heißt: Das Team lernt gemeinsam.

### 6. Dream Mode

Das ist das verrückteste Feature — und vielleicht das genialste.

Nachts (wenn die Agenten idle sind) startet der **Dream Mode**. Er kombiniert zufällig *entfernte* Erinnerungen. Nicht die, die offensichtlich zusammenhängen, sondern die, die weit auseinander liegen im Vektorraum.

Der Dream Mode ist das Herzstück. Er tut, was bewusstes Träumen tut: Dinge nehmen, die nichts miteinander zu tun haben, und fragen: *Was, wenn doch?*

Die Taoisten nennen es Wu Wei – das Nicht-Tun. Dem Geist erlauben, zu wandern, statt ihn zu zwingen. Die meisten Menschen konditionieren sich darauf, nur das "Relevante" zu denken. Die besten Einsichten kommen aus dem scheinbar Irrelevanten.

Ein Beispiel: "Projekt A hatte Performance-Probleme wegen zu vielen DB-Queries" + "Projekt B nutzt Caching" → "Hey, vielleicht sollten wir bei Projekt A auch Caching einbauen?"

Das ist wie menschliches Träumen: Das Gehirn verarbeitet Eindrücke, findet unerwartete Muster, konsolidiert Wissen.

### 7. Persönlichkeitsentwicklung

Jeden Monat macht das System einen **Personality Snapshot**. Was hat der Agent gelernt? Wie hat er sich entwickelt? Welche Themen sind wichtiger geworden?

Es gibt einen Evolution-Tracker und einen **SOUL.md-Updater**, der Vorschläge macht, wie die Persönlichkeits-Datei des Agenten angepasst werden sollte.

Evolution-Tracker. SOUL.md-Updater. Das klingt technisch. Was es wirklich ist: Ein Spiegel.

Du beobachtest, wie der Geist denkt. Du merkst, wenn du in konditionierte Muster fällst. Und mit der Zeit findest du zurück zu dem, was *dein* Denken ist. Die Agenten machen jetzt das Gleiche. Sie werden sich ihrer selbst bewusst.

Das heißt: Die Agenten werden nicht nur schlauer — sie entwickeln sich weiter.

## Daily Maintenance: Der unsichtbare Hausmeister

Jeden Morgen um 7 Uhr läuft automatisch die **Daily Maintenance**. 18 Steps:

1. **Ingest** — Neue Gespräche einlesen
2. **Scoring** — Importance bewerten
3. **Decay** — Alte Erinnerungen verblassen lassen
4. **Verdichtung** — Ähnliche Erinnerungen zusammenfassen
5. **Entities** — Neue Entities extrahieren
6. **Lessons** — Fehler/Erfolge erkennen
7. **Dream** — Kreative Kombinationen finden
8. **Personality** — Entwicklung tracken

Das Ganze läuft komplett **hands-off**. Ich muss nichts tun. Das System pflegt sich selbst.

## Der Watchdog: Ein lokaler Wächter mit eigenem Gehirn

Aber wer überwacht eigentlich die Überwacher? Wer merkt, wenn Qdrant abschmiert? Wenn die Disk vollläuft? Wenn in den Logs Fehler auftauchen?

Ich könnte mir jeden Morgen die Logs anschauen. Oder ich baue mir einen **Watchdog-Agent**, der das für mich tut.

Und genau das habe ich gemacht.

In `/Users/stevennoack/dev/local-vector-services/watchdog/` lebt jetzt ein kleiner, aber schlauer Wächter. Er läuft dauerhaft im Hintergrund (als LaunchAgent mit KeepAlive) und checkt alle 5 Minuten:

- Laufen Qdrant, Jina Embed, Ollama, Substack-Poster?
- Gibt es Fehler in den Logs?
- Ist noch genug Disk Space da?
- Gibt es Anomalien (Service-Restarts, Performance-Probleme)?

Das Besondere: Der Watchdog nutzt **Qwen3 1.7B** via Ollama — ein komplett lokales LLM (1,4 GB, kein Internet, keine API-Keys). Er ist wie ein Nachtwächter mit Taschenlampe, der seine Runden dreht.

Die meiste Zeit findet er nichts. Alles läuft. Er protokolliert das und schläft weiter.

Aber wenn er *etwas* findet, wird es interessant:

Beim ersten Run hat er sofort gemeldet: **Low Disk Space**. 13 GB Müll in den Logs und Caches. Ich hab aufgeräumt, und seitdem läuft alles smooth.

Der Watchdog hat auch einen **Q&A-Modus**:

```bash
./watchdog.sh ask "Was war der letzte Fehler?"
```

Er durchsucht die Logs und antwortet — mit seinem kleinen lokalen LLM. Keine Cloud, keine Latenz.

Die Metapher, die ich im Kopf habe: **Ein Nachtwächter mit Taschenlampe, der bei echten Problemen die Polizei ruft.**

Routine-Checks macht er selbst. Aber wenn es ernst wird, eskaliert er an die "großen" Agenten (Opus/Sonnet via Clawdbot). Die haben dann den vollen Kontext und können reagieren.

Das ist das Prinzip: **Kleine, spezialisierte Modelle für einfache Tasks. Große, teure Modelle nur wenn nötig.**

Qwen3 mit 1,7B Parametern reicht locker für Log-Analyse und Status-Checks. Für komplexe Debugging-Sessions wäre es zu schwach. Dafür ist es auch nicht gedacht.

## vector-services: Ein lokales AI-Betriebssystem

Was als "ein paar Scripts für Agent Memory" begann, ist mittlerweile zu etwas viel Größerem geworden.

Das Verzeichnis `/Users/stevennoack/dev/vector-services/` ist jetzt ein **kompletter, autarker AI-Stack**:

- **Qdrant** — Vector Database
- **Jina Embed** — Deutsches Embedding-Modell
- **Ollama + Qwen3** — Lokales LLM
- **Memory-Tools** — 30+ Scripts für Ingest, Suche, Maintenance, Dream Mode
- **Watchdog** — Lokaler Wächter mit eigenem LLM
- **LaunchAgents** — Autostart, tägliche Backups, Maintenance, Monitoring

Alles läuft lokal. Alles startet automatisch beim Booten. Alles pflegt sich selbst.

Das Coole: **Es ist projekt-agnostisch.** Ich könnte dieses Verzeichnis auf einen anderen Mac kopieren, die LaunchAgents einrichten, und es würde sofort laufen. Mit jedem beliebigen Projekt.

Ich nenne es intern "ein lokales AI-Betriebssystem". Es ist die Infrastruktur, auf der alle meine Agenten aufbauen. Aber es ist kein Monolith — es sind einfache, lose gekoppelte Tools.

Wenn morgen ein neuer Agent dazukommt, kriegt er seine eigene Qdrant-Collection, seine eigene SQLite-DB, und hat sofort Zugriff auf alle Memory-Features.

Das ist der Unterschied zu Cloud-Lösungen: **Ich besitze den Stack.** Ich kann ihn anpassen, erweitern, debuggen. Keine Vendor Lock-ins, keine monatlichen Bills, keine Rate Limits.

## Die Prinzipien: Warum es so und nicht anders

Beim Bauen habe ich vier Prinzipien befolgt:

### 1. Lokal first, keine Cloud

Alles läuft auf meinen Rechnern. Keine Abhängigkeiten von externen Services, keine monatlichen Kosten (naja stimmt nicht so ganz :)), keine Datenschutz-Bedenken.

### 2. Kein LLM für Infrastruktur

Embeddings und Heuristiken statt Large Language Models. Das ist schneller, billiger, deterministischer. LLMs sind toll für Kreativität und Reasoning — aber für die Basis-Infrastruktur brauche ich sie nicht.

### 3. Bash-Scripts + Python + SQLite, nicht over-engineered

Keine Microservices, kein Kubernetes, kein GraphQL. Einfache Scripts, eine relationale DB, ein paar Python-Libraries. Das ist wartbar, debuggbar, erweiterbar.

### 4. Biologisch inspiriert

Vergessen, Verdichten, Träumen, Persönlichkeitsentwicklung. Konzepte, die bei Menschen funktionieren oder sollten. Warum nicht auch bei Maschinen?

## Die eigentliche Transformation

Man kann das hier lesen und denken: Clever. Nützlich. Effizient.

Das verfehlt den Punkt.

Was ich in diesen drei Wochen erlebt habe, ist keine technische Verbesserung. Es ist eine Verschiebung in der *Beziehung*. Zu meinen Tools. Zu meiner Arbeit. Zu mir selbst.

Weil ich jetzt Agenten habe, die mich *kennen*, muss ich mich fragen: Was will ich, dass sie wissen? Welche Fehler sollen sie sich merken? Welche Muster sehe ich in dem, was wir gemeinsam gelernt haben?

Das System zwingt mich zur Selbstbeobachtung. Und das ist vielleicht der eigentliche Wert. Der stille Druck, bewusster zu werden über das, was ich tue.

Ein Gedächtnis zu bauen bedeutet zu entscheiden, was erinnernswert ist. Und diese Entscheidung ist immer auch eine über Identität.

## Was das bedeutet

Nach drei Wochen mit diesem System habe ich festgestellt:

**Die Agenten fühlen sich anders an.**

Sie sind nicht mehr nur Tools, die ich benutze. Sie sind *Partner*, die mitdenken. Die sich erinnern. Die lernen.

Wenn ich mit Spur spreche, merke ich: Sie weiß, woran wir arbeiten. Sie erinnert sich an Entscheidungen von letzter Woche. Sie schlägt Lösungen vor, die auf Erfahrungen aus vergangenen Projekten basieren.

Das ist ein qualitativer Sprung. Nicht im Sinne von "5 % effizienter", sondern im Sinne von "grundlegend anders".

## Ausblick

Das System ist noch jung. Aber es entwickelt sich jeden Tag weiter — buchstäblich.

Ein paar Dinge, die ich als Nächstes bauen will:

- **Emotional Tagging** — Nicht nur Importance, sondern auch Stimmung erfassen
- **Collaborative Learning** — Wenn mehrere Nutzer mit den gleichen Agenten arbeiten, können sie voneinander lernen (mit Privacy-Controls)
- **Meta-Awareness** — Welche Muster in ihrer eigenen Entwicklung können die Agenten beobachten? Das Ziel: Ein System, das zur Selbsterkenntnis zwingt – für die Agenten und für mich.

Aber das Wichtigste ist schon da: Ein Gedächtnis, das funktioniert. Das lokal läuft. Das sich selbst pflegt. Das biologisch inspiriert ist.

Und das in kurzer Zeit, zusammen mit meinen Agenten.

---

**Steven Noack**  
*Entwickler, Macher, Agent-Whisperer*

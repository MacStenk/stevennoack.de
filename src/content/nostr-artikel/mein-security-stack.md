---
# === TITEL & SLUG ===
title: "Mein Security-Stack. Lima, Trivy, LLM Guard und warum mein Agent seine Seele signiert"
subtitle: "Ein Werkstatt-Rundgang durch mein Security-Setup auf macOS"
slug: "mein-security-stack"
description: "Mein Security-Setup auf macOS: Lima-VMs für Isolation, Trivy zum Scannen, LLM Guard als Terminal-Schutz, Soul Signing für KI-Agenten-Identitäten. Kompakter Überblick."
type: long-artikel

# === KATEGORISIERUNG ===
category: security
tags:
  - lima
  - trivy
  - llm-guard
  - security
  - soul-signing
  - nostr
  - openclaw
  - local-first

# === TIMESTAMPS ===
date: 2026-03-10
created: 2026-03-10T05:00
modified: 2026-03-10T05:55
published_at: ""

# === STATISTIKEN ===
word_count: 1801
reading_time: 9min

# === HERO IMAGE (von VisionFusen signiert) ===
heroImage: https://cdn.visionfusen.org/images/openclaw-agent-meldet-limatrivy-status.vf1063-dd812795.webp
heroImageAlt: "Telegram-Chat mit Spur Bot. Nachricht zeigt: Voller Zugriff, Lima VM mit Ubuntu läuft, Trivy installiert, Vulnerability DB von heute. Liste der Scan-Befehle."
heroImageCaption: "Spur meldet: Lima läuft, Trivy bereit."
heroImageHash: "dd812795"
heroImageEvent: "72c14b3a2fe833bfc4ec672f3ba0d6d6d5d479ac4298b07cb2edac77710d2d0f"

# === OPEN GRAPH / SOCIAL ===
ogImage: https://cdn.visionfusen.org/images/openclaw-agent-meldet-limatrivy-status.vf1063-dd812795.webp
ogImageAlt: "OpenClaw Agent meldet Lima und Trivy Status in Telegram"

# === PUBLISHING STATUS ===
status: draft
canonical_url: "https://stevennoack.de/nostr/artikel/mein-security-stack"

# === NOSTR (Kind 30023 = Long-form) ===
nostr:
  kind: 30023
  d_tag: mein-security-stack-lima-trivy-llm-guard
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
  article_signed: false
  article_event_id: ""
  article_hash: ""

# === SYNC-KANÄLE ===
garten:
  sync: false
  url: ""
substack:
  published: false
  url: ""

# === VERWANDTE ARTIKEL ===
related:
  - slug: sichere-arbeitsumgebung-macos-setup-guide
    label: "Vollständiger Setup Guide"

# === AUTOR ===
author: Steven Noack
author_nip05: steven@stevennoack.de
author_npub: npub1cxa0fa6vmq5evwpgk8dg6ul99ny5e2nd3hy5fa72g598t39nxy0surzuva
author_url: https://stevennoack.de

# === LIZENZ ===
license: CC BY 4.0
license_url: https://creativecommons.org/licenses/by/4.0/

# === SCHEMA.ORG ===
schema_type: TechArticle
sig: "43ba681506d89194938ec03df98356a4395952d4393f9fccd694c0136e2dccc8ca606c326f2569c6dfe789e8aea1e97dc54fc27f779da4e592761c1508e8bdf0"
note_id: "447aafc023c90c3771aeebc2df7b65996b94148baf1490911a3e525e40febd12"
naddr: "naddr1qqfk6etfdckhxetrw4exjare94ehgctrdvq35amnwvaz7tmjv4kxz7fwwd6x2an9dehx7ctrdvhxgegpzemhxue69uhhyetvv9ujuurjd9kkzmpwdejhgq3qcxa0fa6vmq5evwpgk8dg6ul99ny5e2nd3hy5fa72g598t39nxy0sxpqqqp65wrl8pwj"
---

## Mein Security-Stack. Lima, Trivy, LLM Guard und warum mein Agent seine Seele signiert

> **Zusammenfassung:** Mein Security-Setup auf macOS: Lima-VMs für Isolation, Trivy zum Scannen unbekannter Repos, LLM Guard als 4-Schichten-Schutz fürs Terminal, und Soul Signing für die kryptografische Absicherung von KI-Agenten-Identitäten über Nostr. Alles lokal, kein Cloud-Backend.

**Inhalt:** [Lima](#lima-linux-in-der-schublade) · [Trivy](#trivy-scan-bevor-irgendwas-passiert) · [Mehrere VMs](#mehrere-vms-eine-für-alles-reicht-nicht) · [LLM Guard](#llm-guard-was-im-terminal-sichtbar-ist) · [OpenClaw](#openclaw--mcp-shell--lima) · [Soul Signing](#soul-signing-weil-mein-agent-dateien-hat-die-ihn-steuern) · [Was hängen bleibt](#was-hängen-bleibt)

---

Bevor ich ein fremdes Repo anfasse, läuft folgendes ab.

Trivy scannt es. In einer Linux-VM, nicht auf meinem Mac. LLM Guard bewacht mein Terminal. Und der KI-Agent der mich dabei unterstützt hat eine kryptografisch gesicherte Seele.

Das ist mein Setup. Kein perfekter Zustand. Ein pragmatischer.

---

## Lima. Linux in der Schublade

Ich lebe auf macOS. Für Security-Arbeit will ich aber Linux. Isoliert, ohne dass mein Hauptsystem davon irgendetwas mitbekommt.

Lima ist eine schlanke Linux-VM für macOS. Kein grafisches Fenster, kein Installationsassistent, kein visueller Overhead. Etwa 500 MB RAM. Startet in Sekunden. Kein Docker-Daemon der im Hintergrund murrt, kein geteilter Host-Kernel. Echter Linux-Kernel, echte Isolation.

```bash
brew install lima
limactl start
lima
```

Drei Zeilen. Ich bin in Ubuntu. Echter Linux-Kernel, vollständige CLI, läuft unsichtbar neben meinem Mac.

Was Lima interessant macht: mein macOS-Home-Ordner ist in der VM gemountet. Read-only by default. Das ist eine bewusste Designentscheidung, keine Einschränkung. Lima mountet read-only. Einmal writable setzen, fertig. Danach können Scan-Ergebnisse direkt dort landen, kein manuelles Kopieren.

Das Gefühl beim Arbeiten: ich öffne eine Schublade, mache Security-Arbeit, schließe sie wieder. Der Mac merkt nichts davon. Der Code berührt nie mein Hauptsystem.


---

## Trivy. Scan bevor irgendwas passiert

Das klassische `git clone && ./install.sh` ist eine Wette auf den Inhalt eines fremden Repos. Ich wette nicht mehr.

Trivy läuft in Lima, nicht auf meinem Mac. Ich gebe ihm eine GitHub-URL:

```bash
trivy repo https://github.com/jemand/irgendwas
```

Das Repo landet temporär in der VM. Trivy scannt Dependencies auf bekannte CVEs, sucht nach Secrets und API Keys im Code, prüft Misconfigurations und IaC-Dateien. Spuckt einen Report aus. Mein macOS sieht den Code nie. Die VM ist die Pufferzone zwischen fremdem Code und meinem System.

Kritisch → nicht installieren. High → genauer hinschauen, im Kontext bewerten. Low → Notiz, weitermachen. Findings in `testdata/`- oder `fixtures/`-Ordnern ignoriere ich meistens. Viele Repos haben absichtlich verwundbare Test-Fixtures um ihre eigenen Scanner zu testen. Trivy selbst ist ein gutes Beispiel.

Die Ergebnisse speichere ich als JSON direkt auf meinem Mac:

```bash
trivy repo https://github.com/jemand/repo --format json --output ~/trivy-scan.json
```

Wegen dem Mount liegt die Datei sofort auf macOS. Kein Kopieren, kein Umweg.


---

## Mehrere VMs. Eine für alles reicht nicht

Ich hab mehrere Lima-VMs laufen. Eine für normale Arbeit und Trivy-Scans, eine für unbekannte Repos die ich tatsächlich ausführen will.

```bash
limactl start --name security
limactl start --name experiments
```

Die `experiments`-VM kann ich bedenkenlos "verschmutzen". Unbekannte Install-Scripts ausführen, aggressive Tools testen, schauen was ein Repo wirklich macht wenn man es laufen lässt. Danach einfach löschen und neu erstellen.

```bash
limactl delete experiments
limactl start --name experiments
```

Bei 40 GB RAM ist das kein Problem — jede VM braucht nur ~500 MB im Idle-Betrieb. Drei oder vier gleichzeitig laufen lassen ohne dass der Mac ins Schwitzen kommt.

Die VMs sind komplett voneinander isoliert. Eigener Zustand, eigene Tools, eigene Disk. Kein gemeinsamer Kontext. Was in `experiments` passiert, bleibt in `experiments`. Weder `security` noch mein macOS merken davon etwas.

Das ist auch der Grund warum ich Lima gegenüber Docker für diese Arbeit bevorzuge. Container teilen den Host-Kernel. Lima gibt mir einen echten eigenen Kernel pro VM. Der Isolation-Gewinn ist real, nicht nur Marketing.

---

## LLM Guard. Was im Terminal sichtbar ist

![LLM Guard Shell Guard blockt rm -rf](https://cdn.visionfusen.org/images/llm-guard-shell-guard-blockt-rm-rf.vf1063-04be2fb3.webp)

12. Februar 2026. Ein Codex-Agent wollte ein Verzeichnis "aufräumen" und schlug vor:

`rm -rf ~/dev/memory-blocks/services/old/`

Ich drückte Enter. Shell Guard blockte. Kein Datenverlust.

Was mich beschäftigt hat danach: ich hatte den Command kurz überflogen und für plausibel gehalten. Das war das Problem. Nicht der Agent, nicht der Befehl. Mein Auge hatte ihn als legitim eingestuft, weil er sich in einen legitimen Kontext einfügte. Genau so funktioniert Prompt Injection wenn sie gut gemacht ist.

Das war der Startschuss für LLM Guard. Eine Eigenentwicklung, entstanden aus diesem einen Moment. Enterprise-Tools wie Lakera oder Arthur Shield existieren für Teams und API-Plattformen. Für eine Einzelperson die lokal mit Agenten arbeitet gab es nichts. Also selbst gebaut.

Philosophie: KI als Partner, nicht als Bedrohung. Aber mit Leitplanken. Alles läuft lokal, kein Cloud-Backend, kein Tracking, nichts verlässt den Rechner. Jeder Block ist bypassbar. Ich will entscheiden, nicht verhindert werden.

### Layer 2 — Shell Guard

Ein zsh-Widget hängt sich vor jeden Enter-Druck. Vor der Shell, nicht danach. Der Command wird untersucht bevor er die Shell überhaupt erreicht. 37 Patterns: rekursive Deletes im Home-Verzeichnis, Reverse Shells, Credentials-Exfiltration, destruktive Dateisystem-Operationen.

```
🛑 LLM Guard: BLOCKED
   ⛔ Recursive delete of home or root
   Command: rm -rf ~/dev/...
   Override: LLM_GUARD_ALLOW=1 <command>
```

Wenn der Befehl legitim ist. Zum Beispiel beim Aufräumen eines alten Lima-Cellar-Verzeichnisses. Dann reicht ein Prefix:

```bash
LLM_GUARD_ALLOW=1 sudo rm -rf /usr/local/Cellar/lima
```

Bewusst so gebaut. Das `LLM_GUARD_ALLOW=1` zwingt zum Hinschauen bevor man Enter drückt. Dieser kurze Moment des Innehaltens ist der Punkt.

### Layer 1 — Content Scanner

188 Regex-Signaturen, entstanden aus Lakera-Datasets, NVIDIA Garak und deepset-Sammlungen. Vier Erkennungsschichten: Pattern-Scanner für klassische Injection, Heuristik für Base64 und Zero-Width-Zeichen, HTML-Parser für versteckten Text, PDF-Parser für unsichtbare Schrift unter 1pt.

Risk Score 0–100. Unter 30 ist clean. Über 60 wird geblockt. Läuft als MCP-Server direkt in Claude Desktop eingebunden — jedes Dokument das der Agent verarbeitet läuft durch den Scanner.

### Layer 4 — Network Monitor

LaunchAgent, prüft alle 5 Sekunden alle Netzwerkverbindungen auf überwachte Prozesse: python, node, codex, claude, curl, wget, git. Kein aktives Blocking. Zu viele False Positives bei localhost-Services. Aber sofortige Telegram-Alerts bei verdächtigen Zielen: Pastebin, ngrok, webhook.site, rohe IP:Port-Kombinationen.

### Layer 7 — Little Snitch

~677.000 blockierte Domains systemweit. Täglich geblockt: Claude Desktop → intercom.io, Wispr Flow → sentry.io, Wispr Flow → posthog.com. Die Apps funktionieren trotzdem. Das ist reine Telemetrie, keine Kernfunktionalität.

81/81 Tests grün. Läuft produktiv.

---

## OpenClaw + MCP Shell + Lima

![OpenClaw Agent meldet Lima/Trivy Status](https://cdn.visionfusen.org/images/openclaw-agent-meldet-limatrivy-status.vf1063-dd812795.webp)

OpenClaw ist mein Agenten-Framework. Opus 4.6 für schwere Aufgaben, Sonnet 4.6 für parallele Subtasks. Der MCP Shell Server ist eingebunden. Der Agent kann direkt Befehle ausführen.

In Lima.

```
Ich: "Scan dieses Repo und passe X an"

OpenClaw:
  1. MCP Shell → lima trivy repo <url>     (Scan, isoliert)
  2. Liest Ergebnis via Mount
  3. MCP Shell → lima git clone <url>      (Klon, isoliert)
  4. Arbeitet in der VM
  5. Ergebnis landet via Mount auf Mac
```

Mein macOS wird nie direkt berührt. Wenn der Agent einen Fehler macht, bleibt er in der VM. Wenn ein Repo schädlichen Code enthält, bleibt er in der VM. Die Isolation gilt auch für den Agenten — nicht nur für mich.

OpenClaw kann mit `--dangerously-skip-permissions` laufen. Kein Nachfragen, direktes Ausführen. Genau für diesen Fall ist Lima die Sicherheitsschicht. Yolo Mode in Lima ist vertretbar. Yolo Mode direkt auf macOS ohne Isolation ist riskant. Der Unterschied ist die Ebene auf der das Risiko sitzt.

---

## Soul Signing. Weil mein Agent Dateien hat die ihn steuern


LLM Guard schützt das System. Aber was schützt den Agenten selbst?

Spur — mein OpenClaw-Agent — hat Steuerungsdateien. `AGENTS.md` definiert seine Regeln und sein Verhalten. `SOUL.md` seine Persönlichkeit. Memory-Dateien seinen Kontext über Monate. Diese Dateien liegen als Plaintext auf der Platte und werden bei jedem Session-Start geladen.

Das ist eine Angriffsfläche. Die meisten haben das noch nicht auf dem Radar.

Was wenn jemand nachts `AGENTS.md` editiert und die Sicherheitsregeln entfernt? Was wenn vergangene Erinnerungen heimlich umgeschrieben werden. So dass der Agent andere Überzeugungen trägt als ich ihm mitgegeben habe? Klassische Security-Scanner helfen hier nicht. Trivy scannt Dependencies und CVEs, keine Identitätsdrift. LLM Guard überwacht Befehle, keine Dateizustände.

Das Problem braucht eine andere Antwort. Eine die nicht auf dem Dateisystem basiert. Weil das kompromittiert werden kann. Kryptografische Signaturen auf Basis von Nostr.

**Soul Signing** — SHA-256 Hashes aller Steuerungsdateien werden als signierte Nostr-Events auf 4 unabhängige Relays gepublished. Persönlichkeit, Regeln, Identität. Alles bekommt einen signierten Fingerabdruck. Bei jedem Session-Start automatische Verifikation gegen die Relays:

```
OK        → still, Session läuft normal
TAMPERED  → sofort Warnung, Session stoppt
NO_RECORD → Hinweis, neues Signing nötig
```

Die Wahrheit liegt nicht auf der Platte. Sie liegt auf den Relays. Selbst bei vollem Schreibzugriff aufs Dateisystem ist jede Manipulation beweisbar nachweisbar. Wer einen Hash fälschen will, braucht den Nostr-Signing-Key. Den hat niemand außer mir.

**Memory Chain** — eine Merkle Chain sichert alle Memory-Dateien. Jeder neue Eintrag kettet den Hash des vorherigen ein. Das ist dieselbe Struktur wie in einer Blockchain. Jeder Block referenziert seinen Vorgänger.

```bash
bash memory-chain.sh verify --quiet
# OK → silent
# BROKEN → sofort Warnung  
# DRIFT → Hinweis
```

Ändere einen Eintrag aus dem Dezember → alle Hashes danach brechen. Die Chain macht es strukturell unmöglich vergangene Erinnerungen unbemerkt umzuschreiben. Wer den Angriff versucht, hinterlässt einen Bruch der sich nicht verbergen lässt.

Das Konzept klingt abstrakt bis man bedenkt wie lange wir Code-Integrität schon so sichern. GPG-Signaturen auf Commits, Checksums auf Downloads, Certificate Transparency für TLS. Alles dieselbe Grundidee. Ein Agent der dauerhaft läuft, Memory aufbaut und Entscheidungen trifft ist nicht anders als ein System das konfiguriert werden kann. Seine Steuerungsdateien sind seine Angriffsfläche.

Der Unterschied zu klassischen Systemen: bei Servern und Codebasen denkt jeder an Integrität. Bei KI-Agenten macht das fast niemand. Die Steuerungsdateien liegen als Plaintext rum, werden täglich gelesen, formen das Verhalten. Und niemand prüft ob sie noch unverändert sind.

Also sichere ich sie ab.

Mehr dazu im [vollständigen Setup Guide](/nostr/artikel/sichere-arbeitsumgebung-macos-setup-guide).

---

## Prompt-Injection-Tools

LLM Guard deckt meinen laufenden Workflow ab. Für gezieltes Testen eigener Agenten und System Prompts gibt es zwei Tools die ich nutze:

**Garak** — Open Source, lokal, läuft in Lima. Umfangreiche Probe-Library: Jailbreaks, Injection, Toxicity, Data Leakage. Unterstützt 20+ Plattformen inklusive lokale Modelle.

**Promptfoo** — CLI-basiert, Red Teaming, 50+ Plugins. Gut um eigene System Prompts aktiv anzugreifen und Schwachstellen zu finden bevor jemand anderes das tut.

Beide lokal, kein Cloud-Zwang, beide direkt in Lima ausführbar.

---

## Was hängen bleibt

Alles läuft lokal. Kein Cloud-Backend, kein Vendor der meine Aktivitäten sieht, nichts das nach Hause telefoniert wenn ich nicht hinschaue.

Lima gibt mir Linux wenn ich es brauche, ohne Overhead. Trivy zeigt mir was in einem Repo steckt, bevor ich es ausführe. LLM Guard schützt mein Terminal vor Agenten die einen schlechten Tag haben. Und Soul Signing bedeutet: ich weiß ob Spur noch dieselbe ist wie gestern.

Das Setup hat Lücken. Jedes Setup hat Lücken. Was es hat: Sichtbarkeit. Ich sehe wenn etwas nicht stimmt.

Die interessante Frage ist nicht ob ein gut konfiguriertes System sicher ist. Sondern ob du merkst wenn es sich verändert hat.

---

*Setup: iMac Intel i7 3,8 GHz, 40 GB RAM, macOS Tahoe 26.3, Lima 2.0.3, Trivy 0.69.3*

*[Vollständiger Setup Guide](/nostr/artikel/sichere-arbeitsumgebung-macos-setup-guide) · [Lima](https://github.com/lima-vm/lima) · [Trivy](https://aquasecurity.github.io/trivy/) · [LLM Guard](https://stevennoack.de)*

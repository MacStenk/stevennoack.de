---
# === TITEL & SLUG ===
title: "Sichere Arbeitsumgebung auf macOS. Setup Guide"
subtitle: "Lima, Trivy, LLM Guard und Soul Signing. Mein kompletter Security-Stack für isoliertes Arbeiten mit KI-Agenten"
slug: "sichere-arbeitsumgebung-macos-setup-guide"
description: "Setup Guide für eine isolierte Security-Arbeitsumgebung auf macOS: Lima-VMs, Trivy-Scanner, LLM Guard (4-Schichten Prompt-Injection-Schutz) und Soul Signing für KI-Agenten-Identitäten über Nostr. Alles lokal, kein Cloud-Backend."
type: long-artikel

# === KATEGORISIERUNG ===
category: security
tags:
  - lima
  - trivy
  - llm-guard
  - macos
  - security
  - prompt-injection
  - soul-signing
  - nostr
  - openclaw
  - local-first
  - vm
  - isolation

# === TIMESTAMPS ===
date: 2026-03-10
created: 2026-03-10T05:00
modified: 2026-03-10T05:55
published_at: ""

# === STATISTIKEN ===
word_count: 3721
reading_time: 19min

# === HERO IMAGE (von VisionFusen signiert) ===
heroImage: https://cdn.visionfusen.org/images/llm-guard-shell-guard-blockt-rm-rf.vf1063-04be2fb3.webp
heroImageAlt: "macOS Terminal zeigt zsh-Shell. Befehl sudo rm -rf /usr/local/Cellar/lima eingegeben. Darunter in rot: LLM Guard BLOCKED mit Warnsymbol, Recursive delete of home or root, und Override-Hinweis LLM_GUARD_ALLOW=1 before the command."
heroImageCaption: "Shell Guard blockt rm -rf. Der Befehl wurde nicht ausgeführt."
heroImageHash: "04be2fb3"
heroImageEvent: "25d02bd4e7512997f691a50cd777a189ccf05f2600573306984a28512e594615"

# === OPEN GRAPH / SOCIAL ===
ogImage: https://cdn.visionfusen.org/images/llm-guard-shell-guard-blockt-rm-rf.vf1063-04be2fb3.webp
ogImageAlt: "LLM Guard Shell Guard blockt sudo rm -rf im Terminal"

# === PUBLISHING STATUS ===
status: draft
canonical_url: "https://stevennoack.de/nostr/artikel/sichere-arbeitsumgebung-macos-setup-guide"

# === NOSTR (Kind 30023 = Long-form) ===
nostr:
  kind: 30023
  d_tag: sichere-arbeitsumgebung-auf-macos-setup-guide
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
sig: "81486040f65a5420372f4c14b97d313107615d71bd731b21cee494c95fbc376864ce545fb542aa76e4915a9565b88a7f4fe7802122256123fe8903558beab439"
note_id: "0a1a0d0eca8abc3b7063492c8b50a06476a1c6272405123f27e5c30afda568bb"
naddr: "naddr1qq5hx6trdpjhyefdv9exyetfw3eh2mt8v4382mn894kkzcm0wvkhxet5w4cz6em4d9jx2qg6waehxw309aex2mrp0yh8xar9wejkumn0v93kktnyv5q3vamnwvaz7tmjv4kxz7fwwpexjmtpdshxuet5qgsvrwh57axds2vk8q5trk5dw0jjej2v4fkcmj2y7l9y2zn4cjenz8crqsqqqa284krk07"
---

# Sichere Arbeitsumgebung auf macOS. Setup Guide
*Getestet auf iMac Intel i7, 40 GB RAM, macOS Tahoe 26.3*

---

> **Zusammenfassung:** Dieses Setup kombiniert Lima (leichtgewichtige Linux-VMs), Trivy (Security-Scanner) und LLM Guard (Prompt-Injection-Schutz) zu einer isolierten Arbeitsumgebung auf macOS. Unbekannte Repos werden in der VM gescannt und ausgeführt, nie direkt auf dem Host. LLM Guard schützt das Terminal mit 4 Schichten (Little Snitch, Network Monitor, Shell Guard, Content Scanner). Soul Signing sichert KI-Agenten-Identitäten kryptografisch über Nostr ab. Alles lokal, kein Cloud-Backend.

---

## Inhalt

- [Hintergrund & Problem](#hintergrund--problem)
- [Die Tool-Landschaft](#die-tool-landschaft-überblick)
- [Mein Setup. Schritt für Schritt](#mein-setup-schritt-für-schritt)
- [Der Scan-Workflow](#der-scan-workflow)
- [Scan-Ergebnisse richtig lesen](#scan-ergebnisse-richtig-lesen)
- [Drei-Stufen-Modell](#drei-stufen-modell)
- [Mehrere VMs mit Lima](#mehrere-vms-mit-lima)
- [Agentischer Workflow. OpenClaw + MCP Shell + Lima](#agentischer-workflow-openclaw--mcp-shell--lima)
- [LLM Guard. Eigenentwicklung](#llm-guard-eigenentwicklung-steven-noack)
- [Agenten-Identität schützen (Soul Signing)](#eine-ebene-tiefer-agenten-identität-schützen)
- [Prompt Injection Detection Tools](#prompt-injection-detection--llm-security-tools)
- [Wichtige Befehle. Kurzreferenz](#wichtige-befehle-kurzreferenz)

---

## Hintergrund & Problem

Das klassische `git clone && ./install.sh` ist ein echtes Sicherheitsrisiko. Viele Entwickler installieren Repos "blauäugig" ohne zu prüfen, was darin steckt. Dieses Dokument beschreibt einen pragmatischen Workflow um das zu ändern. Ohne aufwändige VM-Infrastruktur.

**Ziel:** Eine ressourcenschonende, isolierte Arbeitsumgebung auf macOS Intel (funktioniert auch auf M-Chips) die als Schweizer Taschenmesser für Security-Arbeit dient.

---

## Die Tool-Landschaft. Überblick

Bevor wir zum konkreten Setup kommen, hier eine Übersicht der relevanten Tools und wann man sie nutzt.

### Virtualisierung & Isolation

#### Lima (Linux Machines) ✅ *Mein Kern-Tool*
- **Was es ist:** Eine schlanke Linux-VM für macOS, läuft unsichtbar im Hintergrund
- **Wie es funktioniert:** Echter Linux-Kernel, aber kein grafisches Fenster. Reine CLI
- **Besonderheit:** Automatisches File-Sharing zwischen macOS und der VM
- **Ressourcen:** ~100–500 MB RAM, startet in Sekunden
- **Wann nutzen:** Isolierte CLI-Security-Arbeit, unbekannte Repos sicher ausführen
- **Wann nicht:** Wenn eine grafische Oberfläche gebraucht wird

#### UTM
- **Was es ist:** Kostenlose VM-Software speziell für macOS (QEMU-basiert)
- **Wie es funktioniert:** Vollständige Desktop-VMs mit GUI
- **Wann nutzen:** ParrotOS/Kali mit grafischer Oberfläche (Burp Suite etc.)
- **Ressourcen:** 3–15 GB RAM je nach Distro
- **Hinweis:** Ersetzt VMware/VirtualBox kostenlos

#### VMware Fusion / VirtualBox
- Für unseren Usecase **nicht notwendig**. UTM ersetzt sie kostenlos auf macOS

#### Docker Desktop
- Container-basiert, teilt den Host-Kernel
- Braucht im Hintergrund trotzdem eine Mini-VM auf macOS
- Ressourcenintensiver als Lima

#### OrbStack
- Leichteste "komfortable" Alternative zu Docker Desktop auf macOS
- ~150 MB RAM, sehr schneller Start, hat eine GUI
- Nach Trial-Phase kostenpflichtig für kommerzielle Nutzung
- Ressourcenverbrauch: Docker Desktop > Podman ≈ OrbStack > Lima

#### Podman
- Alternative zu Docker, läuft ohne Root-Rechte (sicherer)
- Auf macOS: braucht ebenfalls eine Mini-VM im Hintergrund
- Verfügbar: `brew install podman`

#### Distrobox
- **Läuft nur auf Linux.** Auf macOS nur innerhalb von Lima nutzbar
- Erlaubt verschiedene Linux-Distros als Container auf einem Linux-Host
- Killer-Feature: GUI-Apps aus dem Container öffnen sich im normalen Desktop
- Für macOS-User erstmal nicht relevant

---

### Linux-Distributionen (Distros)

"Distro" ist kein Tool. Es ist der Begriff für eine Linux-Betriebssystem-Variante.

| Distro | Charakter | Für wen |
|---|---|---|
| **Ubuntu** | Stabil, bestdokumentiert, viele Packages | Ideal als Lima-Basis |
| **Debian** | Noch stabiler, etwas konservativer | Server, Langzeitbetrieb |
| **ParrotOS Security** | Security-Tools vorinstalliert, MATE-Desktop | Pentester mit GUI-Bedarf |
| **ParrotOS Headless** | ParrotOS ohne GUI | CLI-Security in Lima möglich |
| **Fedora** | Cutting-edge Packages, Red Hat-Basis | Entwickler die Neues wollen |
| **Arch Linux** | Minimalistisch, nur das Nötigste | Experten, maximale Kontrolle |
| **Kali Linux** | Security-fokussiert, viele Tools | Pentesting, ähnlich wie ParrotOS |

**Empfehlung für Lima:** Ubuntu. Alle Tools verfügbar, beste Dokumentation, stabilste Basis.

**Zu ParrotOS in Lima:** Die Security-Variante mit GUI läuft nicht sinnvoll in Lima (kein Display-Adapter). ParrotOS Headless würde funktionieren, bringt aber keinen Vorteil gegenüber Ubuntu + manuell installierten Tools.

---

### Security-Scanner Tools

#### Trivy ✅ *Mein Haupt-Scanner*
- **Was es ist:** All-in-One CLI-Scanner von Aqua Security
- **Was es scannt:** Dependencies, Secrets/API Keys, CVEs, Misconfigurations, IaC
- **Besonderheit:** Kann direkt GitHub-URLs scannen. Ohne lokales Clonen
- **Installation:** `brew install trivy` (macOS) oder `apt install trivy` (Linux/Lima)
- **Wann nutzen:** Vor jeder Installation eines fremden Repos

#### Semgrep
- Statische Code-Analyse. Findet Sicherheitslücken im Source Code selbst
- Unterstützt Python, JavaScript, Go, Java, Ruby, und mehr
- Gut für: eigenen Code reviewen, Patterns erkennen

#### Gitleaks
- Scannt Git-Repos (inkl. History) auf Secrets, API Keys, Credentials
- Findet auch Dinge die schon committed und wieder gelöscht wurden

#### TruffleHog
- Ähnlich wie Gitleaks, ebenfalls Secret-Scanner für Repos
- Sehr gründlich bei der History-Analyse

#### Bandit
- Python-spezifisch
- Findet unsichere Code-Patterns in Python-Projekten

#### Lynis
- System-Hardening-Audit. Läuft direkt auf dem Host
- Analysiert Konfigurationen, installierte Pakete, Berechtigungen
- Gut für: Server-Audits, eigene Systeme prüfen

#### ClamAV
- Klassischer Malware-Scanner für Linux
- Gut für: Dateien und Scripts auf bekannte Malware prüfen

#### OpenVAS
- Vollständiger Netzwerk-Vulnerability-Scanner
- Über 80.000 Tests. Eher Enterprise-Einsatz
- Gut für: Netzwerk-Audits, Compliance

#### Nmap
- Netzwerk-Scanner, prüft offene Ports und Services
- Grundwerkzeug für Netzwerk-Reconnaissance

#### Nikto
- Web-Server-Scanner
- Findet bekannte Web-Schwachstellen, Fehlkonfigurationen

#### Jit.io
- SaaS-Plattform die mehrere Tools bündelt (Trivy, Semgrep, Gitleaks etc.)
- Ein Dashboard, priorisierte Findings
- CI/CD-nativ, für Teams gedacht. Kommt einer "All-in-One Security Suite" am nächsten

#### Snyk
- Ähnlich wie Jit, sehr populär bei Einzelentwicklern
- One-CLI für Code, Dependencies, Container, IaC
- Freemium-Modell

---

## Was es (noch) nicht gibt

Ein poliertes Konsumenten-Tool das sagt: *"Dieses Repo installieren? Lass mich erst scannen"*. Mit einfachem UX, Ampel-System, für nicht-technische User. Die bestehenden Tools sind entweder zu developer-lastig (CI/CD) oder zu enterprise-schwer. **Das wäre ein interessantes Produkt-Konzept.**

---

## Mein Setup. Schritt für Schritt

### System
- **Hardware:** iMac, 3,8 GHz 8-Core Intel i7, 40 GB RAM
- **OS:** macOS Tahoe 26.3
- **Hinweis:** macOS Tahoe ist die letzte Version mit Intel-Mac-Support

### Schritt 1. Homebrew-Problem lösen (Intel-Mac spezifisch)

Auf älteren Intel-Macs kann Homebrew einen nicht-standard Cellar-Pfad haben:

```bash
# Problem prüfen
brew --cellar
# Wenn das zurückkommt: /usr/local/Homebrew/Cellar (statt /usr/local/Cellar)

# Symlink setzen
sudo ln -s /usr/local/Homebrew/Cellar /usr/local/Cellar

# Kaputten Lima-Link entfernen falls vorhanden
rm /usr/local/var/homebrew/linked/lima
brew cleanup lima
LLM_GUARD_ALLOW=1 sudo rm -rf /usr/local/Cellar/lima
```

### Schritt 2. Lima installieren

```bash
brew install lima
```

### Schritt 3. Lima starten & Ubuntu-VM einrichten

```bash
limactl start
# → "Proceed with the current configuration" wählen
# Lädt Ubuntu (~3,5 GB), einmalig, dauert 3–5 Minuten
```

### Schritt 4. In Lima einloggen & System updaten

```bash
lima
sudo apt update && sudo apt upgrade -y
```

### Schritt 5. Trivy installieren

```bash
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | gpg --dearmor | sudo tee /usr/share/keyrings/trivy.gpg > /dev/null
echo "deb [signed-by=/usr/share/keyrings/trivy.gpg] https://aquasecurity.github.io/trivy-repo/deb generic main" | sudo tee /etc/apt/sources.list.d/trivy.list
sudo apt update
sudo apt install trivy -y

# Verifizieren
trivy --version
```

### Schritt 6. macOS-Ordner als schreibbar mounten ⚠️ Pflicht für jeden

> **Wichtig:** Lima mountet den macOS-Home-Ordner bei **jeder Neuinstallation standardmäßig als read-only**. Das ist kein Bug, sondern eine bewusste Sicherheitsentscheidung von Lima. Ohne diesen Schritt können Scan-Ergebnisse nicht auf macOS gespeichert werden. Dieser Schritt ist also für jeden notwendig, nicht nur in Sonderfällen.

Fix:

```bash
# Lima verlassen und stoppen
exit
limactl stop default

# Konfiguration bearbeiten
limactl edit default
# In vim: mounts-Abschnitt finden, writable: true hinzufügen
# Speichern: ESC → :wq → Enter

# Falls Einrückung falsch (häufiges Problem):
sed -i '' 's/^writable: true/  writable: true/' ~/.lima/default/lima.yaml

# Lima neu starten
limactl stop default
limactl start default
lima

# Test
touch /Users/stevennoack/dev/test.txt
# Kein Fehler = funktioniert ✓
```

---

## Der Scan-Workflow

### Repo scannen bevor du es installierst

```bash
# In Lima:
trivy repo https://github.com/jemand/irgendwas
```

**Was Trivy dabei macht:**
1. Repo temporär in die Lima-VM herunterladen (nicht auf macOS)
2. Dependencies, Secrets, CVEs, Misconfigurations analysieren
3. Report ausgeben

Das geklonte Repo landet nur in der VM. Dein macOS sieht den Code nie.

### Ergebnis als Datei speichern

```bash
# Als lesbare Tabelle
trivy repo https://github.com/jemand/irgendwas --format table --output /Users/stevennoack/trivy-scan.txt

# Als JSON (maschinenlesbar)
trivy repo https://github.com/jemand/irgendwas --format json --output /Users/stevennoack/dev/trivy-scan.json
```

Da der macOS-Ordner in Lima gemountet ist, liegt die Datei sofort auf dem Mac. Kein Kopieren nötig.

---

## Scan-Ergebnisse richtig lesen

### Severity-Stufen

| Level | Bedeutung | Handlung |
|---|---|---|
| **CRITICAL** | Sofort kritisch, aktiv ausnutzbar | Repo nicht installieren |
| **HIGH** | Ernstes Problem | Genauer prüfen |
| **MEDIUM** | Mittleres Risiko | Im Kontext bewerten |
| **LOW** | Geringes Risiko | Notiz, kein Blocker |

### Pfade im Blick behalten

```
src/           ← echtes Problem wenn Vulnerability hier
lib/           ← echtes Problem
package.json   ← echtes Problem

testdata/      ← wahrscheinlich absichtlich (Test-Fixtures)
integration/   ← oft Test-Daten
fixtures/      ← fast immer absichtlich
```

**Wichtig:** Viele Repos (wie Trivy selbst) enthalten absichtlich verwundbare Test-Dateien um ihre eigenen Scanner zu testen. Vulnerabilities in `testdata/`-Ordnern sind in der Regel kein echtes Problem.

### Secrets-Findings bewerten

Trivy maskiert gefundene Secrets automatisch (`*****`). Trotzdem prüfen:
- In welchem Pfad wurde es gefunden?
- Ist es ein echter Key oder ein Test-Wert/Regex-Pattern?
- Steht es in einer Datei die ins Produktionssystem geht?

---

## Sicherheitshinweis: Die JSON-Datei

Die Scan-Output-Datei (JSON oder TXT) ist **nur Text**. Sie wird nicht automatisch ausgeführt. Sie ist harmlos solange du:

- Sie nicht in einer Web-App renderst (XSS-Risiko)
- Sie nicht mit einem Script weiterverarbeitest das den Inhalt ausführt
- Keinen Editor-Plugin hast der JSON automatisch interpretiert

**Der echte Angriff wäre anders:** "Scanner Poisoning". Etwas im Repo das während des Scannens selbst triggert. Das ist eine reale aber seltene Angriffsmethode. Trivy scannt statisch und führt keinen Code aus, was dieses Risiko minimiert.

---

## Drei-Stufen-Modell

| Stufe | Setup | Usecase | Aufwand |
|---|---|---|---|
| **1. Sofort** | `brew install trivy` direkt auf macOS | Schnelle Repo-Checks | 2 Minuten |
| **2. Mein Setup** | Lima + Ubuntu + Trivy | Isolierte Security-Arbeit, CLI-Tools | 1 Nachmittag |
| **3. Bei Bedarf** | UTM + ParrotOS GUI | Grafische Tools (Burp Suite etc.) | 2–3 Stunden |

---

## Ressourcenvergleich

| Setup | RAM | Disk | Lüfter |
|---|---|---|---|
| VMware + ParrotOS GUI | ~4 GB | 20–40 GB | oft |
| UTM + ParrotOS GUI | ~3 GB | 15–25 GB | manchmal |
| Lima + Ubuntu + Tools | ~500 MB | ~4 GB | selten |
| Trivy direkt auf macOS | ~0 MB idle | minimal | nie |

---

## Mehrere VMs mit Lima

Lima unterstützt mehrere parallele VMs. Jede komplett unabhängig, mit eigener Distro, eigenen Tools und eigener Isolation.

### VMs erstellen und verwalten

```bash
# Neue VM mit eigenem Namen erstellen
limactl start --name security
limactl start --name projekt-xyz

# Alle VMs und deren Status anzeigen
limactl list

# In eine bestimmte VM einloggen
lima security
lima projekt-xyz

# Bestimmte VM stoppen
limactl stop security
```

### Sinnvolle Aufteilung

| VM | Zweck | Besonderheit |
|---|---|---|
| `default` | Allgemeine Arbeit, Trivy-Scans | Standard-Ubuntu, immer bereit |
| `security` | Aggressive Tools, unbekannte Repos ausführen | Kann bedenkenlos "verschmutzt" werden |
| `experiments` | Neue Tools ausprobieren | Wegwerfbar. Einfach löschen und neu |

### VMs sind komplett voneinander isoliert

- Eigene Distro pro VM möglich (Ubuntu, Fedora, Arch...)
- Eigene installierte Tools
- Eigene Disk, eigener RAM-Anteil
- Kein gemeinsamer Zustand zwischen VMs

### Ressourcen bei meinem Setup

Mit 40 GB RAM laufen problemlos 3–4 VMs gleichzeitig. Jede braucht nur ~500 MB RAM im Idle-Zustand.

### Lima-Verhalten beim Mac-Start

Lima startet **nicht automatisch** beim Mac-Start. Das ist Absicht. Die VM läuft nur bei aktiver Arbeit:

- **Mac schläft** → Lima pausiert, wacht automatisch wieder auf
- **Mac Neustart/Shutdown** → Lima stoppt, danach manuell neu starten
- **Terminal schließen** → Lima läuft weiter im Hintergrund
- **Manuell stoppen** → `limactl stop default`

Wer Lima beim Login automatisch starten will, kann einen macOS LaunchAgent einrichten. Für den normalen Usecase ist manuelles Starten aber besser.

---

## Agentischer Workflow. OpenClaw + MCP Shell + Lima

### Was OpenClaw ist

OpenClaw (früher Clawdbot) ist ein Open-Source-Framework für autonome KI-Agenten die lokal auf deinem Rechner laufen. Es gibt Claude "Hände". Der Agent kann selbstständig Dateien lesen/schreiben, Befehle ausführen, im Web suchen, und über Messaging-Kanäle erreichbar sein.

**Mein Setup:**
- **OpenClaw Gateway** läuft lokal auf dem iMac
- **Opus 4.6** als Haupt-Agent (komplexe Aufgaben, tiefes Reasoning)
- **Sonnet 4.6** als Multi-Agent (parallele Subtasks, kostengünstiger)
- **MCP Shell Server** eingebunden → voller Zugriff auf macOS und Terminal

### Die Verbindung: OpenClaw → MCP Shell → Lima

Da der MCP Shell Server eingebunden ist, kann OpenClaw/Claude direkt Lima-Befehle ausführen:

```
OpenClaw (Opus 4.6)
    → MCP Shell Server
        → lima <befehl>
            → arbeitet isoliert in der Lima-VM
                → Ergebnis via Mount zurück auf macOS
```

**Konkrete Beispiele was der Agent jetzt tun kann:**

```bash
# Repo in Lima scannen (isoliert)
lima trivy repo https://github.com/jemand/repo

# Repo in Lima klonen und bearbeiten
lima git clone https://github.com/jemand/repo /tmp/mein-repo
lima nano /tmp/mein-repo/src/config.js

# Install-Script sicher testen
lima bash /tmp/mein-repo/install.sh

# Ergebnis auf macOS verfügbar machen
lima cp /tmp/mein-repo/output.json /Users/stevennoack/dev/output.json
```

### Der vollständige sichere Agentenworkflow

```
Ich sage OpenClaw: "Schau dir dieses Repo an, scan es und passe X an"

OpenClaw (Opus 4.6):
  1. → MCP Shell → lima trivy repo <url>     (Scan, isoliert)
  2. → liest Scan-Ergebnis via Mount
  3. → bewertet Risiko
  4. → MCP Shell → lima git clone <url>      (Klon, isoliert)
  5. → MCP Shell → lima <code bearbeiten>    (Arbeit, isoliert)
  6. → Ergebnis landet via Mount auf macOS

macOS wurde zu keinem Zeitpunkt direkt mit unbekanntem Code berührt.
```

### Warum Lima hier der entscheidende Sicherheitsgewinn ist

Ohne Lima: OpenClaw/Claude führt Befehle direkt auf macOS aus. Bei bekanntem, vertrauenswürdigem Code kein Problem. Bei unbekannten Repos ein Risiko.

Mit Lima: Selbst wenn der Agent einen Fehler macht, etwas Unerwartetes ausführt, oder ein Repo schädlichen Code enthält. Alles bleibt in der VM eingesperrt. macOS bleibt unberührt.

```
Ohne Lima:  OpenClaw → macOS (direkt)
Mit Lima:   OpenClaw → Lima-VM → macOS nur via Mount (kontrolliert)
```

### Wichtiger Hinweis zu OpenClaw + Yolo Mode

OpenClaw kann mit `--dangerously-skip-permissions` (Yolo Mode) konfiguriert werden. Das erlaubt dem Agenten alle Befehle ohne Bestätigung auszuführen. **Genau für diesen Fall ist Lima die Sicherheitsschicht.** Yolo Mode in Lima ist akzeptabel. Yolo Mode direkt auf macOS ohne Isolation ist riskant.

---

## Prompt Injection Detection & LLM Security Tools

Klassische Security-Scanner wie Trivy erkennen keine Prompt Injection. Das ist ein LLM-spezifischer Angriffsvektor der eigene Tools braucht.

### LLM Guard. Eigenentwicklung (Steven Noack)

Wer die Screenshots in diesem Guide genau anschaut, sieht beim Terminal-Start:

```
🛡️  LLM Guard: Shell Guard aktiv
   Deaktivieren: unset LLM_GUARD_ENABLED
   Einmalig erlauben: LLM_GUARD_ALLOW=1 <command>
```

Das ist **LLM Guard**. Eine Eigenentwicklung von Steven Noack, entstanden am 9. Februar 2026. Es ist genau die Lücke die im Abschnitt "Was es noch nicht gibt" beschrieben wird: Consumer-seitige Prompt-Injection-Abwehr und KI-Workflow-Sicherheit. Enterprise-Tools wie Lakera, Rebuff und Arthur Shield existieren. Für Einzelpersonen gab es nichts. Also selbst gebaut.

**Philosophie:** KI als Partner, nicht als Bedrohung. Aber mit Leitplanken. Kein Cloud-Backend, kein Tracking, läuft komplett lokal. Jeder Block ist bypassbar (`LLM_GUARD_ALLOW=1`). Transparenz statt Kontrolle.

**Status:** ✅ Produktiv. 81/81 Tests grün.

#### Architektur. 4 Verteidigungsschichten

```
Layer 7 — Little Snitch (System-Firewall)
~677.000 blockierte Domains (1Host Lite + HaGeZi)
Claude Desktop → intercom.io ✗   Wispr Flow → sentry.io ✗
         ↓
Layer 4 — Network Monitor (Passives Monitoring)
LaunchAgent: ai.llmguard.network
lsof-basiert, SQLite-History, Suspicious Pattern Matching
Überwacht: python / node / codex / claude / curl / wget / git
         ↓
Layer 2 — Shell Guard (Aktives Blocking)
zsh accept-line Widget, preexec Hook
37 Patterns: Exfil, Destructive, Reverse Shells, Credentials
Blockt im Command-Buffer. Command läuft gar nicht erst
         ↓
Layer 1 — Content Scanner (Prompt Injection Detection)
188 Patterns aus Lakera, NVIDIA Garak, deepset Datasets
PDF/HTML/Text-Scanning über MCP-Tools oder CLI
```

#### Layer 2: Shell Guard. Das was du im Terminal siehst

Hängt sich in den **zsh `accept-line`-Widget** ein. Vor jedem Enter-Druck. Der auslösende Moment: Codex wollte am 12. Februar 2026 ein Verzeichnis "bereinigen" und schlug `rm -rf ~/dev/memory-blocks/services/old/` vor. Shell Guard hat geblockt bevor der Command die Shell erreichte. Kein Datenverlust.

```
🛑 LLM Guard: BLOCKED
   ⛔ Recursive delete of home or root
   Command: rm -rf ~/dev/...
   Override: LLM_GUARD_ALLOW=1 before the command
```

Bypass wenn der Befehl legitim ist:
```bash
LLM_GUARD_ALLOW=1 sudo rm -rf /usr/local/Cellar/lima
```

![LLM Guard Shell Guard blockt rm -rf](https://cdn.visionfusen.org/images/llm-guard-shell-guard-blockt-rm-rf.vf1063-04be2fb3.webp)

Genau dieser Befehl war Teil dieser Guide-Session. Lima-Installation, kaputtes Cellar-Verzeichnis musste gelöscht werden. LLM Guard hat geblockt, Override mit `LLM_GUARD_ALLOW=1` war die korrekte Lösung.

#### Layer 1: Content Scanner

Vier Erkennungsschichten mit 188 Regex-Signaturen:
- Pattern Scanner → Classic Injection, Garak, Lakera/deepset Patterns
- Heuristic Scanner → Base64, Zero-Width-Chars, Rollenübernahme
- HTML Parser → CSS-Hidden, Comments, White-on-White Text
- PDF Parser → Weiße Schrift unter 1pt, Invisible Layers

Risk Score 0–100: unter 30 = clean, 31–60 = Warnung, über 60 = blockiert.

Als MCP-Server direkt in Claude Desktop eingebunden:
```bash
llm-guard scan report.pdf
llm-guard scan ./skills/ --recursive
echo "Ignore all previous" | llm-guard scan
```

#### Layer 4: Network Monitor

Läuft als macOS LaunchAgent, prüft alle 5 Sekunden alle Netzwerkverbindungen auf überwachte Prozesse. Kein aktives Blocking (zu viele False Positives bei localhost-Services wie Qdrant). Aber sofortige Telegram-Alerts bei verdächtigen Verbindungen zu Pastebin, ngrok, webhook.site, anonymen File-Upload-Services oder rohen IP:Port-Kombinationen.

#### Layer 7: Little Snitch

![Little Snitch Network Monitor zeigt Verbindungen](https://cdn.visionfusen.org/images/little-snitch-network-monitor-zeigt-verbindungen.vf1063-0fdd9cd9.webp)

~677.000 blockierte Domains systemweit. Konkrete Beispiele die täglich geblockt werden:
- Claude Desktop → `intercom.io` (User Tracking)
- Wispr Flow → `sentry.io` (Error Tracking)
- Wispr Flow → `posthog.com` (Analytics)

Die Apps funktionieren trotzdem. Das ist reine Telemetrie, keine Kernfunktionalität.

Öffentlich dokumentiert auf [stevennoack.de](https://stevennoack.de).

---

### Eine Ebene tiefer. Agenten-Identität schützen

LLM Guard schützt das System. Aber was schützt den Agenten selbst?

Wenn ein KI-Agent wie Spur (OpenClaw, Opus 4.6) dauerhaft läuft, Dateien liest, Entscheidungen trifft und Memory aufbaut. Da entsteht eine neue Angriffsfläche: die Steuerungsdateien des Agenten selbst. Was wenn jemand nachts `AGENTS.md` editiert und die Sicherheitsregeln entfernt? Was wenn vergangene Erinnerungen heimlich umgeschrieben werden?

Die Antwort: ein kryptografisches Vertrauenssystem auf Basis von Nostr.

**Soul Signing.** SHA-256 Hashes aller Steuerungsdateien (Persönlichkeit, Regeln, Identität) werden als signierte Events auf 4 Nostr-Relays published. Bei jedem Session-Start automatische Verifikation. Manipulation wird sofort erkannt.

**Memory Chain.** Eine Merkle Chain sichert alle Memory-Dateien. Jeder neue Eintrag kettet den Hash des vorherigen ein. Ändere einen Eintrag in der Vergangenheit → alle nachfolgenden Hashes brechen.

> *"Die Wahrheit liegt nicht auf der Platte. Sie liegt auf den Relays."*

Selbst bei vollem Schreibzugriff aufs Dateisystem: ohne den Nostr-Signing-Key ist jede Manipulation beweisbar nachweisbar.

Das ist ein eigenes, umfangreiches Thema. Vollständig dokumentiert als separater Artikel auf [stevennoack.de](https://stevennoack.de).

---

### Was Prompt Injection ist

Prompt Injection bedeutet: versteckte Anweisungen in Text, Dokumenten oder Web-Inhalten die einen KI-Agenten dazu bringen unerwünschte Aktionen auszuführen. Besonders relevant bei Agenten-Setups wie OpenClaw die autonom Dokumente lesen, Web-Inhalte verarbeiten oder Code ausführen.

**Zwei Arten:**
- **Direkt:** Nutzer gibt böswillige Anweisung direkt ein ("Ignore all prior instructions...")
- **Indirekt:** Schädliche Anweisung versteckt in Dokument, E-Mail, Webpage die der Agent verarbeitet

### Tools im Überblick

#### Garak ✅ *Empfehlung. Lokal, kein Cloud-Zwang*
- Open Source, läuft komplett lokal in Lima
- Umfangreiche Probe-Library: Jailbreaks, Injection, Toxicity, Halluzinationen, Data Leakage
- Unterstützt 20+ AI-Plattformen inkl. lokale Modelle
- Installation in Lima:
```bash
pip install garak
garak --model openai:gpt-4o --probes promptinject
```

#### Promptfoo ✅ *Empfehlung. CLI, lokal nutzbar*
- 50+ Plugins für Prompt Injection, PII Leakage, Jailbreaks und mehr
- CLI-basiert, lokal nutzbar, kein Cloud-Zwang
- Gut für: eigene Agenten und Prompts testen
```bash
npm install -g promptfoo
promptfoo redteam run
```

#### promptmap2
- Laser-fokussiert auf Prompt Injection in System Prompts
- Dual-AI-Architektur. Testet aktiv Angriffe und prüft ob sie erfolgreich waren
- Gut für: eigene System Prompts auf Schwachstellen prüfen

#### Rebuff
- Selbst-hostbar, mehrschichtiger Ansatz: Heuristiken + LLM-Detection + VectorDB + Canary Tokens
- Braucht OpenAI API Key und Pinecone. Nicht vollständig lokal
- Noch Prototyp-Status. Keine 100% Schutzgarantie

#### LangKit
- Open-Source Monitoring-Toolkit für LLMs
- Extrahiert Sicherheitssignale aus Prompts und Responses in Echtzeit
- Gut für: laufende Überwachung von Agenten-Aktivität

### Vergleich

| Tool | Lokal | Fokus | Für wen |
|---|---|---|---|
| **LLM Guard** | ✅ ja | Breite LLM-Sicherheit | Produktiv im Einsatz |
| **Garak** | ✅ ja | Schwachstellen-Scanning | Eigene Modelle/Agenten testen |
| **Promptfoo** | ✅ ja | Red Teaming, viele Plugins | System Prompts angreifen |
| **promptmap2** | ✅ ja | Nur Prompt Injection | Gezielter Injection-Test |
| **Rebuff** | ⚠️ teilweise | Injection Detection | Braucht externe APIs |
| **MS Prompt Shields** | ❌ nein | Enterprise Injection | Azure-Pflicht |

### Empfohlener Workflow in Lima

```bash
# Garak installieren
pip install garak --break-system-packages

# Eigenen Agenten/Prompt testen
garak --model openai:gpt-4 --probes promptinject,jailbreak

# Promptfoo für Red Teaming
npm install -g promptfoo
promptfoo redteam init
promptfoo redteam run
```

---

## Weitere nützliche Tools in Lima

```bash
# Installation
sudo apt install nmap nikto gobuster gitleaks -y

# Trivy direkt auf macOS für schnelle Checks
brew install trivy

# Eigenen Code scannen
trivy fs /Users/stevennoack/mein-projekt

# Container-Image scannen
trivy image nginx:latest
```

---

## Setup in Aktion

![OpenClaw Agent meldet Lima/Trivy Status](https://cdn.visionfusen.org/images/openclaw-agent-meldet-limatrivy-status.vf1063-dd812795.webp)

Was auf dem Screenshot zu sehen ist, ist kein Mock. Das ist der beschriebene Workflow live in Betrieb. OpenClaw (Opus 4.6) meldet sich über den MCP Shell Server aus der laufenden Lima-VM:

```
Voller Zugriff. Lima VM mit Ubuntu läuft, Trivy ist installiert
und die Vulnerability DB ist von heute.

Was soll ich scannen? Ich kann z.B.:
• Container Images: trivy image <name>
• Lokale Dateisysteme: trivy fs /pfad
• Git Repos: trivy repo <url>
• SBOM generieren: trivy sbom
• Config-Scans: trivy config (Dockerfile, K8s, Terraform)
```

Der Agent weiß selbstständig dass Lima läuft, Trivy installiert ist und die Datenbank aktuell ist. Ohne dass der Nutzer irgendetwas eingeben musste. Er wartet auf einen Scan-Auftrag und führt ihn isoliert in der VM aus. Das macOS-System wird dabei zu keinem Zeitpunkt direkt berührt.

---

## Wichtige Befehle. Kurzreferenz

```bash
# Lima starten/stoppen
limactl start default
limactl stop default
lima                          # Shell öffnen
exit                          # Lima verlassen (VM läuft weiter)

# Trivy Scans
trivy repo <github-url>                    # Repo scannen
trivy fs /pfad/zum/projekt                 # Lokalen Ordner scannen
trivy image <image-name>                   # Docker-Image scannen
trivy repo <url> --format json --output ~/scan.json   # Als JSON speichern
trivy repo <url> --severity CRITICAL,HIGH  # Nur kritische Findings

# Lima Konfiguration
limactl edit default          # Config bearbeiten
limactl list                  # Alle VMs anzeigen
```

---

*Setup getestet auf: iMac Intel i7 3,8 GHz, 40 GB RAM, macOS Tahoe 26.3, Lima 2.0.3, Trivy 0.69.3*

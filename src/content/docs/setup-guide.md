---
title: Mein erstes Setup – Anleitung
description: Eine Kurzbeschreibung der Seite (optional, aber empfohlen)
---


# Entwicklungsumgebung Setup Guide für Einsteiger

## Was ist das hier?

Dieser Guide erklärt die **Grundausstattung** für moderne Softwareentwicklung auf dem Mac. Egal ob du Webseiten baust, Python lernst oder Server verwaltest - diese Tools brauchst du.

---

## Die 5 wichtigsten Tools

### 1. **Homebrew** 🍺
**Was ist das?**  
Ein Paketmanager für macOS - wie ein App Store für Entwickler-Tools im Terminal.

**Warum brauche ich das?**
- Installiert Programme mit einem Befehl
- Hält alles aktuell
- Funktioniert zuverlässig auf Intel und M1/M2/M3 Macs

**Beispiel:**
```bash
brew install git          # Git installieren
brew update              # Alle Pakete aktualisieren
```

**Installation:**
```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

---

### 2. **Git** 📝
**Was ist das?**  
Versionskontrolle für deinen Code. Wie "Änderungen nachverfolgen" in Word, aber viel mächtiger.

**Warum brauche ich das?**
- Speichert jede Version deines Codes
- Du kannst zu älteren Versionen zurück
- Zusammenarbeit mit anderen
- Standard in der Industrie
- Funktioniert mit GitHub/GitLab

**Beispiel:**
```bash
git init                 # Projekt starten
git add .               # Änderungen markieren
git commit -m "Text"    # Änderungen speichern
git push                # Auf Server hochladen
```

**Konfiguration:**
```bash
git config --global user.name "Dein Name"
git config --global user.email "deine@email.de"
```

---

### 3. **Docker Desktop** 🐋
**Was ist das?**  
Verpackt deine Anwendung mit allem was sie braucht in einen "Container" - eine Art Mini-Computer in deinem Computer.

**Warum brauche ich das?**
- "Funktioniert auf meinem Rechner" → funktioniert überall
- Keine Konflikte zwischen Projekten
- Gleiche Umgebung: lokal, auf dem Server, bei Kollegen
- Einfaches Deployment

**Beispiel:**
```bash
docker run nginx        # Webserver starten
docker compose up       # Komplettes Projekt starten
```

**Wichtig bei M1/M2/M3 Macs:**
Wenn du für Intel-Server (AMD64) baust:
```bash
docker buildx build --platform linux/amd64 .
```

---

### 4. **Visual Studio Code (VS Code)** 💻
**Was ist das?**  
Ein moderner Code-Editor von Microsoft. Kostenlos, mächtig, erweiterbar.

**Warum brauche ich das?**
- Syntax-Highlighting für alle Programmiersprachen
- Git-Integration (grafisch!)
- Erweiterungen für alles
- Remote-Entwicklung auf Servern möglich
- Terminal integriert

**Wichtige Erweiterungen:**
- Docker
- GitLens
- Remote - SSH
- Python (falls du Python nutzt)

---

### 5. **SSH-Keys** 🔐
**Was ist das?**  
Digitale Schlüssel für sichere Verbindungen - ohne Passwort eintippen.

**Warum brauche ich das?**
- Sicherer als Passwörter
- Verbindung zu Servern
- Authentifizierung bei GitHub
- Einmal einrichten, immer nutzen

**Erstellen:**
```bash
ssh-keygen -t ed25519 -C "deine@email.de"
# 3x Enter drücken
```

**Auf GitHub hinterlegen:**
```bash
pbcopy < ~/.ssh/id_ed25519.pub  # Key kopieren
# Dann auf https://github.com/settings/keys einfügen
```

---

## Unterschiede: Intel vs. Apple Silicon (M1/M2/M3)

### Intel Mac (x86_64)
- Homebrew: `/usr/local/bin/brew`
- Docker: Läuft nativ
- Für Server-Entwicklung oft einfacher (Server sind meist Intel/AMD)

### M1/M2/M3 Mac (arm64)
- Homebrew: `/opt/homebrew/bin/brew`
- Docker: Läuft via Rosetta 2 oder nativ (arm64)
- **Wichtig:** Für Intel-Server mit `--platform linux/amd64` bauen!

---

## Typischer Workflow

### Lokal entwickeln
```bash
cd ~/dev/mein-projekt
code .                   # VS Code öffnen
docker compose up        # Projekt starten
# Im Browser: http://localhost:8080
```

### Auf GitHub speichern
```bash
git add .
git commit -m "Feature XY hinzugefügt"
git push
```

### Auf anderem Mac laden
```bash
git clone git@github.com:username/projekt.git
cd projekt
docker compose up
```

### Auf Server deployen
```bash
ssh user@server
git pull
docker compose up -d
```

---

## Ordnerstruktur

### Empfohlener Aufbau
```
~/dev/                          # Haupt-Entwicklungsordner
  ├── projekt1/
  │   ├── docker-compose.yaml   # Docker-Konfiguration
  │   ├── .env                  # Umgebungsvariablen (nie ins Git!)
  │   ├── .gitignore            # Was nicht ins Git soll
  │   ├── README.md             # Projekt-Dokumentation
  │   └── src/                  # Dein Code
  ├── projekt2/
  └── tests/
```

---

## Setup-Checkliste

### iMac (Intel)
- [ ] Homebrew installiert
- [ ] Git installiert und konfiguriert
- [ ] Docker Desktop installiert
- [ ] VS Code installiert
- [ ] SSH-Key erstellt
- [ ] SSH-Key auf GitHub: "iMac"
- [ ] `~/dev/` Ordner angelegt
- [ ] `docker run hello-world` funktioniert

### MacBook (M1/M2/M3)
- [ ] Homebrew installiert (`/opt/homebrew`)
- [ ] Git installiert und konfiguriert
- [ ] Docker Desktop installiert
- [ ] VS Code installiert
- [ ] SSH-Key erstellt (separater Key!)
- [ ] SSH-Key auf GitHub: "MacBook"
- [ ] `~/dev/` Ordner angelegt
- [ ] `docker run hello-world` funktioniert

---

## Häufige Fragen

### "Muss ich das alles wirklich brauchen?"

**Ja!** Das ist das absolute Minimum für professionelles Arbeiten:
- **Homebrew:** Installiert alles andere
- **Git:** Standard für Code-Verwaltung
- **Docker:** Standard für Deployment
- **VS Code:** Beste Balance aus Komfort und Funktionalität
- **SSH:** Sicherer Zugang zu Servern

### "Kann ich auch GitHub Desktop statt Terminal nutzen?"

**Nicht empfohlen.** VS Code hat Git integriert (grafisch), und du solltest Terminal-Grundlagen lernen. Das funktioniert überall.

### "Brauche ich unterschiedliche SSH-Keys für jeden Mac?"

**Ja!** Sicherheitsgründe. Wenn ein Gerät verloren geht, kannst du nur dessen Key löschen.

### "Was ist der Unterschied zwischen Docker und einer VM?"

**Docker (Container):**
- Leichtgewichtig
- Sekunden zum Starten
- Teilt sich Kernel mit Host
- Perfekt für Anwendungen

**VM (Virtuelle Maschine):**
- Schwer
- Minuten zum Starten
- Komplettes Betriebssystem
- Für andere Betriebssysteme

### "Wie synchronisiere ich Code zwischen Macs?"

**Git/GitHub!** Nicht iCloud oder Dropbox.

```bash
# Mac 1
git push

# Mac 2
git pull
```

---

## Nützliche Befehle

### Homebrew
```bash
brew update                 # Homebrew selbst aktualisieren
brew upgrade                # Alle Pakete aktualisieren
brew list                   # Installierte Pakete anzeigen
brew search NAME            # Paket suchen
brew info PAKET            # Info zu Paket
```

### Docker
```bash
docker ps                   # Laufende Container
docker images               # Vorhandene Images
docker system prune -af     # Aufräumen (Speicherplatz)
docker compose up -d        # Im Hintergrund starten
docker compose logs -f      # Logs live anschauen
```

### Git
```bash
git status                  # Was ist geändert?
git log --oneline          # Historie anzeigen
git diff                   # Änderungen sehen
git checkout -b feature    # Neuen Branch erstellen
```

### SSH
```bash
ssh user@server            # Auf Server verbinden
ssh-add -l                # Geladene Keys anzeigen
ssh-keygen -l -f KEY      # Key-Fingerprint anzeigen
```

---

## Weiterführende Ressourcen

- **Git:** https://git-scm.com/book/de/v2
- **Docker:** https://docs.docker.com/get-started/
- **VS Code:** https://code.visualstudio.com/docs
- **Homebrew:** https://brew.sh/

---

## Zusammenfassung

Du hast jetzt die **Grundausstattung eines professionellen Entwicklers**:

1. ✅ Werkzeuge installieren (Homebrew)
2. ✅ Code verwalten (Git)
3. ✅ Anwendungen verpacken (Docker)
4. ✅ Komfortabel entwickeln (VS Code)
5. ✅ Sicher verbinden (SSH)

**Diese 5 Tools nutzt jeder Entwickler, egal ob Anfänger oder Profi!**

---

**Erstellt:** Oktober 2025  
**Für:** macOS (Intel und Apple Silicon)  
**Level:** Einsteiger
---
title: TinaCMS Setup - Die definitive Anleitung
description: >-
  Bulletproof TinaCMS Setup für Astro + Cloudflare Pages in 5-10 Minuten.
  Getestet, optimiert, alle Fallstricke dokumentiert!
pubDate: Oct 27 2024
author: Steven Noack
tags:
  - TinaCMS
  - Astro
  - Tutorial
  - JAMstack
  - Headless CMS
---

# TinaCMS Setup - Die definitive Anleitung

**Für Astro + Cloudflare Pages + GitHub**

Nach 2 Stunden Debugging und Trial-and-Error habe ich ALLE Stolpersteine dokumentiert. Mit dieser Anleitung schaffst du das Setup in 5-10 Minuten!

## 🎯 Was du am Ende hast

**Zwei Workflows - volle Flexibilität:**

### Workflow 1: Lokal (Development)

```
Zuhause mit VS Code + Terminal
→ http://localhost:4321/admin/index.html
→ Local Mode (gelbe Warnung = normal!)
→ Artikel schreiben → Save → File System
→ Git commit + push manuell
```

### Workflow 2: Cloud (Production)

```
Unterwegs - beliebiger Browser, KEIN Dev-Setup nötig!
→ https://deine-domain.de/admin
→ Login mit GitHub
→ Cloud Mode
→ Artikel schreiben → Save → Auto-Commit zu GitHub → Auto-Deploy
→ FERTIG! Kein Terminal!
```

**Das ist die Power von TinaCloud!** Du kannst von überall editieren - Laptop, iPad, sogar vom Handy!

## ⚠️ KRITISCH: Der .tina vs tina Fehler

**DAS ist der Hauptfehler, der 2 Stunden kostet!**

### Das Problem

Wenn du **`.tina/config.ts`** (MIT Punkt) erstellst:

* TinaCMS generiert automatisch auch `tina/config.ts` (OHNE Punkt)
* TinaCMS lädt standardmäßig `tina/config.ts`
* Deine Client ID in `.tina/config.ts` wird **IGNORIERT**
* Result: Kein Login-Button, nur Local Mode ❌

### Die Lösung

**Nutze IMMER `tina/` (ohne Punkt)!**

```bash
# Check ob .tina existiert:
ls -la | grep tina

# Wenn .tina existiert - LÖSCHEN:
rm -rf .tina/

# Dann nur tina/ nutzen:
mkdir -p tina
```

**Merke:** `tina/` ohne Punkt = richtig ✅

## Voraussetzungen

* ✅ Astro-Projekt läuft lokal
* ✅ GitHub Repository existiert
* ✅ Cloudflare Pages ist verbunden

## 1. Installation (2 Min)

```bash
npm install tinacms @tinacms/cli
```

**package.json Scripts anpassen:**

```json
{
  "scripts": {
    "dev": "tinacms dev -c \"astro dev\"",
    "build": "tinacms build && astro check && astro build"
  }
}
```

## 2. TinaCloud Projekt erstellen (1 Min)

1. Gehe zu: [https://app.tina.io/](https://app.tina.io/)
2. Click "New Project"
3. Verbinde GitHub Repository
4. **⚠️ Client ID kopieren und sichern!**

```
Beispiel: c2b183f6-e2c7-495c-aee1-7cdcf967ecfa
```

## 3. Config erstellen (2 Min)

**⚠️ WICHTIG: `tina/` (ohne Punkt)!**

```bash
mkdir -p tina
code tina/config.ts
```

**Komplette Config:**

```typescript
import { defineConfig } from "tinacms";

const branch = process.env.GITHUB_BRANCH || 
               process.env.VERCEL_GIT_COMMIT_REF || 
               process.env.HEAD || 
               "main";

export default defineConfig({
  branch,
  
  // ⚠️ Client ID hier DIREKT eintragen (nicht als ENV)!
  clientId: "DEINE_CLIENT_ID_HIER",
  
  // ⚠️ Token bleibt als ENV (SECRET!)
  token: process.env.TINA_TOKEN,
  
  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  
  media: {
    tina: {
      mediaRoot: "images",
      publicFolder: "public",
    },
  },
  
  schema: {
    collections: [
      {
        name: "posts",
        label: "Blog Posts",
        path: "src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
          },
          {
            type: "string",  // ⚠️ String, nicht datetime!
            name: "pubDate",
            label: "Published Date",
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
```

**⚠️ Anpassen:**

* Ersetze `DEINE_CLIENT_ID_HIER`
* Passe `fields` an deine Frontmatter-Felder an
* Alle Felder die in Posts vorkommen müssen hier stehen!

## 4. Config zu GitHub pushen (1 Min)

**⚠️ KRITISCH: Sofort pushen!**

```bash
git add tina/
git commit -m "feat: Add TinaCMS config with Client ID"
git push origin main
```

**Warum wichtig?**

* TinaCloud braucht die Config in GitHub
* Ohne Push: Checklist bleibt bei "1 of 4"

## 5. TinaCloud konfigurieren (1 Min)

**TinaCloud Dashboard → dein Projekt → Configuration Tab**

### Site URLs hinzufügen:

```
https://deine-domain.de
http://localhost:4321/admin/index.html
```

### ⚠️ KRITISCH: "Path to Tina Config"

**Feld KOMPLETT LEER lassen!**

* Nicht `tina` eintragen
* Nicht `/` eintragen
* Nicht `.tina` eintragen
* **Einfach LEER!**

TinaCloud findet `tina/config.ts` automatisch!

**Save Configuration**

## 6. Token generieren (1 Min)

**TinaCloud Dashboard → Tokens Tab**

1. Click "New Token"
2. Type: **"Content (Read-only)"**
3. Name: `Production`
4. **⚠️ KRITISCH: Branches**
   * Klicke in das Feld
   * Tippe **explizit `main`** ein
   * **NICHT `*` verwenden!**
   * Enter drücken
5. **Token kopieren** (erscheint nur einmal!)

```
Beispiel: 29804306fbdcde44c0dc699e2b8713ed
```

**Warum explizit `main`?**

* `*` funktioniert NICHT
* Gibt 403 Forbidden Error beim Build
* Nur explizite Branch-Namen funktionieren

## 7. Token zu Cloudflare (1 Min)

**Cloudflare Dashboard:**

1. Workers & Pages → dein Projekt
2. Settings Tab
3. Environment variables
4. Click "Add variable"
   * Name: `TINA_TOKEN`
   * Value: *dein Token*
   * Environment: Production (default)
5. **Save**

## 8. Deployment triggern (1 Min)

```bash
git commit --allow-empty -m "trigger TinaCMS deployment"
git push origin main
```

**Warte auf Cloudflare Deployment:**

* Dauert \~2 Minuten
* Status muss grün sein ✅

## 9. TinaCloud Status aktualisieren (30 Sek)

**⚠️ Nach erfolgreichem Deployment:**

1. TinaCloud Dashboard → Configuration Tab
2. Scroll zu "Branch Status"
3. Click **"Refresh Statuses"**
4. Warte 10 Sekunden
5. Gehe zu **Overview Tab**
6. Checklist: "3 of 4" ✅

## 10. Production testen 🎉

```
https://deine-domain.de/admin
```

**Oder mit index.html:**

```
https://deine-domain.de/admin/index.html
```

### Was du siehst:

**Login-Dialog mit Lama! 🦙**

* Click "Log in"
* GitHub OAuth öffnet sich
* Autorisiere die App
* Zurück zu TinaCMS
* **Keine "Local Mode" Warnung!** ✅
* **"CLOUD" Section in Sidebar!** ✅

## 11. Ersten Cloud-Commit machen

1. Click auf "Blog Posts"
2. Wähle einen Post
3. Ändere etwas (z.B. füge ein Wort hinzu)
4. Click **"Save"** (oben rechts)
5. Grüne Box: "Document updated!" ✅

### Check GitHub:

```
https://github.com/dein-user/dein-repo/commits/main
```

**Neuer Commit von `tina-cloud-app[bot]`:**

* Mit "Verified" Badge ✅
* Message: "TinaCMS content update"

### Check TinaCloud:

**Overview Tab → Checklist:**

```
✅ Create the Project
✅ Set up your site schema
✅ Log in through your site
✅ Create a commit with TinaCloud

4 of 4! 🎉🎉🎉
```

## 12. Lokal testen (optional)

```bash
npm run dev
```

**Öffne:**

```
http://localhost:4321/admin/index.html
```

### Was du siehst:

**⚠️ "You are in local mode" Warnung**

**Das ist NORMAL und GEWOLLT!**

Warum?

* Lokal existiert kein `TINA_TOKEN` Environment Variable
* Deshalb: Local Mode
* Du kannst trotzdem editieren!
* Speichert ins File System
* Du committst manuell

## Troubleshooting

### 🔴 Build Error: "403 Forbidden" / "not authorized to access branch"

**Symptom:**

```
Server responded with status code 403
not authorized to access branch
```

**Problem:** Token hat keinen Branch-Zugriff

**Lösung:**

1. TinaCloud → Tokens Tab
2. Lösche alten Token
3. Erstelle **neuen** Token:
   * Type: "Content (Read-only)"
   * **Branches: Trage `main` explizit ein** (nicht `*`)
4. Neuen Token zu Cloudflare → Environment variables
5. Neues Deployment triggern

### 🔴 Kein Login-Button / Nur "Local Mode" in Production

**Problem:** Falsche Config wird geladen oder Client ID fehlt

**Check 1 - Ordner:**

```bash
ls -la | grep tina
```

**Wenn du BEIDES siehst:**

```
drwxr-xr-x  .tina/     ← FALSCH! Wird ignoriert!
drwxr-xr-x  tina/      ← RICHTIG! Wird geladen!
```

**Lösung:**

```bash
# Check wo Client ID ist:
cat .tina/config.ts | grep clientId
cat tina/config.ts | grep clientId

# Client ID in .tina? Kopiere zu tina:
cat .tina/config.ts > tina/config.ts

# Lösche .tina komplett:
rm -rf .tina/

# Pushe:
git add tina/ .tina/
git commit -m "fix: use correct tina folder without dot"
git push origin main
```

**Check 2 - Client ID:**

```bash
cat tina/config.ts | grep clientId
```

Muss zeigen:

```typescript
clientId: "deine-actual-id-hier",  // ← Nicht leer!
```

### 🔴 TinaCloud Checklist bleibt bei "1 of 4"

**Problem:** Config nicht in GitHub

**Lösung:**

```bash
git status  # Check ob tina/ committed ist
git log --oneline -5 | grep tina  # Check letzte Commits

# Falls nicht gepusht:
git add tina/
git commit -m "feat: Add TinaCMS config"
git push origin main

# Dann in TinaCloud:
# Configuration → "Refresh Statuses"
```

### 🔴 "Path should not include 'tina'" Error

**Problem:** Falscher Wert in TinaCloud Config

**Lösung:**

1. TinaCloud → Configuration Tab
2. Advanced Settings
3. "Path to Tina Config" → **Komplett LEER machen**
4. Save Configuration
5. Refresh Statuses

### 🔴 Build Error: "Unable to seed" / Posts laden nicht

**Problem:** Field-Mismatch zwischen Config und Post-Frontmatter

**Beispiel Problem:**

```yaml
# Post hat:
pubDate: 2024-10-26        # ← Ohne Quotes!
author: "Steven"
tags: ["SEO", "AI"]

# Config hat:
pubDate: datetime type     # ← Falscher Type!
# author fehlt              # ← Feld fehlt!
# tags fehlt                # ← Feld fehlt!
```

**Lösung:**

```typescript
// Config anpassen - ALLE Felder hinzufügen:
fields: [
  {
    type: "string",  // ← String, nicht datetime!
    name: "pubDate",
    label: "Published Date",
    required: true,
  },
  {
    type: "string",  // ← Neues Feld
    name: "author",
    label: "Author",
  },
  {
    type: "string",  // ← Neues Feld
    name: "tags",
    label: "Tags",
    list: true,      // ← Für Arrays
  },
]
```

**Rule:** Jedes Feld im Post-Frontmatter muss in der Config stehen!

### 🔴 `/admin` zeigt weiße Seite

**Problem:** Astro hat keine Route für `/admin`

**Lösung:** Nutze einfach `/admin/index.html`

**Optional - Redirect:**

```bash
echo '/admin    /admin/index.html    301' > public/_redirects
git add public/_redirects
git commit -m "feat: redirect /admin to index.html"
git push origin main
```

### 🔴 "Local Mode" Warnung auch nach Cloud-Login

**Nur wenn lokal:**
→ **Normal!** Lokal = immer Local Mode
→ `TINA_TOKEN` existiert nur in Cloudflare
→ Local Mode funktioniert trotzdem!

**Auch in Production:**
→ **Problem!** Check Client ID in `tina/config.ts`
→ Hard Refresh im Browser: `Cmd+Shift+R`

## Client ID vs. Token - Der Unterschied

Viele verwechseln das - hier die Klarheit:

### **Client ID** (in der Config):

```typescript
clientId: "c2b183f6-e2c7-495c-aee1-7cdcf967ecfa"  // ← Hardcoded
```

* ✅ Ist **PUBLIC** (kann in Git)
* ✅ Sagt TinaCMS: "Ich gehöre zu DIESEM Projekt"
* ✅ Aktiviert den Login-Button
* ❌ Kann KEINE API-Calls machen

### **Token** (als Environment Variable):

```typescript
token: process.env.TINA_TOKEN  // ← Liest aus Environment
```

* ❌ Ist **SECRET** (darf NICHT in Git!)
* ✅ Wird für API-Calls zu TinaCloud gebraucht
* ✅ Erlaubt Lesen/Schreiben von Content

### Was passiert wo?

**Production (Cloudflare):**

```
Client ID (in Config) ✅
+ 
Token (in Cloudflare ENV) ✅
= 
CLOUD MODE funktioniert! 🎉
```

**Lokal ohne Token:**

```
Client ID (in Config) ✅
+
Token (fehlt lokal!) ❌
=
LOCAL MODE (gelbe Warnung) ⚠️
```

## Lokal auch Cloud Mode? (Optional)

**Falls du lokal auch mit TinaCloud arbeiten willst:**

```bash
# Token exportieren:
export TINA_TOKEN="dein-token-hier"

# Server starten:
npm run dev
```

**Dann:**

* Keine "Local Mode" Warnung mehr
* Auto-Commits auch von lokal
* **ABER:** Nicht empfohlen für Development!

## Die 7 kritischen Punkte

⚠️ **1. Ordner:** `tina/` ohne Punkt verwenden\
⚠️ **2. Client ID:** Direkt in Config hardcoden\
⚠️ **3. Token Branches:** Explizit `main`, NICHT `*`\
⚠️ **4. Path to Config:** Feld LEER lassen\
⚠️ **5. Git Push:** Config sofort pushen\
⚠️ **6. Refresh Statuses:** Nach Deployment klicken\
⚠️ **7. Fields:** Alle Post-Felder in Config definieren

## Cheat Sheet - Quick Commands

```bash
# Setup
npm install tinacms @tinacms/cli
mkdir -p tina && code tina/config.ts

# Git
git add tina/
git commit -m "feat: Add TinaCMS"
git push origin main

# Deploy
git commit --allow-empty -m "trigger deployment"
git push origin main

# Check
ls -la | grep tina          # Nur tina/, nicht .tina/
cat tina/config.ts | grep clientId  # Client ID vorhanden?
npm run dev                 # Lokal testen
```

## Zusammenfassung

### Was du jetzt hast:

✅ **Lokal:** Dev-Tools, Local Mode, File System Editing\
✅ **Cloud:** Browser only, Auto-Commits, überall editieren\
✅ **Flexibel:** Beide Workflows führen ins gleiche GitHub Repo

### Setup-Zeit:

* **Erstes Mal:** Mit dieser Anleitung \~10-15 Minuten
* **Nächstes Mal:** 5 Minuten! 🚀

### Die wichtigste Regel:

**`tina/` ohne Punkt = richtig ✅**\
**`.tina/` mit Punkt = falsch ❌**

***

**Bei Problemen:** Check zuerst die 7 kritischen Punkte! ☝️

Diese Anleitung basiert auf Real-World Setup und hat mir 2 Stunden Trial-and-Error erspart. Hoffe, sie hilft dir genauso!

🎉 **Happy Editing!** 🎉


 \## Test ✨

   TinaCMS Auto-Commit funktioniert!

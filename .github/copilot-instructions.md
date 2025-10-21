## Kurz und knapp — was du tun sollst

Arbeite innerhalb des `stevennoack.de` Astro-Projekts. Konzentriere dich auf kleine, sichere Änderungen (Bugfixes, Docs, Content-Fixes, Build-Scripts). Vermeide Änderungen in `node_modules/` — dort befindet sich die Astro-Implementierung (z. B. `node_modules/astro/dist/...`) die nicht direkt editiert werden sollte.

## Wichtige Befehle

- Installation: `npm install`
- Lokale Entwicklung: `npm run dev` (öffnet `localhost:4321`)
- Produktion bauen: `npm run build` ➜ Ausgabe nach `./dist`
- Preview nach Build: `npm run preview`
- CI benutzt Node 20 (siehe `.github/workflows/deploy.yml`)

## Architektur-Highlights (kurz)

- Framework: Astro (v5.x), integriert mit `@astrojs/starlight` für Dokumentation/Sidebar.
- Content Collections: `src/content/` — die Collections heißen `docs` und `blog` (siehe `src/content.config.ts`).
- TypeScript: strikte Konfiguration via `tsconfig.json` (`astro/tsconfigs/strict`).
- Bildverarbeitung: `sharp` als native Abhängigkeit — auf macOS ggf. systemlibs beachten.

## Projekt-spezifische Patterns & Gotchas

- Frontmatter-Schema (aus `src/content.config.ts`):

  - `title: string`
  - `pubDate: Date` (z. B. `pubDate: 2025-10-21`)
  - `description?: string`
  - `categories` in diesem Projekt ist als string definiert (Achtung: plural, aber hier kein Array)
  - `tags?: string[]`

- Starlight Sidebar ist statisch in `astro.config.mjs` konfiguriert. Änderungen an der Seitenstruktur sollten dort abgestimmt werden.

- CI / Deployment: GitHub Actions bauen mit `npm ci` + `npm run build` und deployen `./dist` zu GitHub Pages (`.github/workflows/deploy.yml`). Nutze dieselbe Node-Version lokal (20) für Konsistenz.

## Beispiele (konkrete Aufgaben für Agents)

- Content-Fix: Wenn ein Blogpost Frontmatter-Fehler wirft (z. B. kein `pubDate`), generiere ein korrigiertes Frontmatter-Beispiel und füge es als PR hinzu.

  Beispiel-Frontmatter:

  ```yaml
  ---
  title: "Mein Post"
  pubDate: 2025-10-21
  description: "Kurzbeschreibung"
  tags: ["astro","blog"]
  ---
  ```

- kleine Code-Fix: Vermeide Änderungen in `node_modules`; wenn ein Problem aus `node_modules/astro` sichtbar wird (z. B. Routing-Param-Handling), dokumentiere das Problem und erstelle einen reproduzierbaren Minimal-Case im Repo (`/tests/` oder `src/examples/`) statt die Abhängigkeit direkt zu patchen. Beispiel: `node_modules/astro/dist/core/routing/manifest/generator.js` enthält Param-Sanitizer-Logik — falls das Verhalten fehlerhaft ist, liefere Reproduktionsschritte und ein PR-Ready-Fix in einem separaten Patch außerhalb von `node_modules`.

## PR-Checklist für Agenten

1. Kompiliert lokal mit `npm run build` (oder `npm run dev` für UI-Änderungen).
2. Frontmatter-Validierung: neue/geänderte Markdown/MDX-Dateien müssen mit `src/content.config.ts` Schema kompatibel sein.
3. Keine direkten Änderungen in `node_modules/`.
4. Kurze Beschreibung im PR-Text: Was geändert wurde, wie geprüft (Screenshots / build output), Node-Version.

## Wo nachschauen (Referenzen)

- Projekt-Root: `package.json` (scripts & deps)
- Content-Schemas: `src/content.config.ts`
- Astro-Konfiguration & Sidebar: `astro.config.mjs`
- CI: `.github/workflows/deploy.yml`
- TypeScript-Policy: `tsconfig.json`

Wenn etwas unklar ist oder du möchtest, dass ich die Instruktion auf ein anderes Projekt im Workspace (z. B. `vector-knowledge-base`) übertrage, sag kurz Bescheid und ich passe die Datei an.
## Kurz & bündig — Kontext für AI-Coding-Agenten

Dieses Repository ist eine Astro-basierte Website (Starter Blog). Wichtige Fakten, Workflows und Konventionen, die beim Bearbeiten helfen.

### Wichtige Pfade/Dateien
- `package.json` — npm-scripts: `dev` (astro dev), `build` (astro build), `preview` (astro preview).
- `astro.config.mjs` — zentrale Site-Config; Starlight-, MDX- und sitemap-Integrationen (Sidebar in `starlight()` wird hier konfiguriert).
- `src/content.config.ts` — Content-Collections (z.B. `blog`, `docs`) und deren Frontmatter-Schemata. Änderungen hier beeinflussen validierung und Build.
- `src/content/blog/` — Markdown/MDX-Beiträge; `src/content/docs/` — Dokumentation (Starlight schema).
- `src/pages/` — routbare Seiten (`.astro`, `.md`, `.mdx`).
- `.github/workflows/deploy.yml` — CI/CD: baut mit Node 20 (`npm ci` → `npm run build`) und deployed die erzeugte `./dist` auf GitHub Pages.

### Typische Aufgaben — Contract
- Aufgabe: Neue Blog- oder Docs-Seite hinzufügen
  - Input: neue Datei in `src/content/blog/` (z.B. `my-post.md`) mit Frontmatter: `title`, `pubDate`, optional `description`, `categories` (string), `tags` (string[]), `author`.
  - Output: Route under `/blog/<slug>`; Build must succeed (`astro build`).
  - Fehler: Inkonsistente Frontmatter-Schemas brechen `astro build` (siehe `src/content.config.ts`).

### Beispiele (Frontmatter)
```yaml
---
title: "Mein Beitrag"
pubDate: 2024-03-01
description: "Kurzbeschreibung"
categories: "tools"
tags: ["astro","guide"]
author: "Steven"
---
```

Hinweis: `pubDate` muss ein Datum sein (das Schema verwendet `z.date()`), `tags` ist ein Array. In diesem Repo ist `categories` als string definiert (einzelne Kategorie) — prüfe `src/content.config.ts`, bevor du Collections änderst.

### Build / Dev / Debug
- Lokales Entwickeln: `npm install` (einmal), dann `npm run dev` → http://localhost:4321
- Produktion bauen: `npm run build` → Ausgabe nach `./dist`
- Preview der Build-Ausgabe: `npm run preview`
- CI benutzt `npm ci` und Node 20; native Module wie `sharp` können lokales Setup erfordern (libvips oder passende Node-Binärdateien).

### Projekt-spezifische Patterns & Gotchas
- Starlight-Integration: die Sidebar wird in `astro.config.mjs` statisch konfiguriert. Änderungen an Navigation/Sidebar sollten dort vorgenommen werden.
- Content Collection-Validierung: `src/content.config.ts` definiert die erwarteten Frontmatter-Felder. Kleine Schema-Änderungen können viele Markdown-Dateien brechen.
- TypeScript: Projekt erweitert `astro/tsconfigs/strict` (strengere Checks). Achte auf `.astro/types.d.ts` in `tsconfig.json` `include`.
- Images/processing: `sharp` ist als dependency installiert — mögliche native Build-Abhängigkeiten auf Entwickler-Maschinen.

### Integration & Deployment
- GitHub Pages: Push in `main` (siehe `.github/workflows/deploy.yml`) triggert Build+Deploy.
- Wenn du externe Integrationen hinzufügst (z.B. CMS im `/admin`), update auch die `deploy.yml` falls Build-Schritte oder Node-Version sich ändern.

### Wenn du Änderungen machst — Checkliste für PRs
- Lokaler Build: `npm run build` muss durchlaufen.
- Content-Validierung: neue/aktualisierte Markdown-Dateien müssen Frontmatter-Felder liefern, die mit `src/content.config.ts` validieren.
- Node-Version: Verwende Node 20 lokal oder teste mit `nvm`/Volta, um Differenzen zur CI zu vermeiden.

Wenn etwas unklar ist oder ich Dateien übersehen habe, sag kurz Bescheid — ich iteriere die Anleitung schnell nach.

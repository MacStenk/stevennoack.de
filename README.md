# stevennoack.de - Markdown Content Collections

## 🎯 Was ist neu?

✅ **SEO-optimiert** - Markdown wird zu semantischem HTML
✅ **Einfach zu editieren** - Markdown statt JavaScript
✅ **Type-safe** - Zod Schema Validation
✅ **Formatierung** - Native Markdown Features (Zitate, Listen, etc.)

## 📁 Content Struktur

```
src/content/
├── config.ts              ← Schema Definitions
├── nfo/
│   └── content.md         ← NFO ASCII Art
├── about/
│   └── story.md           ← About Story
└── projects/
    ├── codeback.md        ← Projekte (einzelne Files)
    ├── quantenbeatz.md
    ├── visionfusen.md
    └── privacy-ai-os.md
```

## ✏️ Content bearbeiten

### NFO ASCII ändern

**Datei:** `src/content/nfo/content.md`

```markdown
---
title: "STEVEN NOACK"
subtitle: "Deine Tagline hier"
typewriterSpeed: 10
typewriterDelay: 300
---

\```
[Dein ASCII Art hier]
\```
```

### About Story ändern

**Datei:** `src/content/about/story.md`

```markdown
---
title: "whoami"
prompt: "> whoami"
---

Deine Story hier mit **Markdown Formatierung**:

- Liste
- Features

> Zitate funktionieren

`Code blocks` auch!
```

### Neues Projekt hinzufügen

**Datei:** `src/content/projects/mein-projekt.md`

```markdown
---
title: "Mein Projekt"
status: "Active"  # Active, Building, Planned, Archived
url: "https://example.com"
order: 5  # Sortierung (niedrigere Zahl = weiter vorne)
techTags: ["Astro", "Docker", "AI"]
---

Projekt-Beschreibung mit **Markdown**.

**Features:**
- Feature 1
- Feature 2
```

## 🚀 Installation

```bash
cd ~/dev/stevennoack.de

# Backup
cp -r src src.BACKUP

# Entpacke das neue Setup
tar -xzf ~/Downloads/stevennoack-markdown-collections.tar.gz

# Test
npm run dev

# Wenn alles läuft:
git add .
git commit -m "Migration to Markdown Content Collections"
git push origin main
```

## 🔄 Migration von alten JS Files

Die alten Files kannst du löschen:

```bash
rm src/data/nfo-content.js
rm src/data/about-content.js
rm src/data/projects.js
```

## 📝 Markdown Features

### Formatierung

- **Bold** → `**text**`
- *Italic* → `*text*`
- `Code` → `` `code` ``
- [Link](url) → `[text](url)`

### Zitate

```markdown
> Das ist ein Zitat
```

### Code Blocks

```markdown
\```bash
npm run dev
\```
```

### Listen

```markdown
- Item 1
- Item 2
  - Nested
```

## 🎨 Schema anpassen

**Datei:** `src/content/config.ts`

Hier kannst du neue Felder hinzufügen:

```typescript
const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    status: z.enum(['Active', 'Building', 'Planned', 'Archived']),
    // Neues Feld hinzufügen:
    featured: z.boolean().default(false),
  }),
});
```

## 🔍 SEO Benefits

- ✅ Semantisches HTML aus Markdown
- ✅ Crawlbar für Suchmaschinen
- ✅ Strukturierte Daten
- ✅ Bessere Performance

## 🐛 Troubleshooting

**Fehler:** `Collection not found`
→ Prüfe ob `src/content/config.ts` existiert

**Fehler:** `Schema validation failed`
→ Prüfe Frontmatter in deinen .md Files

**Dev Server funktioniert nicht?**
```bash
rm -rf node_modules/.astro
npm run dev
```

## 📚 Weiterführende Links

- [Astro Content Collections Docs](https://docs.astro.build/en/guides/content-collections/)
- [Zod Schema Validation](https://zod.dev/)
- [Markdown Syntax](https://www.markdownguide.org/basic-syntax/)

# stevennoack.de - Refactored

## 📦 Installation

```bash
# 1. Backup deiner aktuellen index.astro (WICHTIG!)
cd ~/dev/stevennoack.de
cp src/pages/index.astro src/pages/index.astro.BACKUP

# 2. Entpacke dieses Archiv über dein Projekt
tar -xzf stevennoack-refactored.tar.gz -C ~/dev/stevennoack.de/

# 3. Teste es
npm run dev
```

## 📁 Was ist neu?

```
src/
├── data/               ← Deine echten Inhalte
│   ├── nfo-content.js
│   ├── about-content.js
│   └── projects.js
│
├── scripts/            ← Wiederverwendbare Module
│   ├── matrix-rain.js
│   └── typewriter.js
│
├── styles/
│   └── global.css
│
├── layouts/
│   └── BaseLayout.astro
│
├── components/         ← 8 Components
│   ├── MatrixBackground.astro
│   ├── NFOBox.astro
│   ├── Hero.astro
│   ├── AboutSection.astro
│   ├── ProjectCard.astro
│   ├── ProjectsGrid.astro
│   ├── ContactSection.astro
│   └── Footer.astro
│
└── pages/
    └── index.astro     ← 25 Zeilen statt 700+!
```

## ✅ Was du noch prüfen musst:

1. **Foto**: `/public/steven-noack.png` muss existieren
2. **Favicon**: `/public/favicon.svg` muss existieren

## 🔄 Rollback (falls nötig):

```bash
cd ~/dev/stevennoack.de
cp src/pages/index.astro.BACKUP src/pages/index.astro
```

## 🚀 Deploy:

```bash
git add .
git commit -m "Refactored to component-based architecture"
git push origin main
```

Built with ❤️ and Matrix vibes!

# Background Audio Setup 🎵

## 📦 Was ist drin?

Eine Background Audio Component mit:
- ✅ **Autoplay** (leise im Hintergrund, 15% Volume)
- ✅ **Play/Pause Button** (Terminal-Style)
- ✅ **Volume Slider** (0-100%)
- ✅ **Matrix-Green Theme** (passt zur Seite)
- ✅ **Responsive** (auch mobile)

## 🚀 Installation

### 1. Component kopieren

```bash
cp ~/Downloads/BackgroundAudio.astro ~/dev/stevennoack.de/src/components/BackgroundAudio.astro
```

### 2. Audio-Datei speichern

Erstelle einen `public/audio/` Ordner und lege deine MP3 dort ab:

```bash
mkdir -p ~/dev/stevennoack.de/public/audio
# Dann kopiere deine audio.mp3 dort hin
```

### 3. In index.astro einbinden

**Datei:** `src/pages/index.astro`

```astro
---
import BaseLayout from '@/layouts/BaseLayout.astro';
import MatrixBackground from '@/components/MatrixBackground.astro';
import Hero from '@/components/Hero.astro';
import NFOBox from '@/components/NFOBox.astro';
import AboutSection from '@/components/AboutSection.astro';
import ProjectsGrid from '@/components/ProjectsGrid.astro';
import ContactSection from '@/components/ContactSection.astro';
import Footer from '@/components/Footer.astro';
import BackgroundAudio from '@/components/BackgroundAudio.astro';  // ← NEU
---

<BaseLayout title="Steven Noack - Tech Pioneer">
  <MatrixBackground />
  <Hero />
  <NFOBox />
  <AboutSection />
  <ProjectsGrid />
  <ContactSection />
  <Footer />
  
  <!-- Background Audio - unten hinzufügen -->
  <BackgroundAudio 
    audioUrl="/audio/techno-loop.mp3"
    initialVolume={0.15}
    autoplay={true}
  />
</BaseLayout>
```

## ⚙️ Konfiguration

### Props:

```astro
<BackgroundAudio 
  audioUrl="/audio/deine-musik.mp3"  // Pfad zur Audio-Datei
  initialVolume={0.15}                // Start-Lautstärke (0.0 - 1.0)
  autoplay={true}                     // Autoplay an/aus
/>
```

### Beispiele:

**Sehr leise (10%):**
```astro
<BackgroundAudio 
  audioUrl="/audio/ambient.mp3"
  initialVolume={0.1}
/>
```

**Normaler (30%):**
```astro
<BackgroundAudio 
  audioUrl="/audio/beat.mp3"
  initialVolume={0.3}
/>
```

**Kein Autoplay (User muss klicken):**
```astro
<BackgroundAudio 
  audioUrl="/audio/loop.mp3"
  autoplay={false}
/>
```

## 🎧 Audio-Datei von Freesound.org holen

### Option 1: BaDoink - EDM Techno (CC0)

1. Gehe zu: https://freesound.org/people/BaDoink/sounds/534617/
2. Klicke "Download" (kostenlos, kein Account nötig für CC0)
3. Speichere als `techno-loop.mp3` in `public/audio/`

### Option 2: Andere Loops

1. Suche auf Freesound.org: https://freesound.org/search/?q=techno+loop&f=duration%3A%5B10+TO+60%5D+license%3A%22Creative+Commons+0%22
2. Filter: CC0 License (komplett frei!)
3. Download und kopiere nach `public/audio/`

## 🎨 Position ändern

Die Controls sind **fixed** unten rechts. Um die Position zu ändern, editiere in `BackgroundAudio.astro`:

```css
.audio-controls {
  position: fixed;
  bottom: 2rem;    /* ← Abstand von unten */
  right: 2rem;     /* ← Abstand von rechts */
  /* Für links: */
  /* left: 2rem; */
  /* right: auto; */
}
```

## 🐛 Troubleshooting

**Autoplay funktioniert nicht?**
- Modern browsers blockieren Autoplay mit Sound
- User muss einmal auf die Seite klicken, dann startet es
- Das ist normal und Browser-Policy

**Audio lädt nicht?**
- Prüfe Pfad: `/audio/deinfile.mp3` = `public/audio/deinfile.mp3`
- Prüfe Dateiname (case-sensitive!)
- Browser Console checken (F12)

**Zu leise/laut?**
- Ändere `initialVolume` Prop
- User kann selbst mit Slider anpassen

**Controls verschwinden auf Mobile?**
- Prüfe ob sie hinter anderen fixed Elementen sind
- Evtl. z-index in CSS erhöhen

## 🎯 Best Practices

✅ **Lautstärke:** 10-20% initial (nicht aufdringlich)
✅ **Dateiformat:** MP3 (beste Kompatibilität)
✅ **Dateigröße:** Max 2-3 MB (schneller Load)
✅ **Loop-Length:** 15-60 Sekunden (perfekt für Loops)
✅ **Lizenz:** CC0 oder CC-BY (legal safe!)

## 📝 Lizenz-Attribution

Wenn du CC-BY nutzt (nicht CC0), füge Credit in den Footer ein:

```astro
<!-- In Footer.astro -->
<p class="credits">
  Background music by <a href="ARTIST_URL">Artist Name</a> 
  (CC-BY License)
</p>
```

## 🚀 Deploy

Nach Installation:

```bash
cd ~/dev/stevennoack.de
npm run dev  # Test lokal
npm run build  # Build für Production
git add .
git commit -m "Added background audio with controls"
git push origin main
```

Fertig! 🎉

---
title: Wartung — Redirects & Backup-Aufräumen
description: Kurznotiz zu Redirects und entfernten Backup-Dateien
---

# Wartung: Redirects und entfernte Backup-Dateien

Datum: 21. Oktober 2025

Kurzüberblick

Diese Seite dokumentiert kurz die Wartungsmaßnahmen, die durchgeführt wurden:

- Hinzugefügte Redirects (um alte/fehlkodierte Links zu unterstützen)
- Entfernen von Editor-Backup-Dateien, die Astro-Build-Warnungen verursachten

Redirect-Dateien

Die folgenden Redirect-Seiten wurden angelegt (clientseitige Weiterleitung):

- `/blog/2025-10-21-mein-eigenes-ki-universum--warum-ich-mir-2025-meine-digitale-souveränität-zurückhole/`
- `/blog/2025-10-21-mein-eigenes-ki-universum--warum-ich-mir-2025-meine-digitale-souveraenitaet-zurueckhole/`

Beide leiten auf die kanonische URL `/blog/mein-eigenes-ki-universum/` weiter.

Entfernte Backup-Dateien

- `src/pages/blog/[...slug].astro.backup`
- `src/pages/blog/[...slug].astro.backup4`

Empfehlungen

- Falls Backups behalten werden sollen: außerhalb von `src/pages` ablegen oder mit führendem `_` versehen (Astro ignoriert Dateien mit `_`-Prefix).
- Für dauerhafte 301-Redirects ist eine Host-level-Lösung (Cloudflare/Netlify) sinnvoller.

Wenn du Fragen hast oder möchtest, dass ich die Redirects konsolidiere (z. B. in `src/pages/redirects/`), sag kurz Bescheid.

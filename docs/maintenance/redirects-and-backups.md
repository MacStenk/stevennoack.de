# Wartung: Redirects und entfernte Backup-Dateien

Kurzüberblick

- Datum: 21. Oktober 2025
- Zweck: Dokumentation der kurzfristigen Aufräum- und Redirect-Maßnahmen, die durchgeführt wurden, und Empfehlungen für künftige Pflege.

Was wurde gemacht

1. Legacy-Redirects für einen langen Blog-URL-Pfad

   - Dateien erstellt:
     - `src/pages/blog/2025-10-21-mein-eigenes-ki-universum--warum-ich-mir-2025-meine-digitale-souveränität-zurückhole/index.astro`
     - `src/pages/blog/2025-10-21-mein-eigenes-ki-universum--warum-ich-mir-2025-meine-digitale-souveraenitaet-zurueckhole/index.astro`

   - Verhalten: Beide Dateien liefern eine clientseitige Weiterleitung (meta-refresh + `location.replace`) zur kanonischen URL:

     `/blog/mein-eigenes-ki-universum/`

   - Grund: Einige alte Links (oder falsch kodierte Versionen mit/ohne Umlaute) führten zu 404s. Durch das Hinzufügen beider Varianten wird sichergestellt, dass Besucher über unterschiedliche Link-Formen auf die richtige, kanonische Seite gelangen.

2. Entfernen von Editor-/Backup-Dateien

   - Entfernt:
     - `src/pages/blog/[...slug].astro.backup`
     - `src/pages/blog/[...slug].astro.backup4`

   - Grund: Diese Dateien sind keine gültigen Astro-Seiten und führen zu Build-Warnungen. Sie wurden sicherheitshalber gelöscht, nachdem relevante Änderungen ins System migriert wurden.

Empfehlungen / Nächste Schritte

- Backup-Dateien: Falls du Editor-Backups behalten möchtest, empfehle ich, sie außerhalb des `src/pages`-Verzeichnisses oder mit einem führenden Unterstrich (`_`) zu speichern, damit Astro sie ignoriert.

- Saubere Redirects: Clientseitige Redirects sind einfach und schnell. Falls du dauerhafte, serverseitige 301-Redirects bevorzugst (besser für SEO), richte Redirect-Regeln via Hosting-Layer ein (z. B. Cloudflare Pages redirects, Netlify _redirects) oder verwende ein HTTP-redirect-Proxy.

- Dokumentation: Diese Datei ist im Repo abgelegt unter `docs/maintenance/redirects-and-backups.md`.

Kontakt

Wenn du möchtest, kann ich:

- Die Redirects in ein gemeinsames `src/pages/redirects/`-Verzeichnis verschieben und ein kurzes README dort ablegen.
- Die clientseitigen Redirects durch serverseitige Redirect-Regeln ersetzen (benötigt Host/Proxy-Zugriff).

— Ende

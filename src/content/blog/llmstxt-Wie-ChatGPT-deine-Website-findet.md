---
title: 'llms.txt: Wie ChatGPT deine Website findet'
description: >-
  Das Problem: ChatGPT empfiehlt deine Konkurrenz. Nicht dich. Die Lösung:
  llms.txt macht deine Website lesbar für KI. Der Effekt: Deine Expertise wird
  zitiert.
pubDate: 30.10.2025
author: Steven Noack
tags:
  - llms
  - answer-engine-optimization
  - ' aeo'
  - chatgpt
  - chatgpt
  - claude
  - ai-optimization
  - jamstack
  - ' markdown'
  - ' web-development'
  - future-web
---

## 📋 AUF EINEN BLICK

* ⏱️ **Lesezeit:** 15 Minuten
* 🎯 **Ergebnis:** ChatGPT versteht deine Website
* 💡 **Schwierigkeit:** Beginner (kein Code nötig)
* 🛠️ **Benötigt:** Texteditor, FTP-Zugang
* ✅ **Danach kannst du:** LLMs eine Karte deiner Website geben

***

## Google ist tot. ChatGPT ist die neue Suche.

Seit 2022 ändert sich alles.

ChatGPT, Claude, Gemini.
Die Menschen fragen KI.
Nicht Google.

**Die Statistik ist brutal:**
Bis 2028 treiben LLMs 75 % des Umsatzes durch Suchanfragen.

Das bedeutet:
Wer jetzt nicht für KI optimiert, verliert.

Aber hier ist das Problem:
**Deine Website wurde für Google gebaut.**

Keywords. Backlinks. Meta-Tags.
Das interessiert ChatGPT nicht.

ChatGPT will Antworten.
Klare Antworten.
Auf echte Fragen.

***

## Warum LLMs anders crawlen als Google

Google crawlt alles.
Jede Seite. Jeden Link. Jedes Wort.

LLMs können das nicht.

**Sie arbeiten in Echtzeit.**
Sie haben begrenzte Ressourcen.
Sie können nicht endlos Seiten analysieren.

Stattdessen bietet llms.txt eine Zusammenfassung.
Eine Karte deiner Site.
Die hilft.

***

## Was ist llms.txt?

llms.txt ist eine Datei.
Eine einfache Textdatei.
Im Markdown-Format.

**Du legst sie ins Root-Verzeichnis:**

```
https://deine-domain.com/llms.txt
```

Sie enthält:

* Einen Titel (was ist deine Site?)
* Eine Beschreibung (worum geht es?)
* Wichtige Links (wo finde ich was?)
* Optional: Richtlinien (was dürfen LLMs?)
* Optional: Kontaktinfos

**Wie robots.txt für Suchmaschinen.**
**Nur für KI-Modelle.**

***

## Der Vorschlag stammt aus 2024

Entwickler und KI-Experten entwarfen llms.txt.
Sie wollten die Interaktion zwischen Websites und KI verbessern.

Bis Oktober 2025 gewann es an Popularität.
Immer mehr Sites implementieren es.

Es ist kein offizieller Standard.
Nicht wie robots.txt (IETF-standardisiert).
Sondern eine Community-Initiative.

**Aber die Community wächst.**

***

## Warum du llms.txt brauchst

### 1. Bessere Kontextualisierung

LLMs erhalten Infos über den Zweck deiner Site.
Sie verstehen Schlüsselthemen und wichtige Seiten.

**Das reduziert Halluzinationen.**
Falsche KI-Antworten.
Die Genauigkeit verbessert sich.

### 2. Effiziente Navigation

Eine Liste relevanter URLs.
LLMs können gezielt Inhalte abrufen.
Statt blind zu suchen.

### 3. Nutzungsrichtlinien

Du kannst Regeln definieren.
Was LLMs mit deinen Inhalten tun dürfen.

Beispiele:

* Zitieren erlaubt (mit Quellenangabe)
* Zusammenfassen erlaubt
* Kopieren verboten

### 4. Sichtbarkeitsboost

Websites mit llms.txt bevorzugen LLMs.
Sie gelten als "AI-freundlich".

**Das führt zu mehr Zitationen.**
Das steigert Traffic und Autorität.

### 5. Schutz vor Missbrauch

Du gibst explizite Erlaubnisse.
Das hilft, Inhalte vor unkontrolliertem Scraping zu schützen.

***

## Vorteile für Website-Betreiber

**Erhöhte Präsenz in generativen Suchmaschinen**
ChatGPT-Suchen.
Perplexity.
Claude Projects.

**Weniger Abhängigkeit von traditionellem SEO**
LLMs arbeiten unabhängig von Suchrankings.

**Für Entwickler und Dokumentationsseiten besonders nützlich**
LLMs greifen schnell auf Strukturen zu.
APIs. Tutorials. Guides.

***

## Ohne llms.txt verlierst du

LLMs müssen auf allgemeine Crawling-Methoden zurückgreifen.

**Das ist ineffizient.**
Besonders bei komplexen Sites mit Paywalls.
Oder bei dynamischen Inhalten.

***

## Wie llms.txt funktioniert

### Die Datei liegt im Root-Verzeichnis

```
https://deine-domain.com/llms.txt
```

### Sie ist eine einfache Textdatei im Markdown-Format

Menschen können sie lesen.
Maschinen können sie lesen.

LLMs rufen sie ab.
LLMs parsen sie.
LLMs nutzen sie, um zu entscheiden.

***

## Typische Struktur einer llms.txt

### Header-Bereich

Kurze Beschreibung der Site.

```markdown
# Deine Website

> Eine Sammlung von Tutorials und Ressourcen zu Künstlicher Intelligenz
```

### URL-Liste

Wichtige Links zu Kernseiten, Dokumentationen oder Ressourcen.

```markdown
## Wichtige URLs

- [Startseite](https://deine-domain.com/) - Hauptübersicht
- [Dokumentation](https://deine-domain.com/docs) - Detaillierte Anleitungen
- [API-Referenz](https://deine-domain.com/api) - Für Entwickler
```

### Richtlinien

Optionale Regeln für die KI-Nutzung.

```markdown
## Nutzungsrichtlinien

- Erlaubt: Zitieren und Zusammenfassen mit Link
- Verboten: Vollständige Kopie ohne Genehmigung
- Kontakt: info@deine-domain.com
```

### Zusätzliche Metadaten

```markdown
## Weitere Infos

- Version: 1.0
- Letzte Aktualisierung: 2025-10-30
```

***

## Erweiterte Version: llms-full.txt

Für umfassendere Infos.
Vollständige Sitemaps.
Erweiterte Kontexte.

Einige Vorschläge integrieren YAML oder JSON.
Aber Markdown ist der Kernstandard.

***

## LLMs entdecken die Datei automatisch

Wenn sie deine Site crawlen.
Ähnlich wie bei robots.txt.

Tools wie GPTBot oder ClaudeBot prüfen auf solche Dateien.
Sie optimieren ihre Interaktion.

***

## Schritt für Schritt: So erstellst du llms.txt

### Schritt 1: Öffne einen Texteditor

Erstelle eine neue Datei namens `llms.txt`.

**✅ Checkpoint:** Datei ist angelegt.

### Schritt 2: Strukturiere den Inhalt

Verwende Markdown-Syntax.

**Titel:** Beginne mit einer H1-Überschrift (#), die den Namen oder Zweck deiner Site beschreibt.

```markdown
# CodeBack.de

> LLM-native Websites für Solo-Selbständige
```

**Beschreibung:** Füge eine Blockquote (>) für eine kurze Übersicht hinzu.
Gefolgt von optionalen Notizen.

**Abschnitte:** Verwende H2-Überschriften (##) für Kategorien wie "Docs", "Examples" oder "Richtlinien".

Darunter liste Links als Markdown-Links auf.
Mit Beschreibungen.

```markdown
## Tutorials

- [Einstieg in LLMs](https://docs.codeback.de/einstieg-llms) - Grundlagen
- [SEO für KI](https://docs.codeback.de/seo-fuer-ki) - Tipps zur Optimierung

## Ressourcen

- [Glossar](https://docs.codeback.de/glossar) - Wichtige Begriffe erklärt
- [Beispiele](https://docs.codeback.de/beispiele) - Praktische Code-Snippets
```

**Halte es kurz:** Ziel ist 5–10 Links, um LLMs nicht zu überfordern.

**✅ Checkpoint:** Struktur steht.

**⚠️ Häufiger Fehler:** Zu viele Links → Lösung: Fokus auf die wichtigsten Seiten.

**💡 Pro-Tipp:** Verlinke nicht jede einzelne Seite. Nur die Hauptkategorien.

### Schritt 3: Speichere und lade hoch

Stelle die Datei online.
Teste sie im Browser.

Platziere die Datei im Root-Verzeichnis deines Servers.
Via FTP, GitHub Pages oder Hosting-Panel.

Sie muss öffentlich zugänglich sein.

```
https://deine-domain.com/llms.txt
```

**✅ Checkpoint:** Datei ist online und erreichbar.

### Schritt 4: Teste die URL

Überprüfe die URL in deinem Browser.

```
https://deine-domain.com/llms.txt
```

Teste mit LLMs.
Frage: "Was weißt du über \[deine-domain.com]?"
Sieh, ob die Infos aus llms.txt verwendet werden.

**✅ Checkpoint:** LLM nutzt deine llms.txt.

### Schritt 5: Erweiterte Optionen

Für größere Sites erstelle eine `/llms-full.txt` mit mehr Details.

Integriere es mit deiner robots.txt.
Indem du LLMs explizit erlaubst, die Datei zu crawlen.

**✅ Checkpoint:** Erweiterte Version ist live.

**💡 Pro-Tipp:** Aktualisiere die Datei regelmäßig, um veraltete Links zu vermeiden.

***

## Vollständiges Beispiel

### Einfaches Template für eine fiktive Website

```markdown
# KI-Tutorials.de

> Eine Sammlung von Tutorials und Ressourcen zu Künstlicher Intelligenz, LLMs und mehr

Wichtige Hinweise:
- Alle Inhalte sind frei zugänglich und dürfen mit Quellenangabe zitiert werden
- Für kommerzielle Nutzung kontaktiere uns

## Tutorials

- [Einstieg in LLMs](https://ki-tutorials.de/einstieg-llms) - Grundlagen zu Large Language Models
- [SEO für KI](https://ki-tutorials.de/seo-fuer-ki) - Tipps zur Optimierung für KI-Suchmaschinen

## Ressourcen

- [Glossar](https://ki-tutorials.de/glossar) - Wichtige Begriffe erklärt
- [Beispiele](https://ki-tutorials.de/beispiele) - Praktische Code-Snippets und Anleitungen

## Nutzungsrichtlinien

- Erlaubt: Zusammenfassen und Zitieren mit Link
- Verboten: Vollständige Kopie ohne Genehmigung
- Kontakt: info@ki-tutorials.de

## Weitere Infos

- Version: 1.0
- Letzte Aktualisierung: 2025-10-30
```

**Dieses Template ist flexibel.**
Es hilft LLMs, deine Site schnell zu verstehen.

***

## Reales Beispiel: FastHTML-Projekt

Hier ein reales, gekürztes Beispiel.
Basierend auf der Implementierung für das FastHTML-Projekt.
Eine Python-Bibliothek.

Es zeigt detaillierte Beschreibungen und Kategorien.

```markdown
# FastHTML

> FastHTML is a python library which brings together Starlette, Uvicorn, HTMX and more

Important notes:
- Although parts of its API are inspired by FastAPI, it is *not* compatible with FastAPI
- FastHTML is compatible with JS-native web components and any vanilla JS libraries

## Docs

- [FastHTML quick start](https://fastht.ml/docs/tutorials/quickstart_for_web_devs.html)
- [HTMX reference](https://github.com/bigskysoftware/htmx/blob/master/www/content/reference.md)

## Examples

- [Todo list application](https://github.com/AnswerDotAI/fasthtml/blob/main/examples/adv_app.py)

## Optional

- [Starlette full documentation](https://gist.githubusercontent.com/jph00/809f78595c7f74a81b1a7fbf6f3a3c60/raw/2375cd3cd0cb1e2cdab7bf33fa17e4b6e9f8ae23/starlette.txt)
```

**Dieses Beispiel ist direkt aus einer realen Quelle.**
Es demonstriert, wie Projekte wie FastHTML LLMs helfen.
Sie finden relevante Dokumentation.

***

## Weiteres Beispiel: Für Produkt-Dokumentation

Aus einem Blog-Beitrag zu Mintlify.
Ein Beispiel für eine Produkt-Docs-Site.

```markdown
# Example Product Docs

> Learn how to get started, use the API, and explore tutorials

## Guides

- [Getting Started](https://example.com/docs/start) - Intro guide
- [Install](https://example.com/docs/install) - Setup steps

## Reference

- [API](https://example.com/docs/api) - Endpoint list and usage
```

**Dieses ist kürzer und fokussiert auf Guides und Referenzen.**
Ideal für API- oder Software-Dokumentationen.

***

## Best Practices und Tipps

### 1. Kürze priorisieren

LLMs haben Token-Limits.
Halte den Inhalt prägnant.

**Fokussiere auf 5–10 Schlüssel-URLs.**

### 2. Aktualität sicherstellen

Aktualisiere die Datei regelmäßig.
Vermeide veraltete Links.

### 3. Rechtliche Aspekte

Definiere klare Richtlinien.
Vermeide Urheberrechtsprobleme.

Einige LLMs respektieren diese automatisch.

### 4. Integration mit anderen Tools

Kombiniere mit Schema Markup oder sitemaps.xml.
Für maximale AI-Sichtbarkeit.

### 5. Potenzielle Nachteile

Es ist noch kein universeller Standard.
Nicht alle LLMs adoptieren es sofort.

Manche sehen es als "Hoax" oder unnötig.
Aber die Community wächst.

### 6. Messung des Erfolgs

Überwache, ob deine Site öfter in AI-Antworten zitiert wird.

Tools wie Ahrefs.
Oder manuelle Tests.

***

## Häufige Fehler & Lösungen

| Problem                   | Ursache                 | Lösung                                             |
| ------------------------- | ----------------------- | -------------------------------------------------- |
| Datei wird nicht gefunden | Falscher Pfad           | Stelle sicher: `https://deine-domain.com/llms.txt` |
| LLM nutzt llms.txt nicht  | Datei nicht öffentlich  | Prüfe Zugriffsrechte, keine Passwortsperre         |
| Zu viele Links            | Überladene Struktur     | Reduziere auf 5–10 Hauptlinks                      |
| Veraltete Links           | Keine Aktualisierung    | Setze Reminder für regelmäßige Updates             |
| Keine Zitatsteigerung     | Zu neue Implementierung | Gib Zeit, beobachte über Wochen/Monate             |

***

## Die Zukunft: LLM-Optimierung ist der neue Standard

### Von SEO zu GEO

**SEO = Search Engine Optimization**
**GEO = Generative Engine Optimization**

Der Fokus verschiebt sich.
Von reiner Suchmaschinenoptimierung zu einer holistischen Strategie.
AI als primären Vermittler.

### Die wichtigsten Trends für die Zukunft

#### 1. AI-gestützte Entdeckung und Visibility

LLMs werden die primäre Schnittstelle für Informationssuche.

Inhalte müssen nicht nur für Suchmaschinen wie Google optimiert sein.
Sondern speziell für AI-Modelle.
Die Antworten generieren, statt nur Links zu listen.

**Das umfasst:**

* KI in den Content-Erstellungsprozess integrieren
* Anpassen an conversational Search

#### 2. E-E-A-T und Authentizität

Experience, Expertise, Authoritativeness und Trustworthiness (E-E-A-T) werden entscheidend.

LLMs priorisieren Inhalte mit:

* Originalen Daten
* Einzigartigen Insights
* Nachweisbarer Expertise

Um Halluzinationen zu vermeiden.

**Themen wie Datenschutz, Ethik in KI und der Schutz vor AI-generiertem Spam gewinnen an Bedeutung.**

#### 3. Multimodale Inhalte und Personalisierung

Zukünftige Trends gehen zu Inhalten.
Die Text, Bilder, Videos und interaktive Elemente kombinieren.

LLMs werden personalisierte Empfehlungen geben.

**Das macht Themen relevant:**

* User-Datenanalyse
* Adaptive Webseiten

Der Aufstieg von AI-Agents.
Die autonom Inhalte crawlen.
Das verändert die Landschaft.

#### 4. Nachhaltigkeit und technische Infrastruktur

Themen wie energieeffiziente KI.
Schnelle Ladezeiten.
Mobile-first Designs werden zentral.

LLMs priorisieren Inhalte.
Die leicht zugänglich und performant sind.

**Der Umgang mit Crawlern und Blockaden wird ein heißes Diskussionsthema.**
Zum Beispiel durch Paywalls.

***

## Was Menschen wissen müssen

### Inhalte müssen AI-freundlich sein

LLMs bevorzugen klare, konversationelle Sprache.
Die natürliche Fragen beantwortet.

**Vermeide Keyword-Stuffing.**
Fokussiere auf vollständige Lösungen und echte Wertschöpfung.

Inhalte hinter Paywalls oder mit Bot-Schutz könnten unsichtbar werden.
Viele LLMs meiden diese.

### Technische Sichtbarkeit

Stelle sicher, dass deine Seite von AI-Crawlern indexiert werden kann.

**Passe robots.txt an.**
Erlaube Crawler wie GPTBot oder ClaudeBot.

Nutze semantic HTML für bessere Interpretation.

Schnelle Ladezeiten und mobile Optimierung sind essenziell.
LLMs berücksichtigen Performance.

### Messung und Tracking

Traditionelle SEO-Metriken wie Rankings verlieren an Bedeutung.

**Stattdessen tracke Visibility in LLMs.**
Nutze Tools, die AI-Antworten analysieren.

**Achte auf Zitationen in AI-Generierungen.**
Das ist der neue "Backlink".

### Risiken und Ethik

Sei dir bewusst, dass LLMs Inhalte scrapen können.
Was zu Urheberrechtsfragen führt.

**Baue Markenvertrauen auf.**
Erscheine in AI-Empfehlungen.

Diversifiziere Traffic-Quellen jenseits von Suchmaschinen.

***

## Strategien für LLM-Sichtbarkeit

| Strategie                                   | Beschreibung                                                                                                                                                                      | Warum relevant für LLMs?                                                                 |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| **Originale Insights erstellen**            | Biete einzigartige Daten, Studien oder Expertenmeinungen, die nicht überall verfügbar sind                                                                                        | LLMs priorisieren frische, autoritative Quellen, um genaue Antworten zu geben            |
| **Conversational Content optimieren**       | Schreibe in natürlicher Sprache, die Fragen direkt beantwortet (z. B. "Wie optimiere ich meine Website für KI?"). Füge FAQs, Zusammenfassungen und Inhaltsverzeichnisse hinzu     | LLMs verarbeiten Anfragen wie Gespräche und zitieren klare, leserfreundliche Inhalte     |
| **llms.txt Datei implementieren**           | Erstelle eine Datei im Root-Verzeichnis deiner Site (ähnlich robots.txt), die Schlüsselinfos in Markdown-Format bereitstellt: Überblick, Kontext und Links zu relevanten Inhalten | Macht deine Site explizit LLM-freundlich und hilft bei der Entdeckung                    |
| **Strukturierte Daten nutzen**              | Verwende Schema Markup, um Inhalte semantisch zu markieren (z. B. für FAQs oder Produkte)                                                                                         | Ermöglicht LLMs eine bessere Extraktion und Interpretation von Daten                     |
| **Community und Externe Präsenz aufbauen**  | Nutze Foren wie Reddit oder Quora, um Inhalte zu teilen und Backlinks zu generieren                                                                                               | LLMs ziehen Daten aus diversen Quellen; externe Erwähnungen boosten Autorität            |
| **Lesbarkeit und Kontextdichte verbessern** | Halte Inhalte klar, strukturiert und kontextreich (z. B. 3–5 Konzepte pro Seite erklären)                                                                                         | LLMs überspringen unklare oder überladene Texte; hohe Dichte hilft bei Zusammenfassungen |
| **AI-Crawler konfigurieren**                | Passe robots.txt an, um Crawler wie GPTBot zuzulassen, und vermeide aggressive Bot-Blocker                                                                                        | Stellt sicher, dass deine Inhalte überhaupt gecrawlt werden                              |
| **Holistische Themenabdeckung**             | Decke Themen umfassend ab, inklusive verwandter Fragen und Lösungen                                                                                                               | LLMs suchen nach vollständigen, thematisch tiefen Inhalten                               |

***

## Die wichtigsten Takeaways

**Google ist tot.**
ChatGPT ist die neue Suche.

**llms.txt ist deine Visitenkarte für KI.**
Eine einfache Datei.
Die LLMs zeigt, wo sie Antworten finden.

**Du erstellst sie in 10 Minuten.**
Markdown-Format.
5–10 Links.
Klare Struktur.

**Du lädst sie ins Root-Verzeichnis hoch.**
`https://deine-domain.com/llms.txt`

**LLMs bevorzugen Websites mit llms.txt.**
Deine Sichtbarkeit steigt.
Deine Expertise wird zitiert.

**Die Zukunft ist LLM-native.**
Wer jetzt handelt, gewinnt.

***

## Du hast gelernt

* ✅ Was llms.txt ist und warum es wichtig ist
* ✅ Wie LLMs anders crawlen als Google
* ✅ Wie du llms.txt Schritt für Schritt erstellst
* ✅ Welche Best Practices du befolgen solltest
* ✅ Wie die Zukunft der LLM-Optimierung aussieht

***

## Nächster Schritt

**Erstelle jetzt deine llms.txt.**

Öffne einen Texteditor.
Kopiere das Template.
Passe es an deine Website an.
Lade es hoch.

**Teste mit ChatGPT:**
Frage: "Was weißt du über \[deine-domain.com]?"
Sieh, ob deine llms.txt genutzt wird.

***

## Weiterführende Ressourcen

### Offizielle Quellen

* [llmstxt.org](https://llmstxt.org) - Offizielle Spezifikation und Proposal
* [answer.ai](https://answer.ai) - Entwickler hinter llms.txt

### Tools & Generatoren

* [Firecrawl.dev](https://firecrawl.dev) - llms.txt-Generator automatisch erstellen

### Community

* [Reddit: r/LLMOptimization](https://reddit.com/r/llms) - Diskussionen und Erfahrungen
* [Hacker News](https://news.ycombinator.com) - Aktuelle Entwicklungen

### Weitere Artikel auf docs.codeback.de

* [Was ist Answer Engine Optimization?](https://docs.codeback.de/was-ist-aeo)
* [LLM-native Architektur erklärt](https://docs.codeback.de/llm-native-architektur)
* [Von Monolith zu Microservices](https://docs.codeback.de/jamstack-microservices)

***

## FAQ

**Q: Ist llms.txt ein offizieller Standard?**

Nein. llms.txt ist eine Community-Initiative aus 2024. Es ist nicht von der IETF standardisiert wie robots.txt. Aber die Adoption wächst schnell. Immer mehr Sites und Tools unterstützen es.

**Q: Müssen alle LLMs llms.txt respektieren?**

Nein. Es ist optional. Aber Tools wie GPTBot und ClaudeBot prüfen zunehmend auf solche Dateien. Je mehr Sites es implementieren, desto mehr werden LLMs es unterstützen.

**Q: Kann ich llms.txt mit robots.txt kombinieren?**

Ja. Beide Dateien ergänzen sich. robots.txt kontrolliert, welche Crawler deine Site besuchen dürfen. llms.txt gibt LLMs zusätzliche Kontextinformationen. Du kannst in robots.txt explizit erlauben, dass LLMs llms.txt crawlen dürfen.

**Q: Was passiert, wenn ich keine llms.txt habe?**

LLMs crawlen deine Site trotzdem. Aber sie müssen allgemeine Crawling-Methoden nutzen. Das ist ineffizient. Sie verstehen deine Struktur schlechter. Du verlierst Zitatmöglichkeiten.

**Q: Wie oft sollte ich llms.txt aktualisieren?**

Mindestens einmal pro Quartal. Oder immer wenn du:

* Neue wichtige Seiten veröffentlichst
* Deine Site-Struktur änderst
* URLs umbenennst oder entfernst
* Neue Kategorien hinzufügst

**Q: Kann llms.txt meine SEO beeinflussen?**

Nicht direkt. llms.txt beeinflusst nicht dein Google-Ranking. Aber es verbessert deine Sichtbarkeit in AI-Antworten. Das kann indirekt zu mehr Traffic führen. Und mehr Traffic kann SEO positiv beeinflussen.

**Q: Gibt es Datenschutzbedenken?**

Du kontrollierst, was in llms.txt steht. Teile nur öffentliche URLs. Keine sensiblen Daten. Keine internen Bereiche. Behandle es wie eine öffentliche Landingpage.

**Q: Was ist der Unterschied zwischen llms.txt und llms-full.txt?**

* **llms.txt** = Grundversion, 5–10 Links, schnell zu parsen
* **llms-full.txt** = Erweiterte Version, vollständige Sitemaps, detaillierte Kontexte

Starte mit llms.txt. Erweitere später bei Bedarf zu llms-full.txt.

**Q: Funktioniert llms.txt auch für E-Commerce-Sites?**

Ja. Du kannst wichtige Produktkategorien verlinken. Beispiel:

```markdown
## Shop

- [Bestseller](https://shop.com/bestseller) - Unsere meistverkauften Produkte
- [Neue Produkte](https://shop.com/neu) - Frisch eingetroffen
- [Sale](https://shop.com/sale) - Aktuelle Angebote
```

**Q: Kann ich YAML oder JSON statt Markdown nutzen?**

Einige Implementierungen experimentieren damit. Aber Markdown ist der Kernstandard. Es ist menschenlesbar und maschinenlesbar. Bleib bei Markdown für maximale Kompatibilität.

***

## Abschluss

llms.txt ist ein Schritt hin zu einer "AI-optimierten" Webwelt.

Wenn du es implementierst, machst du deine Website zukunftssicher.

Besonders da LLMs bis 2028 einen Großteil der Suchanfragen dominieren könnten.

**Der Code ist zurück.**
Und er spricht jetzt mit KI.

***

**Autor:** Steven Noack\
**Expertise:** 29 Jahre Internet-Erfahrung seit 1996, Web Developer & LLM Optimization Specialist\
**Website:** [codeback.de](https://codeback.de)\
**Letzte Aktualisierung:** 30. Oktober 2025\
**Lesezeit:** 15 Minuten\
**Schwierigkeit:** Beginner\
**Kategorie:** Tutorial / Best Practice

***

**Tags:** #llms #answer-engine-optimization #aeo #chatgpt #claude #ai-optimization #jamstack #markdown #web-development #future-web

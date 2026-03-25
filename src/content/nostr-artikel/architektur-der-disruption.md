---
# === TITEL & SLUG ===
title: "Die Architektur der Disruption: Internet-Pioniere vs. KI-Pioniere"
subtitle: "Eine vergleichende Analyse der strukturellen Muster, die bestimmen, wer in technologischen Revolutionen gewinnt und wer verschwindet."
slug: architektur-der-disruption
description: "Strukturelle Parallelen zwischen Internet (1995-2005) und KI (2020-2030): Welche Muster entscheiden, wer die nächsten Google und Amazon werden. Basierend auf vier Deep-Research-Analysen."
sig: "dc1d16f2b6e2a8ceb075a03cbb1fca34d352757e66949d71a77ad0f1d72bc22f31f45c1c48a5e276f05a6baef3dbd0d43ba2addefe67f5bd42335ff64fcf1bae"
type: long-artikel

# === KATEGORISIERUNG ===
category: technologie
tags:
  - KI
  - Internet
  - Disruption
  - Deutschland
  - Open Source
  - Infrastruktur
  - Geschäftsmodelle
  - Europa

# === TIMESTAMPS ===
date: 2026-03-25
created: 2026-03-25T07:50
modified: 2026-03-25T07:50
published_at: ""

# === STATISTIKEN ===
word_count: 6775
reading_time: 27min

# === HERO IMAGE ===
heroImage: /images/architektur-der-disruption-hero.webp
heroImageAlt: "Datenvisualisierung: Zwei S-Kurven vergleichen die Adoptionsgeschwindigkeit von Internet (1995-2005) und KI (2020-2030). Die KI-Kurve steigt 42x steiler. Ein roter Punkt markiert das Jahr 2026. Bloomberg-Terminal-Ästhetik auf schwarzem Hintergrund."
heroImageHash: "d821a3b16b58286b0d389ecaa753a7b3e5a716d363d63d613cae1bccc3be2f28"

# === OPEN GRAPH / SOCIAL ===
ogImage: /images/architektur-der-disruption-hero.webp
ogImageAlt: "Adoptionskurven im Vergleich: Internet vs. KI. Die KI-Kurve steigt 42x steiler."

# === PUBLISHING STATUS ===
status: published
canonical_url: "https://stevennoack.de/nostr/artikel/architektur-der-disruption"

# === NOSTR (Kind 30023 = Long-form) ===
nostr:
  kind: 30023
  d_tag: architektur-der-disruption
  published: true
  note_id: "5543f11dc1fbfa88cafcafee44d0f0b50d10ccde8525590b545ea83c593ad041"
  naddr: "naddr1qqdxzunrdp5hgettw36hyttyv4ez6erfwde82ur5d9hkuqg6waehxw309aex2mrp0yh8xar9wejkumn0v93kktnyv5q3vamnwvaz7tmjv4kxz7fwwpexjmtpdshxuet5qyxhwumn8ghj7mn0wvhxcmmvqgsvrwh57axds2vk8q5trk5dw0jjej2v4fkcmj2y7l9y2zn4cjenz8crqsqqqa28dnp27t"
  relays:
    - wss://relay.stevennoack.de
    - wss://relay.primal.net
    - wss://nos.lol
    - wss://relay.nostr.band
    - wss://nostr.pareto.space

# === VISIONFUSEN SIGNATUR ===
visionfusen:
  signed: false
  event_id: ""
  hash: ""
  static_page: ""

# === SYNC-KANÄLE (optional) ===
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

# === SCHEMA.ORG (für LLM-Sichtbarkeit) ===
schema:
  type: ScholarlyArticle
  datePublished: 2026-03-25
  dateModified: 2026-03-25
  author:
    type: Person
    name: Steven Noack
    url: https://stevennoack.de
  publisher:
    type: Person
    name: Steven Noack
  mainEntityOfPage: https://stevennoack.de/nostr/artikel/architektur-der-disruption
---

## Zusammenfassung

Alle dreissig Jahre entsteht eine Technologie, die über einzelne Branchen hinausgeht und die gesamte ökonomische Infrastruktur neu verdrahtet. Das Internet war eine solche Technologie. Künstliche Intelligenz ist die nächste. Die Muster, die darüber entscheiden, welche Unternehmen zu den Dominanten der kommenden Dekade werden, sind nicht neu. Sie wiederholen sich mit einer Präzision, die an eine Blaupause erinnert. Nur die Geschwindigkeit hat sich verändert. Was beim Internet fünf bis zehn Jahre dauerte, komprimiert sich bei KI auf Monate.

Diese Studie dokumentiert die strukturellen Parallelen zwischen beiden Epochen. Sie basiert auf vier unabhängigen Deep-Research-Analysen, die dasselbe Thema aus unterschiedlichen Perspektiven untersucht haben, ergänzt um eigene Recherche zu Lücken, die keine der Einzelstudien abdeckte. Jeder Datenpunkt ist quellengestützt. Das Ziel ist Vollständigkeit. Ein Dokument, das sämtliche relevanten Muster, Zahlen und Beispiele an einem Ort versammelt.

## 1. Der Netscape-Moment: Wenn eine Technologie plötzlich real wird

Jede technologische Revolution hat einen Moment, in dem sie vom Spielzeug zum Imperativ kippt. Beim Internet war dieser Moment der Börsengang von Netscape am 9. August 1995. Ein Unternehmen ohne Gewinne wurde am ersten Handelstag mit drei Milliarden Dollar bewertet.[^1] Plötzlich war das Internet kein akademisches Experiment mehr, sondern ein Markt. Bill Gates schrieb nur drei Monate zuvor sein internes Memo "The Internet Tidal Wave", in dem er das Internet als die wichtigste Entwicklung seit dem IBM PC bezeichnete und Microsofts strategische Kehrtwende einleitete.[^2]

Für KI war der äquivalente Moment der Launch von ChatGPT am 30. November 2022. OpenAI selbst nannte es ein "low-key research preview". Fünf Tage später hatte es eine Million Nutzer. Nach zwei Monaten waren es hundert Millionen. Die schnellste Adoptionskurve einer Konsumentenanwendung in der Geschichte.[^3] Bis Januar 2026 erreichte ChatGPT 900 Millionen wöchentlich aktive Nutzer und war die viertmeistbesuchte Website weltweit.[^4]

Die Adoptionsdaten machen das Ausmass der Beschleunigung greifbar:

| Technologie | Markteintritt (Massenmarkt) | Zeit bis 100 Mio. Nutzer | Adoptionsrate nach 2 Jahren |
|-------------|---------------------------|-------------------------|---------------------------|
| Personal Computer | 1981 (IBM PC) | ~14 Jahre | ~20% |
| Internet | 1995 (Netscape/NSFNET) | ~7 Jahre | 20% (US) |
| Generative KI | 2022 (ChatGPT) | ~2 Monate | 39,5% (US) |

*Quellen: CT State Community College; OECD; Pew Research Center; St. Louis Fed[^3][^5][^6]*

Das Internet brauchte eine physische Infrastruktur. Modems, Telefonleitungen, ISP-Verträge. KI hingegen sitzt als Softwareschicht auf der bereits existierenden globalen Konnektivität. Es gibt keine Hardware-Hürde. Kein Kabel muss verlegt werden. Die Reibung bei der Einführung ist nahezu eliminiert.[^7]

Die Umsatzkurven der führenden Unternehmen zeigen denselben Kompressionseffekt. Amazon brauchte sechs Jahre (1994 bis 2000), um eine Milliarde Dollar Umsatz zu erreichen. OpenAI schaffte das in ungefähr vierzehn Monaten nach dem ChatGPT-Launch und erreichte bis August 2025 einen annualisierten Umsatz von 13 Milliarden Dollar.[^4] Anthropic wuchs von 87 Millionen Anfang 2024 auf geschätzte sieben bis neun Milliarden annualisiert bis Ende 2025. Der Kompressionseffekt beträgt Faktor fünf bis zwanzig, je nach Metrik.

| Meilenstein | Internet-Ära | KI-Ära | Kompressionsfaktor |
|-------------|-------------|--------|-------------------|
| "Big Bang"-Moment | Netscape IPO, Aug 1995 | ChatGPT Launch, Nov 2022 | — |
| Zeit bis 100 Mio. Nutzer | ~7 Jahre | ~2 Monate | ~42x |
| Zeit bis 1 Mrd. $ Umsatz (führendes Unternehmen) | ~6 Jahre (Amazon) | ~14 Monate (OpenAI) | ~5x |
| Dauer der Peak-Skepsis | ~5–7 Jahre | ~2–3 Jahre (laufend) | ~2–3x |
| Umsatz des Top-Unternehmens nach ~3 Jahren | Amazon: 610 Mio. $ (1998) | OpenAI: 13 Mrd. $ ARR (2025) | ~21x |

*Quellen: Amazon 10-K; OpenAI; Anthropic; Sacra Research[^4][^8]*

## 2. Die Skeptiker: Strukturell richtig im Moment, katastrophal falsch auf Dauer

Jede disruptive Technologie durchläuft eine Phase, in der kluge Menschen überzeugende Argumente dagegen vorbringen. Beim Internet war Clifford Stoll der prominenteste Skeptiker. Im Februar 1995 schrieb er in Newsweek: "No online database will replace your daily newspaper." Siebzehn Jahre später stellte Newsweek selbst seine Druckausgabe ein.[^9] Paul Krugman prognostizierte 1998, die Wirkung des Internets auf die Wirtschaft werde "no greater than the fax machine's" sein.[^10] Robert Metcalfe, immerhin der Erfinder von Ethernet, sagte 1996 voraus, das Internet werde "catastrophically collapse". Als er sich als falsch erwies, ass er seine gedruckte Kolumne auf einer Bühne.[^11]

Die KI-Skepsis folgt identischen Argumentationsmustern:

| Argument gegen das Internet (1995) | Argument gegen KI (2024/25) |
|-----------------------------------|-----------------------------|
| "Es ist nur ein Hype für Nerds." | "Es sind nur stochastische Papageien ohne Verstand." |
| "Niemand wird online einkaufen." | "KI kann niemals echte menschliche Kreativität ersetzen." |
| "Es zerstört unsere Arbeitsplätze." | "KI wird Massenarbeitslosigkeit auslösen." |
| "Internet-Inhalte sind unzuverlässig." | "Man kann KI-generierten Inhalten nicht trauen." |
| "Es ist zu teuer, lohnt sich nicht." | "Billionen-Dollar-Infrastruktur ohne bewiesenen ROI." |

*Quellen: Newsweek 1995; MarTech; Goldman Sachs; Reddit ArtificialIntelligence; Benton et al. "Stochastic Parrots"[^9][^10][^12][^13]*

Goldman Sachs' Jim Covello schrieb im Juni 2024, es sei "not one truly transformative application" gefunden worden.[^14] Achtzehn Monate später hatte OpenAI 13 Milliarden Dollar Jahresumsatz. 2025 flossen weltweit 202 Milliarden Dollar an Venture Capital in KI. Das entspricht ungefähr der Hälfte aller globalen VC-Investitionen.[^14]

Das Muster ist konsistent: Skeptiker identifizieren reale aktuelle Limitationen, unterschätzen aber systematisch exponentielle Adoptionskurven. Stoll hatte recht, dass Einkaufszentren 1995 mehr Umsatz machten als das Internet. Und war mit allem, was danach kam, falsch.

### Die moralische Panik wiederholt sich

In den 1990ern gab es eine Welle der Empörung über "Cyberporn" und Pädophilie im Netz. Das Time Magazine widmete dem Thema 1995 eine Titelstory.[^15] Heute konzentriert sich die moralische Panik auf Deepfakes, Desinformation und die Verzerrung historischer Fakten. KI-generierte Bilder, die den Holocaust relativieren, lösten 2025 einen offenen Brief europäischer Forschungseinrichtungen aus.[^16] 54 Prozent der Deutschen fühlen sich unwohl bei KI-produzierten Inhalten, 61 Prozent fordern staatliche Regulierung und Kennzeichnungspflichten.[^17]

Damals reagierte die Branche mit Selbstregulierung: Spam-Filter, Privacy Policies. Heute fordert die Mehrheit staatliche Intervention. Der EU AI Act ist die institutionalisierte Antwort auf genau diese Angst.

## 3. Die Infrastrukturschichten: Wer die Schaufeln verkauft, gewinnt zuerst

Eines der stabilsten historischen Muster ist die Picks-and-Shovels-Dynamik: In der Goldgräberstimmung einer technologischen Revolution profitieren zuerst diejenigen, die die Werkzeuge liefern.

### Das Internet brauchte Leitungen, Browser, Server

Die Internet-Infrastruktur der 1990er bestand aus klar definierten Schichten, die jeweils eigene Gewinner hervorbrachten. ISPs wie AOL (Ende der 1990er über 20 Millionen Kunden[^18]) lieferten den Zugang. Netscape und später Internet Explorer kontrollierten die Benutzeroberfläche. Cisco baute die Router und Switches, ohne die kein Datenpaket sein Ziel fand. Akamai (gegründet August 1998[^19]) optimierte die Auslieferung. VeriSign (Spin-out 1995) schuf die PKI- und Zertifikatsinfrastruktur, die Vertrauen im Netz überhaupt erst ermöglichte.[^20]

### KI braucht Chips, Cloud, Modelle

Der KI-Stack spiegelt diese Schichtung fast exakt, nur dass die Engpassgüter andere sind:

| Rolle | Internet-Ära (1995–2005) | KI-Ära (2020–2030) | Aktuelle Akteure |
|-------|-------------------------|--------------------|-----------------| 
| Physische Schicht | Glasfaser, Modems, Kupfer | GPU-Cluster, Spezialchips | NVIDIA, AMD, CoreWeave |
| Vermittlungsschicht | Router, Switches, Protokolle | Inferenz-Infrastruktur, APIs | Cisco (damals); Groq, Together AI |
| Zugangsschicht | Browser, ISPs | Foundation Models (LLMs) | Netscape (damals); OpenAI, Anthropic, Meta |
| Betriebsplattform | Server-Hosting, Webserver | GPU-Cloud, Hyperscaler | AWS, Azure, Google Cloud |
| Datenebene | SQL-Datenbanken, Verzeichnisse | Vektor-Datenbanken, Embedding-APIs | Oracle (damals); Pinecone, Weaviate, Qdrant |
| Vertrauensschicht | PKI/Zertifikate (VeriSign) | Governance/Compliance (EU AI Act) | VeriSign (damals); Regulierungsbehörden |

*Quellen: intuitionlabs.ai; Clarifai; AI Stack Authority[^21][^22][^23]*

### NVIDIA ist das neue Cisco

Cisco wuchs von ungefähr einer Milliarde Dollar Umsatz (1994) auf 18,9 Milliarden (2000). Die Marktkapitalisierung erreichte über 555 Milliarden Dollar. Cisco war kurzzeitig das wertvollste Unternehmen der Welt. Dann brach der Telekom-Markt zusammen. Die Aktie fiel über 80 Prozent und brauchte exakt 25 Jahre, 8 Monate und 13 Tage (bis zum 10. Dezember 2025), um den Kurs vom März 2000 wiederzuerlangen.[^24]

NVIDIAs Zahlen sind beeindruckender, aber das Muster ist erkennbar: Data-Center-Umsatz von 3 Milliarden (FY2020) auf 115,2 Milliarden (FY2025). Eine Steigerung um Faktor 38 in fünf Jahren. Marktkapitalisierung von vier bis fünf Billionen Dollar Anfang 2026. Gesamtumsatz FY2025: 130,5 Milliarden bei Bruttomargen von ungefähr 75 Prozent.[^25]

| Metrik | Cisco (1994–2000) | NVIDIA (2020–2025) |
|--------|------------------|-------------------|
| Umsatzwachstum | 1 Mrd. → 19 Mrd. (19x) | 11 Mrd. → 131 Mrd. (12x) |
| Peak-Marktkapitalisierung | ~555 Mrd. $ | ~4–5 Bio. $ |
| Bruttomargen am Peak | ~65–68% | ~75% |
| KGV am Peak | >200 | ~45 |
| Kundenbasis | Telecom-Carrier (fremdfinanziert) | Hyperscaler (cash-reich) |
| Kursholung nach Korrektur | 25 Jahre | Offen |

*Quellen: Research Affiliates; East Agile; Fortune[^24][^25][^26]*

Es gibt genuines Gegenargument zur Cisco-Analogie. NVIDIAs Kunden (Microsoft, Google, Amazon, Meta) gehören zu den liquidesten Unternehmen der Geschichte. Ciscos Telecom-Käufer waren hochverschuldet, viele gingen bankrott. NVIDIAs CUDA-Ökosystem erzeugt Wechselkosten, die Ciscos austauschbare Router nie hatten. Und die GPU-Nachfrage wird durch reale Nutzung getrieben, nicht durch spekulative Überversorgung.[^27]

Allerdings: Nur geschätzte fünf Prozent der US-Telecom-Glasfaser war während der Dotcom-Ära tatsächlich beleuchtet.[^24] Auch das sah damals nach realer Nachfrage aus.

### Circular Financing: Ein Schattenmuster kehrt zurück

1999 investierte AOL in Firmen, die dieses Geld direkt für Werbung bei AOL ausgaben, was die Umsätze künstlich aufblähte.[^28] Heute sehen wir strukturell ähnliche Verflechtungen. NVIDIA investiert in Unternehmen wie OpenAI oder CoreWeave, die wiederum Milliarden für NVIDIA-Chips ausgeben. Microsofts 13-Milliarden-Dollar-Investment in OpenAI fliesst zu einem grossen Teil in Form von Azure-Cloud-Gebühren zurück an Microsoft.[^28] Diese zirkulären Kapitalströme schaffen eine Illusion von organischer Nachfrage, die bei einem Abschwung der Investitionsbereitschaft systemische Risiken für den gesamten Sektor birgt.

Ein wesentlicher Unterschied: Die "Magnificent Seven" finanzieren den KI-Ausbau mit ihren gigantischen Bargeldreserven, nicht mit Fremdkapital wie die Telecom-Carrier der Dotcom-Ära.[^25] Amerikanische Tech-Firmen werden 2025 allein geschätzte 400 Milliarden Dollar in KI-Infrastruktur investieren.[^29] Global sollen die KI-Investitionen bis 2028 drei Billionen Dollar übersteigen.

## 4. Open Source: Die unsichtbare Kraft, die beide Revolutionen demokratisierte

### Das Internet wurde auf Open Source gebaut

Die Protokolle des Internets waren offen. HTTP, HTML, TCP/IP: Niemand musste Lizenzgebühren zahlen, um eine Website zu bauen oder einen Server zu betreiben. Aber es ging weit über Protokolle hinaus. Der LAMP-Stack (Linux, Apache, MySQL, PHP) war das Fundament, auf dem das kommerziell nutzbare Web entstand. Apache spielte eine Schlüsselrolle beim anfänglichen Wachstum des World Wide Web und überholte schnell den NCSA HTTPd als dominanten Webserver.[^30] In den späten 1990ern und frühen 2000ern betrieb Apache über 50 Prozent aller aktiven Websites.[^31]

Das war kein Zufall. Open Source senkte die Eintrittsbarriere auf nahezu null. Ein Teenager mit einem Linux-Rechner und einer Internetverbindung konnte eine Website bauen, die technisch auf derselben Infrastruktur lief wie Amazon oder eBay. PHP und MySQL machten datenbankgetriebene Webanwendungen für Millionen von Entwicklern zugänglich.[^32] Facebook wurde in PHP geschrieben. Wikipedia läuft auf MediaWiki (PHP). WordPress, das heute über 40 Prozent aller Websites betreibt, basiert auf dem LAMP-Stack.

Open Source hat nicht nur das Web demokratisiert. Open Source hat DNS, DHCP, E-Mail und IRC hervorgebracht. Das Internet wurde buchstäblich in einem offenen Basar geschmiedet, der dann das Internet selbst gebar.[^33]

### KI durchläuft denselben Zyklus

Meta veröffentlichte LLaMA im Februar 2023 und löste damit eine Open-Source-Welle aus, die den gesamten KI-Markt veränderte. LLaMA 3 (2024) erreichte in der ersten Woche 1,2 Millionen Downloads.[^34] Mistral 7B (2023), vollständig unter Apache 2.0 lizenziert, übertraf LLaMA 2 13B auf allen Benchmarks bei einem Bruchteil der Modellgrösse.[^34] DeepSeek demonstrierte mit R1, dass Frontier-Level-Performance mit 90 bis 95 Prozent geringeren Kosten erreichbar ist.[^35]

Das Muster "Open Source frisst Proprietary von unten" wiederholt sich. Linux verdrängte proprietäre Unix-Varianten durch kumulative Adoption in der Breite. Langsam, aber unaufhaltsam. Open-Weight-Modelle tun dasselbe mit proprietären Foundation Models. Sie werden nie das beste Einzelmodell sein. Aber sie werden gut genug für die Mehrheit der Anwendungsfälle und schaffen ein Ökosystem, das die proprietären Anbieter unter permanenten Preisdruck setzt.

Für Entwickler-Ökosysteme gilt dasselbe Muster. PHP und MySQL machten das Web baubar. Heute machen Tools wie Cursor (über 500 Millionen Dollar annualisierter Umsatz in unter 24 Monaten, 29,3 Milliarden Dollar Bewertung[^36]), Replit und Vercel das Bauen mit KI zugänglich. GitHub Copilot hat über 20 Millionen kumulative Nutzer und generiert 46 Prozent des gesamten Codes seiner Nutzer.[^37] Hugging Face ist das GitHub der Modellwelt geworden: eine Distributions- und Hosting-Plattform, die das Ökosystem zusammenhält.[^38]

## 5. Das Geschäftsmodell-Rätsel: Werbung war die Antwort beim Internet. Was ist sie bei KI?

### Google fand das Internet-Geschäftsmodell

Das Internet hatte lange kein tragfähiges Geschäftsmodell. Die ersten Versuche waren Paywalls (gescheitert), E-Commerce-Margen (dünn) und Banner-Werbung (ineffizient). Dann kam Google AdWords. Im Jahr 2000 gestartet mit nur 350 teilnehmenden Unternehmen, revolutionierte das Self-Service-Keyword-Bidding-System die Online-Werbung.[^39] Zum Börsengang 2004 war Google bereits profitabel (143 Millionen Dollar Gewinn im ersten Halbjahr) bei 23 Milliarden Dollar Bewertung.[^40] 2024 generierte Alphabet 264 Milliarden Dollar allein aus Werbung. 2025 erreichten die Gesamterlöse 401,4 Milliarden Dollar.[^41]

Werbung wurde zum dominanten Geschäftsmodell des Internets, weil sie das Aufmerksamkeitsproblem löste: Nutzer bekamen kostenlose Services, Werbetreibende bekamen messbare Reichweite. Google, Facebook, YouTube: Die wertvollsten Internet-Unternehmen monetarisieren im Kern Aufmerksamkeit durch Werbung.

### KI sucht noch sein AdWords

Bei KI ist die Geschäftsmodellfrage noch nicht abschliessend beantwortet. Die aktuellen Modelle sind:

**Subscription (ChatGPT Plus, Claude Pro):** OpenAI verdient 20 Dollar pro Monat von Einzelnutzern. Einfach, skalierbar, aber mit hartem Deckel pro Nutzer.[^42]

**Usage-based API-Pricing:** Abrechnung pro Token oder pro Request. OpenAI, Anthropic, Google bieten APIs mit mengenbasierter Abrechnung. Die Margen sind dünn, weil die Inferenzkosten hoch sind. OpenAI projiziert einen Cash-Burn von neun Milliarden Dollar 2025 und 17 Milliarden 2026.[^42]

**Enterprise-Lizenzen:** Die profitabelste Schicht. 92 Prozent der Fortune-500-Unternehmen nutzen ChatGPT laut OpenAI-Angaben.[^43] Enterprise-Verträge bringen höhere Margen und niedrigere Churn-Raten.

**Vertikale SaaS mit KI-Kern:** Harvey AI (190 Millionen Dollar ARR, 100.000+ Anwälte[^44]), Abridge (100 Millionen Dollar ARR, 50 Millionen medizinische Gespräche jährlich[^44]) und Cursor zeigen, dass die grössten Margen in der Anwendungsschicht liegen, nicht beim Modell selbst.

**Werbung:** OpenAI selbst beschreibt sein Geschäftsmodell explizit als "subscriptions, API, ads, commerce, and compute".[^42] Werbung ist also auf dem Radar, aber noch nicht dominant.

Die offene Frage: Wird KI ein eigenes AdWords-Äquivalent finden, das kostenlose Nutzung für die Masse mit hohen Werbeeinnahmen finanziert? Oder wird das Subscription/API-Modell dominieren? Die Geschichte des Internets legt nahe, dass das dominante Geschäftsmodell erst Jahre nach dem Technologie-Durchbruch klar wird. Google startete 1998. AdWords kam 2000. Profitabel war es 2004. Das sind sechs Jahre vom Launch bis zum bewiesenen Modell.

## 6. Die Disruptions-Mechanik: Drei Phasen, zehnfach beschleunigt

Internet-Disruptionen folgten einem konsistenten Dreischritt: **Ergänzung** (die neue Technologie assistiert dem bestehenden Modell), **Ersetzung** (die neue Technologie verdrängt den Platzhirsch), **Neue Kategorie** (Geschäftsmodelle entstehen, die vorher unmöglich waren).

### Phase 1 bis 3 beim Internet

Das Muster wiederholte sich in jeder betroffenen Branche:

**Einzelhandel:** Erst digitale Broschüren (1995–1997). Dann verlagerte sich die Transaktion online. Amazon verdrängte den physischen Buchhandel. Sears, das einst fast ein Prozent des US-BIP kontrollierte, meldete im Oktober 2018 Insolvenz an.[^45] Dann entstanden Plattformen (Amazon Marketplace, App Stores), die vorher physikalisch unmöglich waren.

**Medien:** Zeitungs-Kleinanzeigen erreichten 2000 ihren Peak bei 19,6 Milliarden Dollar und fielen bis 2012 um 77 Prozent auf 4,6 Milliarden.[^46] Tower Records ging von einer Milliarde Dollar Jahresumsatz zu Liquidation in sechs Jahren (2000–2006). Die globale Musikindustrie schrumpfte von 23,3 Milliarden (1999) auf 14,3 Milliarden (2014), bevor Streaming die Erholung brachte.[^46]

**Enzyklopädien:** Encyclopaedia Britannica verkaufte ihre Sets für 1.395 Dollar pro Stück im Tür-zu-Tür-Vertrieb. Wikipedia machte Wissen kostenlos und kollaborativ. 2012 stellte Britannica die Druckausgabe ein.[^47]

**Video:** Blockbusters CEO lehnte 2000 Netflixs Kaufangebot über 50 Millionen Dollar ab und nannte es ein "niche business". Blockbusters Säumnisgebühren generierten 800 Millionen Dollar pro Jahr. Genau diese Einnahmequelle verhinderte die Selbstkannibalisierung. Insolvenz im September 2010.[^48]

Besonders aufschlussreich: Borders Books lagerte 2001 sein gesamtes E-Commerce-Geschäft an Amazon aus. Es übergab buchstäblich die Zukunft an seinen eigenen Henker. Insolvenz im Februar 2011.[^49]

### Phase 1 bis 3 bei KI

Dieselben drei Phasen laufen ab, aber in dramatisch beschleunigter Geschwindigkeit:

**Kundenservice:** Klarnas KI-Assistent bearbeitete im Februar 2024 in seinem ersten Monat 2,3 Millionen Kundenservice-Gespräche. Das entspricht 700 Vollzeitkräften. Die Bearbeitungszeit sank von elf Minuten auf unter zwei Minuten. Geschätzter Effekt: 40 Millionen Dollar jährliche Gewinnverbesserung.[^50] Allerdings ruderte Klarna 2025 teilweise zurück, nachdem die Qualität nachliess. Die Ersetzungsphase ist noch instabil.

**Softwareentwicklung:** GitHub Copilot ergänzt (2022). Dann generiert es 46 Prozent des Codes (2025). Dann entstehen autonome Coding-Agenten, die ganze Features entwickeln. Claude Code erreichte 2,5 Milliarden Dollar annualisierten Umsatz.[^36]

**Recht:** Harvey AI bedient über 100.000 Anwälte bei 1.000+ Kanzleien und bedroht direkt das Billable-Hours-Modell, das die gesamte Rechtsbranche finanziert.[^44] CaseText wurde 2023 von Thomson Reuters für 650 Millionen Dollar übernommen. Ein Signal, dass die Platzhirsche die Bedrohung erkannt haben.

**Suche:** Perplexity liefert synthetisierte Antworten statt Links (2024–25). Ein fundamental neues Paradigma der Informationsaufnahme.

**Bildung:** Khan Academys Khanmigo bietet personalisierte 1:1-Nachhilfe für 4 Dollar pro Monat. Ein menschlicher Tutor kostet 40 bis 100 Dollar pro Stunde.[^51]

Der Dreischritt "Ergänzung → Ersetzung → Neue Kategorie" läuft bei KI ungefähr fünf- bis zehnmal schneller als beim Internet. Das bedeutet: Das strategische Fenster für Platzhirsche, um zu reagieren, misst sich in Monaten, nicht in Jahren.

## 7. Die drei Verlierer-Archetypen

Jedes Unternehmen, das während der Internet-Revolution scheiterte, beging einen von drei Fehlern: **Ignoranz** (hat es nicht kommen sehen), **zu späte Reaktion** (hat es gesehen, aber zu langsam gehandelt), oder **falsche Implementierung** (hat reagiert, aber die neue Technologie auf das alte Modell gepfropft). Alle drei Archetypen sind heute bei KI aktiv.

### Archetyp 1: Ignoranz (Kodak)

Kodaks Ingenieur Steve Sasson erfand 1975 die erste Digitalkamera. Die Reaktion des Managements: "That's cute, but don't tell anyone about it."[^52] Kodaks Filmgeschäft generierte 70 Prozent Bruttomarge. Die Organisation unterdrückte systematisch die Technologie, die sie zerstören würde. 2001 kaufte Kodak die Fotoplattform Ofoto, nutzte sie aber zum Verkauf von Papierabzügen statt zum Aufbau einer Plattform. Kodak meldete im Januar 2012 Insolvenz an. Im selben Jahr kaufte Facebook Instagram für eine Milliarde Dollar.[^52]

**Heutige Parallele:** Eine McKinsey-Studie von 2025 ergab, dass zwar 88 Prozent der Organisationen behaupten, KI zu nutzen, aber zwei Drittel in der Pilotphase steckenbleiben. Nur ungefähr ein Prozent betrachten sich als KI-reif.[^53] Eine MIT-Studie von 2025 stellte fest, dass 95 Prozent der generativen KI-Implementierungen in Unternehmen keine Umsatzbeschleunigung erzeugen.[^53] Ein Drittel der deutschen KMU sieht keinerlei Anwendungsmöglichkeit für KI. Das ist die gefährlichste Form der Verweigerung.[^54]

### Archetyp 2: Zu spät (Nokia, Blockbuster)

Nokia hielt über 40 Prozent des globalen Mobilfunkmarkts, klammerte sich aber an Symbian, als 2007 das iPhone kam. 2013 wurde die Mobilfunksparte für 7,2 Milliarden Dollar an Microsoft verkauft.[^55] Blockbuster baute tatsächlich einen kompetitiven Online-Dienst (Total Access, 2006), der so schnell Abonnenten gewann, dass er Netflix bedrohte. Aber Activist-Investor Carl Icahn drängte den CEO, der die Digitalstrategie vorantrieb, aus dem Unternehmen. Sein Nachfolger konzentrierte sich wieder auf physische Filialen.[^48]

**Heutige Parallele:** Gartner berichtet, dass nur 7 bis 24 Prozent der C-Suite-Mitglieder von ihren eigenen CEOs als "AI savvy" eingeschätzt werden.[^53] Die Führungsebene versteht die Technologie nicht, und das strategische Fenster schliesst sich schneller als in irgendeiner früheren Technologiewelle.

### Archetyp 3: Falsche Implementierung (Sears, Borders)

Der "Internet als digitale Broschüre"-Fehler hat ein direktes KI-Pendant: den "KI als Chatbot-Widget"-Ansatz. Genau wie Unternehmen in den späten 1990ern statische Websites aufstellten und sich "digital" nannten, setzen heute Unternehmen Chatbot-Oberflächen auf Legacy-Systeme, ohne ihre Datenarchitektur, Workflows oder Geschäftsmodelle zu überdenken.[^56]

Sears schloss 1993 sein Kataloggeschäft, um sich auf stationäre Läden zu konzentrieren. Es gab damit die Infrastruktur auf, die es zum Amazon hätte machen können. Borders lagerte 2001 sein E-Commerce an Amazon aus und verschenkte strategische Kompetenz an einen Konkurrenten.[^49]

### Der universelle Mechanismus: Das Innovator's Dilemma

Unter allen drei Archetypen liegt dasselbe Muster: Die Verteidigung hochprofitabler Bestandsgeschäfte verhindert die notwendige Selbstkannibalisierung. Kodaks 70-Prozent-Filmmargen. Blockbusters 800 Millionen Dollar Säumnisgebühren pro Jahr. Encyclopaedia Britannicas 1.395-Dollar-Sets im Direktvertrieb. Heute: Die Billable Hours der Anwaltskanzleien, das Headcount-basierte Pricing der Unternehmensberatungen, das Per-Agent-Umsatzmodell der Callcenter-Outsourcer.

Das Muster ist so konsistent, dass es als Prognosewerkzeug funktioniert: Man suche Branchen, in denen KI den Kern-Erlösmechanismus bedroht. Die Unternehmen, die am stärksten von diesem Mechanismus abhängen, werden am wahrscheinlichsten scheitern.

## 8. Deutschland: Hat das Internet adoptiert, aber nie monetarisiert

### Der Internet-Rückstand war kein Adoptionsproblem

Die gängige Erzählung, Deutschland sei beim Internet "3 bis 5 Jahre hinter den USA" gewesen, ist nur halb richtig. Die ARD-Online-Studie 1997 zeigte 6,5 Prozent Online-Nutzung in Deutschland.[^57] Im OECD-Broadband-Report 2000 rangierte Deutschland nur auf Platz 15.[^58] Aber bis 2005 hatte Deutschland ungefähr 68 Prozent Internet-Penetration erreicht, gleichauf mit den USA.[^59] Der eigentliche Rückstand lag nicht in der Adoption. Er lag in der Monetarisierung.

Die USA brachten Amazon, Google, Facebook, eBay, Netflix und PayPal hervor. Europa produzierte kein einziges Äquivalent in globaler Grössenordnung. Nur 2 der 30 grössten Tech-Unternehmen nach Marktkapitalisierung kommen aus der EU. US- und chinesische Plattformen kontrollieren 95 Prozent der 70 grössten digitalen Plattformen weltweit. Europa kontrolliert 3,6 Prozent.[^59]

### Das Samwer-Modell: Kopieren statt Erfinden

Deutschlands Internet-Geschichte ist geprägt vom Clone-and-Sell-Modell der Samwer-Brüder. Sie gründeten Alando (einen eBay-Klon) im Januar 1999 und verkauften es innerhalb von 100 Tagen für 43 Millionen Dollar an eBay. Ihre Firma Rocket Internet (gegründet 2007) baute Zalando, CityDeal, Wimdu und Lazada durch systematisches Kopieren bewährter US-Modelle für Nicht-US-Märkte. Auf dem Höhepunkt waren 25 Prozent der europäischen Unicorns Rocket-Internet-Unternehmen.[^59] Oliver Samwer sagte offen: "We are builders of companies, we are not innovators."

StudiVZ, Deutschlands Facebook-Klon, erreichte 15 Millionen Mitglieder. Als Facebook 2008 eine deutsche Version startete, überholte es StudiVZ innerhalb eines Jahres. StudiVZ wurde im März 2022 endgültig abgeschaltet.[^59]

### Das KI-Investitionsdefizit ist grösser als beim Internet

Die Daten für die KI-Ära zeigen eine noch stärkere Diskrepanz:

| Kennzahl | USA | China | Deutschland / EU |
|----------|-----|-------|-----------------|
| Private KI-Investitionen 2024 | 109,1 Mrd. $ | 9,3 Mrd. $ | ~0,9 Mrd. € (DE) / ~8 Mrd. $ (EU) |
| Anteil an globaler High-End-KI-Rechenkapazität | 74% | k.A. | 4,8% (EU) |
| Bedeutende KI-Modelle 2024 | 40 | 15 | 3 (alle aus Frankreich) |
| KI-Compute-Investition 2024 (spezifisch) | Dominant | Hoch (staatlich) | 54 Mio. $ (DE) vs. 2 Mrd. $ (Kanada) |

*Quellen: Bruegel; American-German Institute; WEF; Bundesnetzagentur[^60][^61][^62][^63]*

Deutschland investierte 2024 nur 54 Millionen Dollar in KI-Rechenkapazitäten. Kanada investierte zwei Milliarden. Die meisten spezialisierten Rechenzentren in Deutschland sind in der Hand US-amerikanischer Firmen.[^63]

### Aleph Alpha: StudiVZ der KI-Ära?

Deutschlands prominentester KI-Champion, Aleph Alpha (Heidelberg), sammelte 533 Millionen Dollar ein, darunter eine 500-Millionen-Serie-B von Schwarz Gruppe, Bosch und SAP. Das Ziel: "Europas Antwort auf OpenAI." Im September 2024 folgte der Pivot. Aleph Alpha gab sein eigenes Sprachmodell auf und wurde eine KI-Integrationsplattform. CEO Jonas Andrulis: "The world changed. Just having a European LLM is not sufficient as a business model."[^64] Die Umsatzziele für 2023 von 5,9 Millionen Euro wurden verfehlt. Geliefert wurde unter einer Million.[^64]

Das Echo zu StudiVZ ist unüberhörbar: anfängliche Euphorie, unzureichende Skalierung, schliesslich Kapitulation vor der US-Dominanz.

### Aber: Echte Lichtblicke, die es beim Internet nicht gab

DeepL (Köln), bewertet mit zwei Milliarden Dollar bei 185 Millionen Dollar Umsatz und 100 Prozent Wachstum, beweist, dass deutsche KI in vertikalen Anwendungen gewinnen kann.[^65]

Helsing (München), Europas Defense-AI-Champion, erreichte im Juni 2025 eine Bewertung von zwölf Milliarden Euro, befeuert durch die Post-Ukraine-Verteidigungsausgaben.[^66]

Mistral AI (Paris), gegründet im April 2023, sammelte drei Milliarden Dollar bei einer Bewertung von 14 Milliarden Dollar und ist Europas einziges glaubwürdiges Frontier-KI-Labor. Die Differenzierung: Open-Weight-Modelle und europäische Datensouveränität. Mistral investiert mehrere Milliarden Euro in eigene Rechenzentren in Schweden und Frankreich.[^67][^68]

Deutsche Industrieunternehmen zeigen einen **Industrial-AI-Vorteil**, der beim Internet kein Pendant hatte: Bosch erzielte 500 Millionen Dollar an KI-getriebenen Effizienzgewinnen über 15 Werke. Siemens führt bei KI-Patenten in Europa. BMW nutzt KI-Qualitätsinspektion. Mercedes-Benz erhielt die erste Level-3-Zertifizierung für autonomes Fahren.[^59] Deutsche Telekom und NVIDIA starteten die "Germany Industrial AI Cloud" mit bis zu 10.000 GPUs.[^69]

## 9. Regulierung: Der EU AI Act als Wildcard

### GDPR als Warnung

Der historische Präzedenzfall ist nicht ermutigend. Die GDPR reduzierte laut einer NBER-Studie (Juni 2025) europäisches Venture Capital um ungefähr 20 Prozent, löste den Rückzug von rund einem Drittel verfügbarer Apps aus und erhöhte die Vendor-Marktkonzentration um 17 Prozent.[^70] Der Draghi-Report identifizierte die GDPR explizit als strategisches Wettbewerbsproblem.[^70] 74 Prozent der von Bitkom Befragten nennen Datenschutzanforderungen als Haupthindernis für neue Technologieentwicklung.[^71]

### Der EU AI Act: Chancen und Risiken

Der EU AI Act, verabschiedet im Juni 2024, ist das weltweit erste umfassende KI-Regulierungsregime. Die Timeline: Inkrafttreten am 1. August 2024, volle Anwendbarkeit ab 2. August 2026. Verbotene Praktiken und KI-Literacy-Pflichten greifen seit Februar 2025. GPAI-Pflichten seit August 2025. High-Risk-Regeln für regulierte Produkte teils bis August 2027.[^72]

Die Compliance-Kosten werden auf 1,3 Millionen Dollar für kleine Unternehmen bis 70 Millionen Dollar für grössere geschätzt.[^70]

| Regulierungsansatz | EU | USA | China |
|-------------------|-----|------|-------|
| Grundlogik | Risikobasiert, horizontal | Fragmentiert, sektoral, Soft Law | Vertikal, staatlich kontrolliert |
| Fokus | Grundrechte, Transparenz | Globale Dominanz erhalten | Soziale Stabilität, Souveränität |
| Timeline | AI Act seit Aug 2024 | NIST AI RMF (freiwillig) | Interim Measures seit Aug 2023 |
| Risiko | Innovationshemmung durch Bürokratie | Regulierungslücken | Kontrolle hemmt Offenheit |

*Quellen: EU AI Act; NIST; Anecdotes AI; Simmons & Simmons[^72][^73][^74]*

Europa versucht einen Trade-off: Compliance-Kosten erhöhen, aber Trust und Haftungssicherheit als Marktbarriere und als Exportstandard erzeugen. Ob das aufgeht, ist die zentrale offene Frage.

### Europas Infrastruktur-Antwort: Sovereign Compute

Während die Internet-Infrastruktur historisch stark US-zentriert monetarisiert wurde, entstehen für KI in Europa gezielt Compute-Programme. Das EuroHPC Joint Undertaking baut "AI Factories" rund um KI-optimierte Supercomputer.[^75] Im März 2026 wurde die Vertragsunterzeichnung für den KI-Supercomputer "HammerHAI" als Teil dieser Initiative gemeldet.[^76]

Die deutsche Bundesregierung hat fünf Milliarden Euro bis 2025 für KI-Förderung zugesagt. Der KI-Markt in Deutschland soll von neun Milliarden Euro (2025) auf 37 Milliarden bis 2031 wachsen.[^59]

## 10. Mobile: Die zweite Welle, die KI von Anfang an hat

Das Internet hatte zwei Wellen. Die erste war Desktop (1995–2007): Browser, E-Commerce, Suchmaschinen. Die zweite war Mobile (2007–heute): Apps, Location-based Services, On-Demand-Ökonomie. Das iPhone (2007) und der App Store (2008) schufen eine komplett neue Schicht von Unternehmen, die auf dem Desktop-Internet nicht möglich gewesen wären.[^77] Instagram, Uber, WhatsApp, Snapchat, TikTok: Sie alle sind Mobile-native. Apple hat seit 2007 annähernd 1,5 Milliarden iPhones verkauft und dabei gigantische Geschäfte für App-Entwickler und Zubehörhersteller geschaffen.[^78]

Der entscheidende Punkt: KI startet bereits auf beiden Plattformen gleichzeitig. Es gibt keine "Mobile-Welle", die erst zehn Jahre später kommt. ChatGPT ist vom ersten Tag an auf dem Smartphone verfügbar. Sprachassistenten, Kamera-KI, On-Device-Modelle: Die mobile KI-Schicht existiert parallel zur Desktop-Schicht. Das eliminiert die Übergangsverzögerung, die beim Internet eine ganze Dekade dauerte, und komprimiert den Wertschöpfungszyklus weiter.

## 11. Die Standards-Frage: HTTP war offen. KI ist es (noch) nicht

Das Internet wurde auf offenen Standards gebaut. HTTP, HTML, SMTP, DNS: Jeder konnte implementieren, niemand kontrollierte das Protokoll. Diese Offenheit war der strukturelle Grund, warum das Internet nicht einer einzelnen Firma gehört.

Bei KI gibt es keinen vergleichbaren offenen Standard für Modell-Interoperabilität. Jeder Anbieter hat seine eigene API, sein eigenes Tokenformat, seine eigenen Tool-Calling-Konventionen. Das fragmentiert den Markt und schafft Lock-in.

Aber es formieren sich Gegenbewegungen. Anthropic veröffentlichte Ende 2024 das Model Context Protocol (MCP), ein offenes Protokoll zur Standardisierung der Verbindung zwischen KI-Modellen, Tools und Datenquellen. Im Dezember 2025 wurde MCP an die Agentic AI Foundation (AAIF) übergeben, eine Stiftung unter dem Dach der Linux Foundation, mitgegründet von Anthropic, Block und OpenAI.[^79] Google lancierte das Agent-to-Agent Protocol (A2A) als komplementären Standard für die Kommunikation zwischen KI-Agenten.[^80]

Ob MCP und A2A die Rolle von HTTP/HTML für KI spielen werden, ist offen. Aber die Parallele ist klar: Offene Standards demokratisieren Technologien. Ohne sie entstehen Silos und Monopole.

## 12. Die Brutkästen: Wo die Gründer herkommen

Stanford und MIT waren die Brutstätten der Internet-Revolution. Google (Stanford), Yahoo (Stanford), Cisco (Stanford), Sun Microsystems (Stanford). Die Nähe zwischen Forschung, Kapital und Unternehmertum im Silicon Valley schuf ein Ökosystem, das Europa nie replizieren konnte.

Bei KI wiederholt sich dieses Muster mit einer noch stärkeren Konzentration. Dario Amodei (Anthropic) war Postdoc an der Stanford University School of Medicine, arbeitete dann bei Baidu und Google, bevor er zu OpenAI ging und schliesslich Anthropic gründete.[^81] Die Gründer von OpenAI und Anthropic kommen aus denselben akademischen und professionellen Netzwerken.[^82] Viele Anthropic-Führungskräfte arbeiteten zuvor bei OpenAI. Google DeepMind entstand am University College London. Mistral wurde von ehemaligen Meta- und Google-DeepMind-Forschern gegründet.

Die europäische Antwort: Das Fehlen eines vergleichbaren Ökosystems aus Universität, VC und Unternehmensgründung ist ein struktureller Nachteil, der sich nicht durch Förderprogramme allein lösen lässt. Die Talente wandern dorthin, wo Kapital, Infrastruktur und Gleichgesinnte sind. Aktuell ist das primär die San Francisco Bay Area.

## 13. Wo in den nächsten zehn Jahren Billionenwerte entstehen

### Die wichtigste Lektion der Internet-Ära

Die wichtigste Lektion für KI-Investoren ist eindeutig: **Infrastrukturwert steigt sprunghaft während der Bauphase und kollabiert dann. Anwendungswert akkumuliert über Jahrzehnte.**

Die gesamte Peak-Marktkapitalisierung der Internet-Infrastrukturunternehmen (Cisco 555 Milliarden, Sun Microsystems 200 Milliarden, Nortel 270 Milliarden, Lucent, WorldCom) überstieg eine Billion Dollar. Fast dieser gesamte Wert wurde anschliessend vernichtet. Sun wurde für 7,4 Milliarden Dollar übernommen (96 Prozent Wertverlust). Nortel und WorldCom waren Totalverluste.[^24]

Die Anwendungsschicht-Unternehmen derselben Ära (Alphabet 3,65 Billionen heute, Amazon 2,25 Billionen, Meta 1,7 Billionen) repräsentieren zusammen über acht Billionen Dollar an nachhaltigem, wachsendem Wert.[^83] Die Anwendungsschicht hat ungefähr acht- bis zehnmal mehr dauerhaften Wert geschaffen als die Infrastrukturschicht.

### Wo wir heute stehen: 1998 oder 1999 in Internet-Zeit

Die aktuelle KI-Landschaft entspricht ungefähr 1998 bis 1999 in Internet-Zeit. Der Infrastrukturausbau ist in vollem Gang. Führende Plattformen konsolidieren sich (OpenAI bei 300 bis 500 Milliarden Dollar Bewertung, Anthropic bei 380 Milliarden[^84]). Aber die Anwendungsunternehmen, die die nächsten zwei Jahrzehnte definieren werden, sind entweder gerade erst gestartet oder noch nicht gegründet.

Google wurde erst 1998 gegründet, drei Jahre nachdem das Internet "offensichtlich" war. Facebook 2004. AWS 2006. Das wertvollste Internet-Unternehmen (Alphabet bei 3,65 Billionen) ging erst im August 2004 an die Börse, fast ein Jahrzehnt nach dem Netscape-IPO.[^83]

### Die drei Schichten und ihre Chancen

**Modell-Builder (Foundation Layer):** OpenAI, Anthropic, Mistral. Hohes Potenzial durch API-Standardisierung, Tool-Ökosysteme, Qualitätsführerschaft. Aber extreme Kapitalintensität und Kommoditisierungsrisiko durch Open-Source. DeepSeek zeigte, dass Frontier-Performance bei 90 bis 95 Prozent geringeren Kosten erreichbar ist.[^35] Meta (LLaMA) und Mistral verengen die Performance-Lücke stetig. Die Model-Builder diversifizieren allerdings in Consumer-Produkte (ChatGPT), Developer-Tools (Claude Code bei 2,5 Milliarden Dollar annualisiertem Umsatz[^36]) und Plattformen. Das macht sie schwerer kommoditisierbar als frühe Suchmaschinen.

**Infrastruktur-Player (Compute/Inference Layer):** NVIDIA, AMD, Hyperscaler, spezialisierte GPU-Clouds wie CoreWeave. Die robusteste Wertschöpfung in der ersten Phase. Aber die Geschichte warnt: Wenn die Effizienz der Modelle steigt (was sie tut) oder die Nachfrage stagniert, droht eine Korrektur der Überkapazitäten.

**Vertikale KI-Anwendungen (Workflow Layer):** Hier liegt historisch betrachtet das grösste langfristige Potenzial. Harvey AI, Abridge, Cursor zeigen explosives Wachstum bei gleichzeitigem Aufbau dauerhafter Wettbewerbsvorteile. Diese Unternehmen sitzen am nächsten beim Endkunden, umhüllen KI mit domänenspezifischen Workflows und Daten, und sind am wenigsten anfällig für Modell-Kommoditisierung. Sie sind die Amazon- und Google-Äquivalente: Anwendungsschicht-Unternehmen, die langfristig den meisten dauerhaften Wert schaffen.

### Die Erkennungsmerkmale des nächsten Google

Aus der historischen Musteranalyse lassen sich die Merkmale identifizieren:[^83]

1. **Löst ein massives, reales Problem.** Eine fundamentale Workflow-Transformation, kein Feature.
2. **Wird durch Nutzung besser.** Daten-Flywheels und Netzwerkeffekte. Jede Interaktion verbessert das Produkt.
3. **Sieht aktuell wie ein Spielzeug aus.** Chris Dixons Beobachtung "the next big thing always starts looking like a toy" gilt hier perfekt.
4. **Hat einen Pfad zur Plattform.** Ein Ökosystem, keine Punktlösung.
5. **Kombiniert Domänenexpertise mit KI-Kompetenz.** Zusammengesetzte Moats, die weder reine KI-Firmen noch reine Branchenkenner replizieren können.

### Was das für Deutschland und Europa bedeutet

Für Gründer im deutschsprachigen Raum ergeben sich konkrete Ableitungen:

**KI als Kern, nicht als Zusatz.** Die erfolgreichen Internet-Pioniere waren Web-native. Neue Unternehmen sollten KI-first denken: Daten, Modelle, Automatisierung als Fundament.[^85]

**Plattform statt Projekt.** Einzelfall-Automatisierung erzeugt wenig Schutzwall. Branchenspezifische Agenten-Infrastruktur oder KI-native ERPs können Netzwerkeffekte und Datenvorteile aufbauen.[^86]

**Regulierung als Designprinzip nutzen.** EU AI Act, Datenschutz und Branchennormen können als Differenzierungsmerkmal dienen. Compliance-by-Design-Plattformen für regulierte Industrien haben einen Vorteil, den US-Startups nicht einfach kopieren können.[^72]

**Ökosystem-Hebel.** Kooperation mit souveränen Modell- und Compute-Anbietern (Mistral, Aleph Alpha, europäische Clouds) reduziert Abhängigkeit und ermöglicht Positionierung als europäischer KI-Stack.[^67][^68]

**Industrial AI ist die Chance.** Im Gegensatz zu Consumer-Internet-Plattformen, die Winner-take-all-Dynamiken aufwiesen, haben industrielle KI-Anwendungen (Predictive Maintenance, Digital Twins, Qualitätskontrolle) ein verteiltes Wertschöpfungspotenzial, das zu Deutschlands Mittelstand-Struktur passt.[^59]

## 14. Die fünf Meta-Muster

Über alle sieben Dimensionen der Analyse hinweg kristallisieren sich fünf übergreifende Muster heraus, die beide Revolutionen strukturell verbinden:

**Muster 1: Infrastrukturwert steigt sprunghaft, Anwendungswert akkumuliert.** Cisco peakte bei 555 Milliarden und brauchte 25 Jahre zur Erholung. Google ist 3,65 Billionen wert und wächst noch. Die historische Basisrate spricht überwältigend dafür, über einen 10- bis 20-Jahres-Horizont auf die Anwendungsschicht zu setzen.

**Muster 2: Die Adoptionskurve ist eine komprimierte S-Kurve.** Jede nachfolgende Phase der KI-Disruption (Ergänzung, Ersetzung, Neue Kategorie) läuft ungefähr fünf- bis zehnmal schneller als die Internet-Äquivalente. Das strategische Fenster für Platzhirsche misst sich in Monaten, nicht Jahren.

**Muster 3: Skeptiker liegen kurzfristig richtig und langfristig katastrophal falsch.** Stoll hatte recht, dass Einkaufszentren 1995 mehr Umsatz machten als das Internet. Covello hatte recht, dass im Juni 2024 keine transformative KI-Anwendung existierte. Beide unterschätzten exponentielle Adoption.

**Muster 4: Das Innovator's Dilemma ist der universelle Killer.** Hochprofitable Bestandsgeschäfte erzeugen organisatorische Antikörper gegen Selbstkannibalisierung. Filmmargen töteten Kodak. Säumnisgebühren töteten Blockbuster. Billable Hours könnten traditionelle Kanzleien töten. Das Muster ist so konsistent, dass es als Prognosewerkzeug funktioniert.

**Muster 5: Europa adoptiert die Technologie, scheitert aber an der Monetarisierung.** Deutschland erreichte Internet-Penetrationsparität mit den USA bis 2005, produzierte aber null globale Internet-Plattformen. Das KI-Investitionsdefizit (109 Milliarden Dollar USA vs. ~0,9 Milliarden Euro Deutschland) deutet darauf hin, dass sich das Muster wiederholt. Europas beste Chance liegt in Industrial AI und Regulatory Arbitrage. Aber das Fenster ist schmal, und die strukturellen Nachteile bei Venture Capital, Marktfragmentierung und kultureller Risikoaversion bestehen fort.

## 15. Was kommt als Nächstes: Die KI-Korrektur und was danach bleibt

Wenn das historische Muster gilt, liegt eine Korrektur oder Rekalibrierung voraus. Das KI-Äquivalent des Dotcom-Crashs. Möglicherweise in den nächsten ein bis drei Jahren. Die Dotcom-Blase vernichtete fünf Billionen Dollar an Marktkapitalisierung und tötete ungefähr 4.800 von 7.000 Internet-Startups.[^87] Aber die Internet-Adoption selbst ging nie zurück. Der Crash war ein Filter, kein Stopp.

Amazons Aktie fiel während des Dotcom-Crashs um 95 Prozent. Heute ist Amazon 2,25 Billionen Dollar wert. Der Crash tötete schlechte Geschäftsmodelle, nicht die zugrundeliegende Technologie.

Das bedeutet: Unternehmen, die heute genuinen, KI-nativen Wert schaffen, werden aus jeder Korrektur stärker hervorgehen. Genau wie Amazon, Google und eBay aus 2000 bis 2002 als die definierenden Unternehmen des 21. Jahrhunderts hervorgingen.

Die strukturelle Wiederholung der Internet-Revolution läuft. Nur bei zehn- bis hundertfacher Geschwindigkeit. Die Muster sind da. Die Frage ist nur, wer sie liest.

## Quellen

[^1]: Netscape IPO und Marktbewertung. Cybercultural, "What the Internet Was Like in 1995", https://cybercultural.com/p/internet-1995/

[^2]: Bill Gates, "The Internet Tidal Wave" Memo, Mai 1995. Dokumentiert in zahlreichen Tech-Historien, u.a. Cybercultural 1995.

[^3]: CT State Community College, "The Rapid Adoption of Generative AI", https://ctstate.edu/images/Forms-Documents/AI-presidential-fellows/The-Rapid-Adoption-of-Generative-AI.pdf • PYMNTS, "Gen AI: The Technology That Broke the Adoption Curve", https://www.pymnts.com/artificial-intelligence-2/2025/gen-ai-the-technology-that-broke-the-adoption-curve/

[^4]: OpenAI, "ChatGPT Usage and Adoption Patterns at Work", https://cdn.openai.com/pdf/3c7f7e1b-36c4-446b-916c-11183e4266b7/chatgpt-usage-and-adoption-patterns-at-work.pdf • AI Business Weekly, "ChatGPT Statistics 2026", https://aibusinessweekly.net/p/chatgpt-statistics

[^5]: OECD, Generative AI Diffusion Analysis 2024/25 • Pew Research Center, Internet/Broadband Fact Sheet, https://www.pewresearch.org/internet/fact-sheet/internet-broadband/

[^6]: St. Louis Fed, "The Rapid Adoption of Generative AI", September 2024, https://www.stlouisfed.org/on-the-economy/2024/sep/rapid-adoption-generative-ai

[^7]: OECD Generative AI Report • PYMNTS Adoption Curve Analysis.

[^8]: Sacra Research, "OpenAI Revenue, Valuation & Funding", https://sacra.com/c/openai/ • Amazon 10-K Filings.

[^9]: Clifford Stoll, Newsweek, Februar 1995 • LA Times Rückblick 2015.

[^10]: Paul Krugman, 1998 Internet/Fax-Prognose. Quote Investigator dokumentiert Kontext und Verbreitung.

[^11]: Robert Metcalfe Internet-Collapse-Vorhersage 1996, dokumentiert in div. Tech-Historien.

[^12]: MarTech, "Why today's AI panic feels like the 1990s internet all over again", https://martech.org/why-todays-ai-panic-feels-like-the-1990s-internet-all-over-again/

[^13]: Bender, Gebru et al., "On the Dangers of Stochastic Parrots", FAccT 2021 • Nature, Halluzinations-Detektionsmethoden • ACM Surveys, Konsolidierung des Problemfelds.

[^14]: Goldman Sachs, Jim Covello, Juni 2024 • Gesamte KI-VC-Daten 2025.

[^15]: Time Magazine, "Cyberporn" Titelstory, 1995.

[^16]: EHRI Project, "Open letter: Consistent Action Against AI-generated Holocaust Distortions on Social Media Platforms", https://www.ehri-project.eu/open-letter-consistent-action-against-ai-generated-holocaust-distortions-on-social-media-platforms/

[^17]: Organisator, "Scepticism and opportunities: This is how Germans view AI-generated content", https://www.organisator.ch/en/marketing/2025-05-25/skepsis-und-chancen-so-sehen-die-deutschen-ki-generierte-inhalte/

[^18]: AOL, Wikipedia, https://en.wikipedia.org/wiki/AOL

[^19]: Akamai Technologies, SEC Filing, gegründet August 1998.

[^20]: VeriSign, Spin-out 1995, PKI/Zertifikatsdienste.

[^21]: intuitionlabs.ai, "AI Bubble vs. Dot-com Bubble: A Data-Driven Comparison", https://intuitionlabs.ai/articles/ai-bubble-vs-dot-com-comparison

[^22]: Clarifai, "Top AI Infrastructure Companies", https://www.clarifai.com/blog/top-ai-infrastructure-companies/

[^23]: AI Stack Authority, "AI Stack Vendor Comparison", https://aistackauthority.com/ai-stack-vendor-comparison

[^24]: Research Affiliates, "The AI Boom vs. the Dot-Com Bubble", https://www.researchaffiliates.com/publications/articles/1038-ai-boom-dot-com-bubble-seen-this-before • East Agile, "Technology booms and crashes", https://www.eastagile.com/blogs/technology-booms-and-crashes-what-macro-economic-patterns-reveal-about-ai-s-trajectory

[^25]: Fortune, "Jensen Huang says AI bubble fears are dwarfed by 'largest infrastructure buildout in history'", Januar 2026, https://fortune.com/2026/01/21/jensen-huang-on-ai-bubble-largest-infrastructure-buildout-history/

[^26]: Janus Henderson Investors, "AI versus the Dotcom Bubble: 8 reasons the AI wave is different", https://www.janushenderson.com/corporate/article/ai-versus-the-dotcom-bubble-8-reasons-the-ai-wave-is-different/

[^27]: Deutsche Bank, "Artificial Intelligence – Bubble or Boom?", https://www.deutsche-bank.it/news/detail/insights-artificial-intelligence-bubble-or-boom

[^28]: McGill Business Review, "Tech History Repeats: The Structural Parallels Between AI and the Dot-Com Boom", https://mcgillbusinessreview.com/articles/tech-history-repeats-the-structural-parallels-between-ai-and-the-dot-com-boom

[^29]: Fox Business, "Nvidia's Jensen Huang calls AI expansion largest infrastructure buildout in history", https://www.foxbusiness.com/technology/nvidia-ceo-says-ai-boom-fueling-largest-infrastructure-buildout-history

[^30]: Apache HTTP Server, Wikipedia, https://en.wikipedia.org/wiki/Apache_HTTP_Server

[^31]: Sumo Logic, "What is Apache?", https://www.sumologic.com/blog/apache-web-server-introduction

[^32]: Cybercultural, "1995: MySQL Debuts and Web Databases Slowly Emerge", https://cybercultural.com/p/1995-mysql-lamp-stack/

[^33]: Worldline Tech Blog, "An Open Source history", https://blog.worldline.tech/2018/10/29/opensource-history.html

[^34]: Medium, "The Rise of Open-Source AI Models (2024–2025)", https://medium.com/@justjlee/the-rise-of-open-source-ai-models-2024-2025-11354a0e8e23

[^35]: CUDO Compute, "DeepSeek R1: Open Source Models Disrupting the AI Race", https://www.cudocompute.com/blog/why-open-source-models-are-disrupting-the-ai-race

[^36]: Cursor Bewertung und Umsatz • Claude Code annualisierter Umsatz. Forbes AI 50 2025 • diverse Berichterstattung.

[^37]: GitHub Copilot Nutzungsstatistiken. Enterprise Strategy Group Research • TechTarget Survey 2024.

[^38]: Hugging Face als Model Hub und Distributions-Plattform. Forbes AI 50 • SVB AI Europe Report.

[^39]: Search Engine Land, "Google AdWords Turns 15", https://searchengineland.com/google-adwords-turns-15-a-look-back-at-the-origins-of-a-60-billion-business-234579 • Kickcharge Creative, "History of Google", https://www.kickcharge.com/blog/history-of-google/

[^40]: Google IPO August 2004, $23 Mrd. Bewertung, $143 Mio. Gewinn erstes Halbjahr.

[^41]: Alphabet SEC Filing Q4/FY2025, https://www.sec.gov/Archives/edgar/data/1652044/000165204426000012/googexhibit991q42025.htm • Statista, Google Advertising Revenue.

[^42]: OpenAI, "A business that scales with the value of intelligence", https://openai.com/index/a-business-that-scales-with-the-value-of-intelligence/ • Sacra Research, OpenAI Cash Burn Projektionen • Finout, "OpenAI Pricing in 2026", https://www.finout.io/blog/openai-pricing-in-2026

[^43]: OpenAI, Fortune 500 Adoption • AI Business Weekly ChatGPT Statistics.

[^44]: Harvey AI, Abridge, CaseText. Forbes AI 50 2025 • Thomson Reuters Akquisition • diverse Berichterstattung.

[^45]: Sears Chapter 11, Oktober 2018. Reuters Berichterstattung.

[^46]: Newspaper Classified Revenue Peak und Rückgang • Tower Records • Globale Musikindustrie-Daten. Diverse Quellen.

[^47]: Encyclopaedia Britannica stoppt Druckausgabe 2012. The Guardian • HBS Case "Reference Wars".

[^48]: Blockbuster, Netflix $50 Mio. Angebot, Carl Icahn, Insolvenz September 2010. Reuters • YouTube "Blockbuster Lost Billions Because They Rejected Netflix".

[^49]: Borders Books outsourced E-Commerce an Amazon 2001, Insolvenz Februar 2011.

[^50]: Klarna KI-Assistent Statistiken Februar 2024 • Teilweise Rücknahme 2025.

[^51]: Khan Academy Khanmigo Preisvergleich.

[^52]: Kodak, Steve Sasson, Digitalkamera 1975, Ofoto-Kauf, Insolvenz Januar 2012, Facebook/Instagram Parallele.

[^53]: McKinsey 2025 AI Survey • MIT 2025 GenAI Implementation Study • Gartner C-Suite AI Savvy Report.

[^54]: Bundesnetzagentur, "Digitalisierung im Mittelstand in Zahlen", https://www.bundesnetzagentur.de/DE/Fachthemen/Digitales/Mittelstand/Kennzahlen/artikel.html

[^55]: Nokia Symbian, iPhone 2007, Verkauf an Microsoft 2013.

[^56]: Element451, "Why AI-Native Companies Are Winning", https://element451.com/blog/why-ai-native-companies-are-winning

[^57]: ARD-Online-Studie 1997, 6,5% Online-Nutzung Deutschland.

[^58]: OECD Broadband Report 2000, Deutschland Platz 15. Pew Research Broadband Adoption PDF.

[^59]: Claude Deep Research Report. Samwer-Brüder • StudiVZ • Plattform-Statistiken • Industrial AI Beispiele • KI-Marktprognose Deutschland.

[^60]: Bruegel, "Deregulating artificial intelligence will not boost EU tech markets", https://www.bruegel.org/first-glance/deregulating-artificial-intelligence-will-not-boost-eu-tech-markets

[^61]: American-German Institute, "The State of AI in Germany", https://americangerman.institute/2025/07/the-state-of-ai-in-germany/

[^62]: WEF, "Europe is lagging in AI adoption", https://www.weforum.org/stories/2025/09/europe-ai-adoption-lag/

[^63]: American-German Institute • Bundesnetzagentur.

[^64]: Aleph Alpha Pivot September 2024, Umsatzziele verfehlt. France2030 AI • Diverse Berichterstattung.

[^65]: DeepL Bewertung und Umsatz. deutschland.de • data-unplugged.de.

[^66]: Helsing Bewertung Juni 2025.

[^67]: data-unplugged.de, "7 companies and models that decision makers should know", https://www.data-unplugged.de/en/blog/european-ai-models

[^68]: SVB, "AI in Europe: Key AI industry trends and investment insights", https://www.svb.com/business-growth/global-expansion/ai-industry-trends-in-europe/

[^69]: Deutsche Telekom und NVIDIA "Germany Industrial AI Cloud".

[^70]: NBER Juni 2025, GDPR Auswirkungen auf VC • Draghi Report • App-Rückzug und Vendor-Konzentration.

[^71]: Bitkom, 74% Datenschutz als Haupthindernis.

[^72]: EU AI Act Timeline. Simmons & Simmons, "Germany's Implementation Act for the EU AI Act", https://www.simmons-simmons.com/en/publications/cmg0yjegt004ov9ng9hb6zel2/germanys-implementation-act-for-the-eu-ai-act • Bertelsmann Stiftung, "Simplifying European AI Regulation".

[^73]: NIST AI Risk Management Framework • Anecdotes AI, "AI Regulations in 2025", https://www.anecdotes.ai/learn/ai-regulations-in-2025-us-eu-uk-japan-china-and-more

[^74]: China Interim Measures für generative AI, 15. August 2023 • Comparative Global AI Regulation, arXiv 2410.21279.

[^75]: EuroHPC Joint Undertaking, AI Factories Initiative.

[^76]: EuroHPC, HammerHAI Vertragsunterzeichnung März 2026.

[^77]: Apple App Store Launch 2008. Inverse, "15 Years Ago, Apple's App Store Changed Everything", https://www.inverse.com/tech/apple-app-store-15th-anniversary-past-present-future

[^78]: Wired, "iPhone: The Complete History", https://www.wired.com/story/guide-iphone/

[^79]: Model Context Protocol, Wikipedia, https://en.wikipedia.org/wiki/Model_Context_Protocol • Anthropic Übergabe an AAIF/Linux Foundation Dezember 2025.

[^80]: Google A2A Protocol. Gravitee.io, "Google's Agent-to-Agent (A2A) and Anthropic's Model Context Protocol (MCP)", https://www.gravitee.io/blog/googles-agent-to-agent-a2a-and-anthropics-model-context-protocol-mcp

[^81]: Dario Amodei, Wikipedia, https://en.wikipedia.org/wiki/Dario_Amodei

[^82]: Mind Quality, "Meet the founding team of OpenAI and Anthropic", https://mindquality.org/blog/mind/meet-the-founding-team-of-openai-and-anthropic

[^83]: Alphabet, Amazon, Meta Marktkapitalisierungen März 2026 • Cisco, Sun Microsystems, Nortel historische Daten.

[^84]: OpenAI und Anthropic Bewertungen 2025/2026.

[^85]: LinkedIn, "From ML-Native Products to AI-Native Companies", https://www.linkedin.com/pulse/from-ml-native-products-ai-native-companies-next-tech-ran-chen-nfcec

[^86]: WEF, "How founders are shaping the future of startups with AI", https://www.weforum.org/stories/2025/04/how-founders-are-shaping-the-future-of-entrepreneurship-with-ai/ • ScienceDirect, "Gen-AI's effects on new value propositions".

[^87]: Dotcom-Crash Statistiken: $5 Billionen Marktkapitalisierung vernichtet, ~4.800 von 7.000 Startups gescheitert. HdM Stuttgart, "Der aktuelle KI-Boom im Vergleich zur Dotcom-Blase", https://blog.mi.hdm-stuttgart.de/index.php/2026/02/09/der-aktuelle-ki-boom-im-vergleich-zur-dotcom-blase/

*Studie erstellt am 25. März 2026. Basierend auf vier unabhängigen Deep-Research-Analysen (Gemini, Perplexity, ChatGPT Deep Research, Claude) sowie ergänzender Eigenrecherche. Gesamtquellenumfang: 87+ Primärquellen.*

---

## Verifizierung

Dieser Artikel ist kryptografisch verankert:

**Nostr-Signatur:** Publiziert als Kind 30023 Long-form Event, signiert mit npub1cxa0fa6vmq5evwpgk8dg6ul99ny5e2nd3hy5fa72g598t39nxy0surzuva

**OpenTimestamps:** SHA-256 `874e45f10796c8fd452d1e39c74d809f241f991947dda9de8a22d727837f3004` — verankert in der Bitcoin-Blockchain via [OpenTimestamps](https://opentimestamps.org). Proof: [architektur-der-disruption.md.ots](/proofs/architektur-der-disruption.md.ots)

## Zitieren

```bibtex
@article{noack2026disruption,
  title     = {Die Architektur der Disruption: Internet-Pioniere (1995--2005) vs. KI-Pioniere (2020--2030)},
  author    = {Noack, Steven},
  year      = {2026},
  month     = {3},
  day       = {25},
  url       = {https://stevennoack.de/nostr/artikel/architektur-der-disruption},
  note      = {Vergleichende Analyse basierend auf vier unabh{\"a}ngigen Deep-Research-Studien},
  language  = {de}
}
```

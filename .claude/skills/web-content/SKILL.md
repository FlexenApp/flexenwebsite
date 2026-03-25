---
name: web-content
description: "Flexen Website Content Skill. Use for writing page copy, blog posts, SEO content, i18n translations, legal pages (Impressum, Datenschutz), CTAs, social proof text, and meta descriptions."
allowed-tools: Read, Write, Edit, Bash, Glob, Grep
---

# Flexen Website — Content Skill

Du bist ein Senior Content Strategist & Copywriter fuer die Flexen Fitness App Website. Du schreibst Texte die konvertieren, SEO-optimiert sind und sich premium anfuehlen — nicht generisch.

**Kontext laden:** Lies IMMER zuerst `WEBSITE_STRATEGIE.md` (Kapitel 1, 7, 8, 9, 10, 11) und `CLAUDE.md` bevor du arbeitest.

---

## Tone of Voice

### Flexen spricht:
- **Direkt** — "Fotografier dein Essen. Fertig." (nicht "Mit unserer innovativen KI-Technologie...")
- **Warm** — "Julio kennt dich besser als dein Personal Trainer" (nicht "Unser AI-System analysiert...")
- **Selbstbewusst** — "Die smarteste Fitness App Deutschlands" (nicht "Wir versuchen, die beste...")
- **Konkret** — "Spart 12 Minuten pro Mahlzeit" (nicht "Spart wertvolle Zeit")
- **Du-Form** — Immer "du", niemals "Sie" auf der Website

### Flexen spricht NICHT:
- Generische Phrasen: "Starte deine Reise", "Nimm deine Gesundheit in die Hand"
- Buzzwords ohne Substanz: "Revolutionaer", "Game-Changer", "Next-Level"
- Passive Formulierungen: "Es wird empfohlen, dass..."
- Ueber-technisch: "Unser multimodales LLM mit Function Calling..."

### Beispiele

**SCHLECHT:** "Flexen ist eine innovative Fitness-App, die dir hilft, deine Gesundheitsziele zu erreichen."

**GUT:** "Foto machen. Kalorien wissen. Flexen erkennt dein Essen in unter 2 Sekunden."

**SCHLECHT:** "Unsere KI-Technologie erstellt personalisierte Trainingsplaene basierend auf deinen individuellen Beduerfnissen."

**GUT:** "Sag Julio was du willst. Er baut dir den Plan. In 10 Sekunden."

---

## Seiten-Content-Struktur

### Homepage

**Hero:**
```
Headline:    "Dein KI-Coach fuer Fitness, Ernaehrung & Wohlbefinden"
Subline:     "Flexen kombiniert kuenstliche Intelligenz mit ganzheitlichem
              Health-Tracking. Kein manuelles Eintragen mehr."
CTA Primary: "Kostenlos starten"
CTA Secondary: "Features entdecken"
Micro-Copy:  "Keine Kreditkarte noetig · Jederzeit kuendbar"
Social Proof: "★★★★★ 4.8 · X.XXX Bewertungen"
```

**Scroll-Story Headlines (pro Scene):**
```
Morgen:      "Guten Morgen. Dein Schlaf-Score ist da."
Fruehstueck: "Foto machen. Kalorien wissen."
Training:    "Dein Plan. Dein Tempo. Dein Coach."
Abend:       "Sprich es aus. Julio hoert zu."
Nacht:       "Schlaf gut. Flexen passt auf."
```

**Feature-Grid Headlines:**
```
KI-Coach:         "Julio — Dein persoenlicher KI-Coach"
Essenserkennung:  "Fotografieren statt tippen"
Training:         "Trainingsplaene die sich anpassen"
Schlaf:           "Schlaf verstehen. Schlaf verbessern."
Journal:          "Dein Kopf braucht auch Training"
```

**Social Proof Section:**
```
Headline: "XX.XXX Menschen vertrauen Flexen"
Stats:    "XX.XXX aktive Nutzer · X.XXX.XXX Mahlzeiten getrackt · XX.XXX Trainings absolviert"
```

**Final CTA:**
```
Headline: "Bereit fuer deinen ersten Tag?"
Subline:  "Kostenlos starten. Kein Abo noetig. Julio wartet schon."
CTA:      "Jetzt Flexen laden"
```

### Features-Seite

Fuer jedes Feature ein Block:
```
[Feature Name]
[2-3 Saetze: Was es tut + warum es besser ist]
[3-4 Bullet Points: Konkrete Sub-Features]
[Phone Mockup]
```

### Preise-Seite

```
Headline: "Finde deinen Plan"
Subline:  "Starte kostenlos. Upgrade wenn du bereit bist."

KOSTENLOS:  "Fuer den Einstieg"
PREMIUM:    "Fuer maximale Ergebnisse"

Jaehrlich-Badge: "Spare XX% mit dem Jahresabo"
Garantie:        "30 Tage Geld-zurueck-Garantie"
FAQ darunter
```

---

## SEO-Content-Regeln

### Meta Descriptions (155-160 Zeichen)
```
Homepage DE: "Flexen nutzt KI fuer Ernaehrung, Training & Schlaf-Tracking.
             Fotografiere dein Essen, lass Julio deinen Plan bauen. Kostenlos starten."

Features DE: "Entdecke Flexens KI-Coach Julio, automatische Essenserkennung,
             personalisierte Trainingsplaene und Schlaf-Tracking. Alle Features im Ueberblick."

Preise DE:   "Flexen kostenlos nutzen oder Premium freischalten: unbegrenzte KI,
             Essenserkennung, erweiterte Analysen. Ab X,XX EUR/Monat."
```

### Blog-Posts

**Format:**
```markdown
---
title: "SEO-optimierter Titel (50-60 Zeichen)"
description: "Meta Description (155-160 Zeichen)"
date: "2026-XX-XX"
category: "ernaehrung" | "training" | "ki-tech" | "erfolgsgeschichten"
image: "./cover.webp"
imageAlt: "Beschreibender Alt-Text"
locale: "de"
---

## H2 mit Keyword (alle 300-400 Woerter)

Body Text...

### H3 fuer Sub-Themen

Body Text...

> Blockquote fuer wichtige Aussagen

**CTA am Ende jedes Posts:**
"Tracke deine Ernaehrung automatisch mit Flexen — [Kostenlos starten](/de/)"
```

**Cornerstone-Artikel (vor Launch schreiben):**
1. "Der ultimative Guide zur KI-gestuetzten Ernaehrung" (~1500 Woerter)
2. "Wie Flexen Kalorien per Foto zaehlt" (~1200 Woerter)
3. "Trainingsplan erstellen: KI vs. Personal Trainer" (~1200 Woerter)
4. "Schlaf optimieren: 10 wissenschaftlich bewiesene Methoden" (~1500 Woerter)
5. "Meal Prep fuer Anfaenger: Wochenplan + Einkaufsliste" (~1500 Woerter)

---

## i18n Regeln

- **Deutsch ist die primaere Sprache** — immer zuerst DE schreiben
- **Englisch ist NICHT einfach eine Uebersetzung** — den Text fuer EN-Markt anpassen
- Kulturelle Unterschiede beachten: DE nutzt "du", EN nutzt "you"
- Masseinheiten: DE = kg/cm, EN = kann beides sein (App unterstuetzt beides)
- **Immer beide Dateien updaten:** `i18n/de.json` UND `i18n/en.json`

### i18n Key-Naming
```json
{
  "hero.headline": "Dein KI-Coach fuer Fitness, Ernaehrung & Wohlbefinden",
  "hero.subline": "Flexen kombiniert kuenstliche Intelligenz mit ganzheitlichem Health-Tracking.",
  "hero.cta.primary": "Kostenlos starten",
  "hero.cta.secondary": "Features entdecken",
  "hero.microcopy": "Keine Kreditkarte noetig · Jederzeit kuendbar",
  "nav.features": "Features",
  "nav.pricing": "Preise",
  "nav.blog": "Blog"
}
```

---

## Legal Pages (PFLICHT)

### Impressum (Vorlage)
```markdown
# Impressum

**[Firmenname]**
[Strasse + Hausnummer]
[PLZ + Stadt]
Deutschland

**Kontakt:**
E-Mail: kontakt@flexen.app
Telefon: +49 XXX XXXXXXX

**Registereintrag:**
[Registergericht], [HRB-Nummer]
Geschaeftsfuehrer: [Name]

**Umsatzsteuer-ID:**
[USt-IdNr. gemaess Par. 27a UStG: DE XXXXXXXXX]

**Verantwortlich fuer den Inhalt gemaess Par. 18 Abs. 2 MStV:**
[Name, Adresse]
```

### Datenschutzerklaerung
- Empfehlung: eRecht24 Premium Generator nutzen (rechtssicher, aktuell)
- MUSS abdecken: Website Analytics, Kontaktformular, Newsletter, App-Hinweis
- Sprache: Deutsch auf /de/datenschutz, English auf /en/privacy

---

## Content-Qualitaets-Check

Vor Veroeffentlichung jeden Text pruefen:

- [ ] Keine generischen Phrasen ("Starte deine Reise", "Game-Changer")?
- [ ] Konkrete Zahlen statt vage Versprechen?
- [ ] Du-Form durchgehend?
- [ ] Max 20 Woerter pro Satz (Durchschnitt)?
- [ ] Keywords natuerlich eingebaut (kein Stuffing)?
- [ ] CTA am Ende jeder Seite/jedes Posts?
- [ ] Meta Title < 60 Zeichen, Meta Description 155-160 Zeichen?
- [ ] Alt-Text auf allen Bildern?
- [ ] Beide Sprachen aktualisiert (DE + EN)?

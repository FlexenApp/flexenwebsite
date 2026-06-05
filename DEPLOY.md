# Deploy zu Firebase

Die Website läuft auf **Firebase Hosting** (statisch) + **Cloud Functions** (für `/api/waitlist`).
Firebase-Projekt: `flexenapp-74265` (geteilt mit der Flexen-App, aber eigene Functions-Codebase `website`).

## Erstes Setup (einmalig)

```bash
# Firebase CLI installieren (falls nicht da)
npm install -g firebase-tools
firebase login

# Hosting-Site anlegen (eigene Site neben der App)
firebase hosting:sites:create flexen-website --project flexenapp-74265

# Functions-Dependencies installieren
cd functions && npm install && cd ..
```

Wenn du eine andere Site-ID nutzen willst, passe `firebase.json` → `hosting.site` an.
Falls du keine separate Site brauchst, lösche das Feld `"site"` aus `firebase.json`.

## Deploy

```bash
# 1. Site bauen (Astro → dist/)
npm run build

# 2. Hosting + Function deployen
firebase deploy --only hosting,functions:website
```

Beim ersten Deploy fragt Firebase ggf. nach Bestätigung für die neue Functions-Codebase.

## Mode umschalten (Minimal ↔ Full)

Steuerung via `MINIMAL_LAUNCH` env-var (Build-Time, nicht in Vercel/Hosting hinterlegt):

- `.env` lokal: `MINIMAL_LAUNCH=true` → Coming-Soon Homepage
- Für vollen Marketing-Site: `MINIMAL_LAUNCH=false` (oder löschen) und neu bauen + deployen

## Waitlist-Daten anschauen

Signups landen in Firestore unter `waitlist/{email}` mit Feldern:
`email, locale, ip, userAgent, createdAt, source`.

```bash
# CLI
firebase firestore:get waitlist --project flexenapp-74265 --limit 50

# Oder im Firebase Console:
# https://console.firebase.google.com/project/flexenapp-74265/firestore/data/waitlist
```

Die Collection ist Default-deny in den Rules — nur Admin-SDK (Cloud Function) kann schreiben/lesen.

## Lokal testen

```bash
# Astro-Dev
npm run dev

# Functions-Emulator (in zweitem Terminal)
firebase emulators:start --only functions,firestore

# Form auf http://localhost:4321/de/ posted dann an die Production-Function.
# Für vollständigen Local-Loop: firebase emulators:start --only hosting,functions,firestore
# (das emuliert auch die Hosting-Rewrites lokal)
```

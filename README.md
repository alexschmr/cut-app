# Cut – 12 Wochen PWA

Dein persönlicher Cut-Tracker als Progressive Web App.

---

## Installation (5 Minuten)

### Schritt 1: GitHub-Account
→ https://github.com/join (falls noch nicht vorhanden)

### Schritt 2: Neues Repository anlegen
1. https://github.com/new aufrufen
2. Repository name: `cut-app`
3. **Public** auswählen (kostenlos, für GitHub Pages nötig)
4. "Create repository" klicken

### Schritt 3: Dateien hochladen
1. Auf der Repo-Seite: "uploading an existing file" klicken
2. Alle 5 Dateien in diesen Ordner ziehen:
   - `index.html`
   - `manifest.json`
   - `sw.js`
   - `icon-192.png`
   - `icon-512.png`
3. "Commit changes" klicken

### Schritt 4: GitHub Pages aktivieren
1. Repository → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main` → Ordner: `/ (root)`
4. Save klicken
5. Nach ~2 Minuten ist die App erreichbar unter:
   `https://DEIN-USERNAME.github.io/cut-app`

---

## App auf Handy installieren

### iPhone (Safari)
1. URL in Safari öffnen
2. Teilen-Button → "Zum Home-Bildschirm"
3. Name bestätigen → Hinzufügen

### Android (Chrome)
1. URL in Chrome öffnen
2. Dreipunkt-Menü → "App installieren" oder "Zum Startbildschirm"
3. Bestätigen

---

## API-Key einrichten

Beim ersten Start wirst du nach einem Anthropic API-Key gefragt.
Ohne Key funktioniert die App, aber ohne KI-Funktionen (Kalorien aus Text/Foto, Workout-Analyse).

**Key holen:**
1. https://console.anthropic.com aufrufen
2. Einloggen / Registrieren
3. API Keys → "Create Key"
4. Key kopieren (beginnt mit `sk-ant-...`)
5. In der App eingeben → "Aktivieren & starten"

Der Key wird **nur lokal auf deinem Gerät** gespeichert (localStorage).
Er verlässt dein Gerät nie, außer wenn er für API-Calls verwendet wird.

---

## Was funktioniert offline?
- Gewichtsverlauf eintragen und verfolgen
- Essensplan ansehen und Mahlzeiten loggen
- Trainingslog eintragen (Cardio)
- Profil verwalten

## Was braucht Internet?
- Kalorien aus Text berechnen (KI)
- Kalorien aus Foto analysieren (KI)
- Workout-Screenshot analysieren (KI)

---

## Datenspeicherung
Alle Daten (Gewicht, Logs, Profil) werden lokal im Browser gespeichert (`localStorage`).
**Wichtig:** Immer über das App-Icon öffnen, nicht über den Browser – sonst sind die Daten im falschen Speicher.

# Lösung Übung 3 – was war falsch?

| # | Symptom | Ursache | Korrektur |
|---|---------|---------|-----------|
| 1a | Nur eine Spalte | `grid-template-column` (ohne s) gibt es nicht | `grid-template-columns: repeat(3, 1fr);` |
| 1b | Kein Abstand | `10 px` mit Leerzeichen ist ungültig | `gap: 10px;` |
| 2 | Bilder zu breit | `width: 600px` | `width: 100%;` (plus `height: 100%; object-fit: cover;`) |
| 3 | Link geht nur lokal | absoluter Pfad `C:\Users\...` | relativer Pfad `termine.html` |
| 4 | Link ins Leere | `index.htm` statt `index.html` | `index.html` |
| 5 | Dateiname | Leerzeichen und Grossbuchstaben | `termine.html` (klein, keine Leerzeichen/Umlaute/Sonderzeichen) |
| 6 | Tabellenzeile zu lang | `colspan="4"` + 1 weitere Zelle = 5 Spalten, die Tabelle hat aber 4 | `colspan="3"` |

Tipp für Tabellen: Pro Zeile müssen die Spalten (inkl. `colspan`) zusammen genau die Anzahl `th` der Kopfzeile ergeben.

## Erweiterungen
- `grid-auto-rows: 200px;` gibt jeder Zeile die gleiche Höhe.
- Browser geben `figure` standardmässig einen Rand (`margin: 40px`) → `margin: 0`.
- Grosses Bild: `figure:first-child { grid-column: span 2; grid-row: span 2; }`
- Hover-Text: `figure { position: relative; }`, `figcaption { position: absolute; bottom: 0; display: none; }`,
  `figure:hover figcaption { display: block; }`
- Zebra: `tr:nth-child(even) { background-color: ...; }`

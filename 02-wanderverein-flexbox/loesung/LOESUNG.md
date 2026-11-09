# Lösung Übung 2 – was war falsch?

| # | Symptom | Ursache | Korrektur |
|---|---------|---------|-----------|
| 1 | Navigation senkrecht | `display: flex` steht auf `.navigation` (dem div), aber die `li` sind Kinder vom `ul` | `display: flex` auf das `ul` (`nav ul`) |
| 2 | Inhalt/Seitenleiste untereinander | `display: flexbox` ist kein gültiger Wert | `display: flex` |
| 3 | Bild zu breit | `width: 1600px` | `max-width: 100%` |
| 4 | Links dunkelgrau | `#kopf a` (id, Spezifität 1-0-1) schlägt `.navigation a` (0-1-1) | Regel `#kopf a` löschen |
| 5 | „Home“ nicht gelb | `.aktiv` (0-1-0) verliert gegen `.navigation a` (0-1-1) | spezifischer: `nav a.aktiv` |
| 6 | Seitenleiste nicht 300px | Tippfehler `widht` | `width` |

Merke: **Spezifität** = id > Klasse > Element. Bei Gleichstand gewinnt die Regel, die weiter unten steht.
Statt `!important` lieber den Selektor genauer machen oder die störende Regel löschen.

## Erweiterungen
- `div id="kopf"` → `header`, `div class="navigation"` → `nav`, `#inhalt` → `main`,
  `#seitenleiste` → `aside`, `#fuss` → `footer`. Die `.wrapper`-div bleibt (sie ist nur fürs Layout da).
- Header: `display: flex; justify-content: space-between; align-items: center;`
- Karten: `.touren { display: flex; gap: 20px; }` und `.tour { flex: 1; }` → gleich breit.
- Footer: `display: flex; justify-content: space-between;`
- `* { box-sizing: border-box; }` damit `padding` die 300px der Seitenleiste nicht vergrössert.

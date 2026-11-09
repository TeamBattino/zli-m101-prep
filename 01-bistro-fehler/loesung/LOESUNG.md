# Lösung Übung 1 – was war falsch?

## HTML (`index.html`)
| # | Fehler | Korrektur |
|---|--------|-----------|
| 1 | `<meta charset>` fehlt (Umlaute können falsch angezeigt werden, Validator meckert) | `<meta charset="utf-8">` im `<head>` |
| 2 | `src="bilder/logo.gif alt=...` – schliessendes `"` fehlt, Bild lädt nicht | `src="bilder/logo.gif" alt="..."` |
| 3 | `<h2Speisekarte</h2>` – `>` fehlt, Überschrift unsichtbar | `<h2>Speisekarte</h2>` |
| 4 | `<em>` wird nie geschlossen, der ganze Rest ist kursiv | `</em>` nach „Region.“ |
| 5 | Vorspeisen: `<li>` ohne `<ul>` | `<ul> ... </ul>` drumherum |
| 6 | Link `#kontakt`, aber `id="Kontakt"` (Gross/Klein zählt!) | `id="kontakt"` |
| 7 | `</fotter>` statt `</footer>` | `</footer>` |

## CSS (`css/style.css`)
| # | Fehler | Korrektur |
|---|--------|-----------|
| 8 | HTML verlinkt `css/styles.css`, die Datei heisst `style.css` → gar kein Design | `href="css/style.css"` |
| 9 | `colour` (britisch) gibt es nicht | `color` |
| 10 | `color: white` ohne `;` → diese **und** die nächste Zeile (`padding`) werden ignoriert | `color: white;` |
| 11 | `main {` ohne `}` → alle folgenden Regeln landen in `main` und wirken nicht mehr richtig | `}` ergänzen |
| 12 | `#preis` ist ein **id**-Selektor, im HTML steht aber `class="preis"` | `.preis` |

## Erweiterungen
- Navigation: `<ul>` mit `<li><a href="#...">` im `<nav>`, `nav ul { display: flex; list-style: none; }`,
  Header mit `display: flex; align-items: center;`, `nav { margin-left: auto; }` schiebt die Nav nach rechts.
- Tabelle: `<table>` mit `<th>`-Kopfzeile, `border-collapse: collapse;` gegen doppelte Rahmen.
- Zentrieren: `main { max-width: 800px; margin: 0 auto; }`.
- Footer: `<a href="mailto:...">`, `text-align: center;`.

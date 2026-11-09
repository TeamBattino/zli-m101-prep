# AGENT-GUIDE: M101-Prüfung (HTML/CSS) Schritt für Schritt

Für dich **und** für die KI, die dir in der Prüfung hilft. Gib der KI diese Datei zuerst
(Abschnitt „Prompt für die KI“ unten).

## Was wir über die Prüfung wissen (aus Moodle, Stand 09.11.2026)
- Leistungsbeurteilung in zwei Teilen: **Teil A** (Tag 4, 45 Min.) und **Teil B** (Tag 5, nach
  Probeprüfung und Prüfungsvorbereitung). Die Prüfungsunterlagen selbst sind in Moodle noch versteckt.
- Modul 101 = „Webauftritt nach Vorgabe realisieren“: Aufgabe analysieren, umsetzen, **gegen die Vorgabe
  prüfen**. Ausdrücklich **ohne Programmierung** (kein JavaScript).
- Stoff: HTML-Grundgerüst, Überschriften/Absätze, Links (relativ, Anker), Bilder/Video/Favicon, Listen,
  Tabellen, semantische Tags, Box-Modell, Flexbox, Grid, horizontale Navigation, Validator, Dateinamen.
- Die Kurs-Übung **3.3 „Fehler korrigieren“** ist genau der Prüfungstyp „bestehende Seite reparieren“:
  fehlende `>` oder `"`, nicht geschlossene Tags, falscher Bildpfad.
- KI-Regeln des ZLI: Ob KI erlaubt ist, steht in der **Eigenständigkeitserklärung** der Prüfung.
  Lies dieses Blatt zuerst und halte dich daran.

---

## Prompt für die KI (kopieren)

> Ich schreibe eine Prüfung in ZLI Modul 101 (HTML/CSS, kein JavaScript). Lies zuerst den Guide unten und
> halte dich an die Regeln. Dann bekommst du die Aufgabenstellung und die Dateien. Mach zuerst nur eine
> nummerierte Liste: was ist kaputt, was soll ergänzt werden (mit Dateiname). Danach lösen wir Punkt für
> Punkt; zeig pro Punkt nur die geänderten Zeilen und wo sie hingehören.

### Key rules (English, for the AI)
1. Plain, semantic HTML5 and ordinary CSS that an apprentice would hand-write. No frameworks, no build tools,
   no JavaScript (unless the task explicitly asks), no generated SVG/base64 images, no CSS tricks the course
   did not teach (no `@layer`, no CSS nesting, no custom properties unless already used).
2. **Edit the given files.** Keep the existing structure, file names, class/id names, indentation (spaces vs
   tabs), quote style and language (German texts). Do not rewrite or reformat whole files.
3. Smallest correct change per item. Fix the cause, not the symptom (no `!important`, no magic numbers to
   hide a bug).
4. Never delete content or code you do not understand; ask first.
5. After every change: reload the browser and check the result against the exact task wording.
6. Comments only where a human would put one (e.g. `/* Navigation */`). No explanations inside the code.
7. Output only the changed lines with their location, short. The student types/pastes and verifies.

---

## Der Ablauf (Playbook)

1. **Alles lesen.** Ganze Aufgabenstellung lesen, Punkte nummerieren. Achtung auf genaue Angaben
   (Farben, Breiten in px, Anzahl Spalten, Reihenfolge, Dateinamen, „HTML nicht ändern“).
2. **Dateien anschauen.** Ordnerstruktur ansehen (wo liegen `css/`, `bilder/`?). HTML und CSS einmal
   von oben nach unten überfliegen. Welche Klassen/ids gibt es schon?
3. **Im Browser öffnen** (`index.html` doppelklicken, oder VS Code „Open with Live Server“).
   Was sieht man? Was fehlt? Screenshot im Kopf: so ist der Ist-Zustand.
4. **Liste machen:** A) was ist **kaputt** (Fehler), B) was soll **ergänzt** werden. Pro Punkt: welche Datei.
5. **Zuerst die Fehler** (Teil A), weil sie oft alles andere stören (z. B. falscher CSS-Dateiname → gar kein
   Design). Dabei hilft der **W3C Validator** (siehe unten).
6. **Dann erweitern**, Punkt für Punkt. Pro Punkt die **kleinste** richtige Änderung im **bestehenden** Code.
7. **Nach jeder Änderung:** speichern (Ctrl+S!), Browser neu laden (F5, bei CSS evtl. Ctrl+F5), prüfen.
   Geht etwas nicht: F12 → Element anklicken → Styles (durchgestrichen = überschrieben, Warndreieck = ungültig).
8. **Stil beibehalten:** gleiche Einrückung, gleiche Schreibweise der Klassen (deutsch/englisch, mit `-`),
   neue CSS-Regeln in die bestehende Datei an der passenden Stelle.
9. **Schlusskontrolle** (Checkliste unten) und Aufgabentext Satz für Satz abhaken.
10. **Abgabe** genau wie verlangt (Ordnername, ZIP, ganze Ordnerstruktur inkl. Bilder und CSS).

## Regeln (Deutsch)
- Normales HTML und CSS, so wie im Kurs. Kein Framework (Bootstrap, Tailwind), kein JavaScript,
  keine generierten SVGs oder Bilder.
- **Bestehende Dateien bearbeiten**, nicht neu schreiben. Nichts löschen, was du nicht verstehst.
- Klassen- und Dateinamen nicht umbenennen, ausser die Aufgabe verlangt es.
- Kein `!important`, kein `style="..."` im HTML (ausser verlangt), keine `<br>` für Abstände
  (Abstände macht `margin`/`padding`).
- Lieber 10 Punkte sauber als 15 halb. Bei Zeitdruck: Fehler zuerst, dann die einfachen Erweiterungen.

---

## Fehlersuche: Symptom → Ursache

### HTML (der Validator findet fast alles)
| Symptom | Typische Ursache |
|---------|------------------|
| Bild fehlt (kleines Symbol) | Pfad falsch (`bilder/` vs `img/`, `.jpg` vs `.png`, Gross/Klein), `"` fehlt |
| Ab einer Stelle ist alles kursiv/fett/Link | `<em>`, `<strong>`, `<a>` nicht geschlossen |
| Überschrift/Text verschwindet | Tag kaputt: `<h2Titel</h2>`, `<p` ohne `>`, `<!-- Kommentar` nicht geschlossen |
| Seltsame Zeichen statt ä/ö/ü | `<meta charset="utf-8">` fehlt |
| Listenpunkte fehlen | `<li>` ohne `<ul>`/`<ol>` |
| Anker-Link springt nicht | `href="#kontakt"` aber `id="Kontakt"` (Gross/Klein!) oder id fehlt |
| Link geht nur auf meinem PC | absoluter Pfad `C:\Users\...` → relativ: `seite.html`, `../index.html` |
| Link ins Leere | Dateiname falsch (`index.htm`, Tippfehler, Leerzeichen im Dateinamen) |
| Tabelle verschoben | Zellen pro Zeile (inkl. `colspan`) ≠ Anzahl Spalten; `</tr>`/`</td>` fehlt |
| Tag falsch geschrieben | `</fotter>`, `<secton>`, `<il>` → Validator zeigt „Stray end tag“ |

### CSS
| Symptom | Typische Ursache |
|---------|------------------|
| Gar kein Design | `<link>`-Pfad/Dateiname falsch (`styles.css` vs `style.css`, `css/` vergessen), `rel="stylesheet"` fehlt |
| Eine Eigenschaft wirkt nicht | Tippfehler (`colour`, `widht`, `backround`), Leerzeichen in `10 px`, falscher Wert (`display: flexbox`, `centre`) |
| Zwei Zeilen wirken nicht | `;` am Ende der ersten fehlt |
| Ab einer Stelle wirkt nichts mehr | `}` fehlt (oder `{` zu viel) |
| Regel wirkt nicht, Selektor „stimmt“ | `.name` (Klasse) vs `#name` (id) verwechselt, Klassenname anders geschrieben |
| Regel wird überschrieben (durchgestrichen) | **Spezifität**: id (1-0-0) > Klasse (0-1-0) > Element (0-0-1); bei Gleichstand gewinnt die untere Regel. Selektor genauer machen oder die störende Regel löschen |
| Flex/Grid wirkt nicht | auf das falsche Element gesetzt: `display: flex` gehört auf den **Eltern**-Container (z. B. `ul`, nicht `li`/`nav`) |
| `grid` nur eine Spalte | `grid-template-columns` (mit s!) fehlt/falsch |
| Element breiter als erwartet / horizontaler Scrollbalken | feste `width` in px, Bild ohne `max-width: 100%`, `padding` + `width: 100%` ohne `box-sizing: border-box` |
| `width`/`margin-top` wirkt bei `a`/`span` nicht | Inline-Element → `display: inline-block` oder `block` |
| `margin: 0 auto` zentriert nicht | Element hat keine `width`/`max-width` oder ist inline |
| Unerwarteter Rand | Browser-Standard: `body` 8px, `ul` padding-left, `figure` 40px, `h1`/`p` margin → auf 0 setzen |
| Text unter Bild nicht lesbar | Kontrast zu tief (helle Schrift auf hellem Grund) |

---

## Häufige Aufgaben und wie man sie löst

### Grundgerüst
```html
<!DOCTYPE html>
<html lang="de">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Seitentitel</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>
        <header> ... <nav> ... </nav></header>
        <main> ... </main>
        <footer> ... </footer>
    </body>
</html>
```
Semantik: `header` (Kopf/Logo), `nav` (Navigation), `main` (Hauptinhalt, **nur einmal**), `section`
(Abschnitt mit Überschrift), `article` (eigenständiger Inhalt, z. B. Karte/Beitrag), `aside` (Seitenleiste),
`footer` (Fuss). Nur **ein** `h1` pro Seite, Überschriften nicht überspringen (h1 → h2 → h3).

### Horizontale Navigation (Kurs-Übung 4.3)
```html
<nav>
    <ul>
        <li><a href="index.html" class="aktiv">Home</a></li>
        <li><a href="angebot.html">Angebot</a></li>
        <li><a href="kontakt.html">Kontakt</a></li>
    </ul>
</nav>
```
```css
nav ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: 20px;
}

nav a {
    color: white;
    text-decoration: none;
    padding: 5px 10px;
}

nav a:hover,
nav a.aktiv {
    background-color: #555;
}
```
Logo links, Navigation rechts: `header { display: flex; justify-content: space-between; align-items: center; }`

### Seitenlayout mit Flexbox (Kurs-Übung 5.2a)
```css
* { box-sizing: border-box; }

.wrapper {             /* Container um main und aside */
    display: flex;
    gap: 20px;
}

main { flex: 1; }      /* nimmt den restlichen Platz */
aside { width: 300px; }

footer {
    display: flex;
    justify-content: space-between;   /* links / rechts */
}
```
Ganze Seite mindestens so hoch wie das Fenster, Footer unten:
`body { min-height: 100vh; display: flex; flex-direction: column; }` und `main { flex: 1; }`.

### Karten nebeneinander, gleich breit
```css
.karten {
    display: flex;
    gap: 20px;
}

.karte {
    flex: 1;
    padding: 15px;
    background-color: white;
    border-radius: 5px;
}
```
Sollen sie auf die nächste Zeile umbrechen: `flex-wrap: wrap;` und `.karte { flex: 1 1 250px; }`.

### Flexbox-Spickzettel
| Eigenschaft (auf den Container) | Wirkung |
|---|---|
| `display: flex` | Kinder nebeneinander |
| `flex-direction: column` | Kinder untereinander |
| `justify-content: center / space-between / space-around` | Verteilung in Hauptrichtung (waagrecht) |
| `align-items: center / flex-start / stretch` | Ausrichtung quer dazu (senkrecht) |
| `gap: 20px` | Abstand zwischen den Kindern |
| `flex-wrap: wrap` | Umbruch erlauben |
| auf dem Kind: `flex: 1` | wächst und teilt Platz gleichmässig |

### Galerie mit CSS Grid (Kurs-Übung 5.3)
```css
#galerie {
    display: grid;
    grid-template-columns: repeat(4, 1fr);   /* 4 gleiche Spalten */
    grid-auto-rows: 200px;                   /* jede Zeile 200px */
    gap: 1rem;
    width: 1000px;
}

#galerie figure {
    margin: 0;
    position: relative;
}

#galerie img {
    width: 100%;
    height: 100%;
    object-fit: cover;     /* füllt ohne Verzerren */
    display: block;
}

.gross {                   /* oder z. B. figure:nth-child(1) */
    grid-column: span 2;
    grid-row: span 2;
}

/* Bildtext beim Hover über dem Bild */
#galerie figcaption {
    display: none;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.6);
    color: white;
}

#galerie figure:hover figcaption {
    display: block;
}
```
Feste Platzierung: `grid-column: 1 / 3;` (von Linie 1 bis 3), `grid-row: 2 / 4;`.

### Zentrieren
| Was | Wie |
|---|---|
| Text | `text-align: center;` (auf den Eltern-Block) |
| Block mit Breite (z. B. Inhalt 800px) | `max-width: 800px; margin: 0 auto;` |
| Etwas in einer Box, waagrecht + senkrecht | Box: `display: flex; justify-content: center; align-items: center;` |
| Bild | `display: block; margin: 0 auto;` |

### Box-Modell
Gesamtbreite = `width` + `padding` + `border` (+ `margin` aussen). Mit `* { box-sizing: border-box; }` gehören
padding und border **in** die width hinein (einfacher). `margin: 10px 20px;` = oben/unten 10, links/rechts 20.
`margin: 5px 10px 15px 20px;` = oben, rechts, unten, links (Uhrzeigersinn).

### Bilder, Hintergrund, Video, Favicon
```html
<img src="bilder/logo.png" alt="Logo der Firma Muster">
<video src="video/film.mp4" controls width="640"></video>
<link rel="icon" href="bilder/favicon.png">   <!-- im head -->
```
```css
img { max-width: 100%; }
header {
    background-image: url("../bilder/hintergrund.jpg");   /* Pfad relativ zur CSS-Datei! */
    background-size: cover;
    background-position: center;
}
```
`alt` immer ausfüllen (beschreibt das Bild). Pfade in der CSS-Datei gehen von `css/` aus → `../bilder/...`.

### Links
```html
<a href="kontakt.html">Kontakt</a>                  <!-- Seite im gleichen Ordner -->
<a href="../index.html">Start</a>                   <!-- eine Ebene höher -->
<a href="#team">Zum Team</a> ... <section id="team"> <!-- Anker auf der Seite -->
<a href="https://www.zli.ch" target="_blank">ZLI</a> <!-- extern, neues Tab -->
<a href="mailto:info@firma.ch">E-Mail</a>
<a href="tel:+41441234567">044 123 45 67</a>
```
Dateinamen: klein, keine Leerzeichen, keine Umlaute/Sonderzeichen (`ueber-uns.html`). Startseite heisst `index.html`.

### Listen und Tabellen
```html
<ul><li>Punkt</li></ul>            <!-- Aufzählung -->
<ol><li>Schritt 1</li></ol>        <!-- nummeriert -->
<dl><dt>Begriff</dt><dd>Erklärung</dd></dl>

<table>
    <tr><th>Tag</th><th>Zeit</th><th>Ort</th></tr>
    <tr><td>Mo</td><td>8–12</td><td>Zürich</td></tr>
    <tr><td>Di</td><td colspan="2">geschlossen</td></tr>   <!-- 1 + 2 = 3 Spalten -->
</table>
```
```css
table { border-collapse: collapse; }
th, td { border: 1px solid #333; padding: 8px; text-align: left; }
tr:nth-child(even) { background-color: #f2f2f2; }   /* Zebra */
```

### Schrift und Farben
```css
body {
    font-family: Arial, Helvetica, sans-serif;   /* immer mit Ersatzschrift */
    font-size: 16px;
    line-height: 1.5;
    color: #333;
}
h1 { font-size: 2em; font-weight: bold; text-transform: uppercase; letter-spacing: 2px; }
.hinweis { color: #b00020; background-color: rgba(176, 0, 32, 0.1); }
```
Farben als `#rrggbb`, `rgb(…)`, `rgba(…, 0.5)` (halbtransparent). Auf genügend Kontrast achten.
Google Font (nur wenn verlangt): `<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">`
und `font-family: "Roboto", sans-serif;`.

### Position (Kurs Block 5)
`position: relative` (Bezugspunkt), darin `position: absolute; top: 0; right: 0;`.
`position: sticky; top: 0;` = Navigation bleibt beim Scrollen oben. `position: fixed` = immer am Fenster.

### Formular (falls verlangt, im Kurs kaum behandelt)
```html
<form action="#" method="post">
    <label for="name">Name</label>
    <input type="text" id="name" name="name" required>

    <label for="email">E-Mail</label>
    <input type="email" id="email" name="email" required>

    <label for="nachricht">Nachricht</label>
    <textarea id="nachricht" name="nachricht" rows="5"></textarea>

    <button type="submit">Senden</button>
</form>
```
```css
form { display: flex; flex-direction: column; gap: 8px; max-width: 400px; }
```
Jedes Feld hat ein `label` mit `for` = `id` des Feldes.

### Responsive (Bonus, im Kurs nicht behandelt)
```css
@media (max-width: 700px) {
    .wrapper { flex-direction: column; }
    aside { width: auto; }
}
```
Braucht `<meta name="viewport" ...>` im head.

---

## Schlusskontrolle (wie das Testprotokoll aus Übung 6.1)
- [ ] Jeder Punkt der Aufgabenstellung erledigt (Text nochmals Satz für Satz lesen)
- [ ] **W3C Validator** ohne Fehler: <https://validator.w3.org/#validate_by_input> (Code reinkopieren);
      CSS: <https://jigsaw.w3.org/css-validator/#validate_by_input>
- [ ] `<!DOCTYPE html>`, `lang="de"`, `<meta charset="utf-8">`, sinnvoller `<title>`
- [ ] Alle Links angeklickt (auch Navigation auf **jeder** Seite), alle Bilder sichtbar, alle mit `alt`
- [ ] Nur relative Pfade, Dateinamen klein ohne Leerzeichen/Umlaute
- [ ] Fenster schmaler/breiter ziehen: nichts läuft über, kein horizontaler Scrollbalken
- [ ] Einheitliche Schrift, guter Kontrast, Einrückung sauber
- [ ] Abgabe: richtiger Ordner, ganze Struktur (HTML, `css/`, `bilder/`), als ZIP falls verlangt

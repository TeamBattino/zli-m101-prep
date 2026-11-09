# Übung 3: Fotoclub Helvetia – Galerie mit CSS Grid, Tabelle, Links

Zeit: ca. 45 Minuten. Arbeite im Ordner `aufgabe/`. Die Lösung liegt in `loesung/`.
Vorbild aus dem Kurs: Übung 5.3 (Bildergalerie mit CSS Grid), 4.4 (Tabellen), Block 2 (Links, Dateinamen).

## Ausgangslage
Die Website hat zwei Seiten: `index.html` (Galerie) und `Unsere Termine.html` (Tabelle).
Die Bilder sind riesig und untereinander, die Navigation zwischen den Seiten funktioniert nicht.

## Teil A: Fehler korrigieren (7 Fehler)
1. Die Galerie hat nur eine Spalte statt drei. (2 Fehler im `#galerie`-Block)
2. Die Bilder sind breiter als ihre Spalte.
3. Der Link „Termine“ auf der Startseite funktioniert nur auf dem eigenen PC, nie auf dem Webserver.
4. Der Link „Galerie“ auf der Terminseite führt ins Leere.
5. Die Datei `Unsere Termine.html` verstösst gegen die Namensregeln für Webdateien.
   Benenne sie in `termine.html` um und passe **alle** Links an.
6. In der Tabelle ragt die letzte Zeile rechts über die Tabelle hinaus.

## Teil B: Erweitern
1. **Grid-Raster:** 3 gleich breite Spalten, jede Zeile 200px hoch, 10px Abstand.
   Die Bilder füllen ihre Zelle ganz aus, ohne verzerrt zu werden (`object-fit: cover`).
2. **Grosses Bild:** Das erste Bild (Alpen) ist doppelt so gross: es geht über 2 Spalten und 2 Zeilen.
3. **Hover:** Die Bildbeschreibung (`figcaption`) ist versteckt und erscheint erst beim Darüberfahren
   unten auf dem Bild, weisse Schrift auf halbtransparentem schwarzem Balken.
4. **Tabelle:** Füge den Ausflug „28. Nov. – Herbstwald fotografieren – Sihlwald – gratis“ an der richtigen
   Stelle ein. Kopfzeile farbig, jede zweite Zeile leicht heller (Zebra-Streifen).
5. **Navigation:** Der Link der aktuellen Seite ist farbig hervorgehoben (Klasse `aktiv`).

Wichtig: Das HTML der Galerie muss für Teil B (ausser der Klasse `aktiv`) **nicht** geändert werden,
alles geht mit CSS.

## Kontrolle
- [ ] Beide Seiten verlinken sich gegenseitig, kein `C:\` und kein Leerzeichen in Dateinamen
- [ ] Galerie wie unten, Hover funktioniert
- [ ] W3C Validator ohne Fehler (beide Seiten)

```
+-------------------+---------+
|                   | Brücke  |
|      Alpen        +---------+
|                   |  Bern   |
+---------+---------+---------+
| Zürich  | Schiff  | Lugano  |
+---------+---------+---------+
```

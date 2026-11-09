# Übung 2: Wanderverein Brienz – Layout mit Flexbox

Zeit: ca. 45 Minuten. Arbeite im Ordner `aufgabe/`. Die Lösung liegt in `loesung/`.
Vorbild aus dem Kurs: Übung 5.1 (semantische Tags) und Übung 5.2a (Design mit Flexbox nachbauen).

## Ausgangslage
Öffne `aufgabe/index.html` im Browser. Gewünscht ist dieses Layout:

```
+--------------------------------------------------------------+
| Wanderverein Brienz            [Home] Touren Termine Kontakt |  header
+--------------------------------------------+-----------------+
| Bild (so breit wie die Spalte)             | Nächste Termine |
| Willkommen ...                             | ...             |
| Unsere Touren                              | Kontakt         |  main | aside (300px)
| +----------+ +----------+ +----------+     | ...             |
| | Tour 1   | | Tour 2   | | Tour 3   |     |                 |
| +----------+ +----------+ +----------+     |                 |
+--------------------------------------------+-----------------+
| © 2026 Wanderverein Brienz          Mitglied werden: E-Mail  |  footer
+--------------------------------------------------------------+
```

Im Moment ist alles untereinander, das Bild ist riesig und die Links sind kaum lesbar.

## Teil A: Fehler im CSS korrigieren (6 Fehler)
Das HTML ist korrekt, die Fehler sind alle in `css/style.css`.
1. Die Navigation ist senkrecht statt waagrecht.
2. Inhalt und Seitenleiste stehen untereinander statt nebeneinander.
3. Das Bild ist viel zu breit, man muss seitlich scrollen.
4. Die Navigations-Links sind dunkelgrau statt weiss.
5. Der aktive Link „Home“ hat keine gelbe Hinterlegung.
6. Die Seitenleiste ist nicht 300px breit.

Tipp: F12 → Element anklicken → im Styles-Panel sieht man durchgestrichene Regeln
(überschrieben oder ungültig, gelbes Warndreieck).

## Teil B: Erweitern
1. **Semantik:** Ersetze die `div`s durch passende semantische Tags: `header`, `nav`, `main`, `aside`,
   `footer` (die drei Touren als `article`). Passe die CSS-Selektoren an.
2. **Header:** Titel links, Navigation rechts, vertikal zentriert (Flexbox).
3. **Tour-Karten:** Die drei Touren stehen nebeneinander, gleich breit, mit Abstand, weissem
   Hintergrund, Innenabstand und abgerundeten Ecken. Die Zeile „Std. · Schwierigkeit“ ist fett und grün.
4. **Footer:** Copyright links, Mitglied-werden rechts.
5. **Hover:** Navigations-Links bekommen beim Darüberfahren einen etwas dunkleren Hintergrund.
6. **Bonus (im Kurs nicht behandelt):** Unter 700px Breite stehen Inhalt/Seitenleiste und die Touren
   untereinander (`@media`).

## Kontrolle
- [ ] Layout entspricht der Skizze, kein horizontales Scrollen
- [ ] Nur ein `<main>` auf der Seite, keine `id="kopf"`/`#fuss`-Reste im CSS
- [ ] W3C Validator ohne Fehler

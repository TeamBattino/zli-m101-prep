# Übung 1: Bistro Zur Schwarzen Gans – Fehler korrigieren und erweitern

Zeit: ca. 40 Minuten. Arbeite im Ordner `aufgabe/`. Die Lösung liegt in `loesung/` (erst nachher anschauen!).

## Ausgangslage
Öffne `aufgabe/index.html` im Browser. Die Seite sieht kaputt aus: kein Design, kein Logo,
ein Titel fehlt, ein Link funktioniert nicht.

## Teil A: Fehler korrigieren
Im HTML und im CSS haben sich **12 Fehler** eingeschlichen. Die Fehler sind im Code, nicht im Text.
Korrigiere alle. Tipp: Prüfe das HTML mit dem [W3C Validator](https://validator.w3.org/#validate_by_input)
(Code reinkopieren) und schau im Browser mit F12 → Elements/Styles, welche CSS-Regeln durchgestrichen sind.

Hinweise, falls du nicht weiterkommst:
- HTML: 7 Fehler (Grundgerüst, Bild, Überschrift, Hervorhebung, Liste, Anker-Link, Fusszeile)
- CSS: 5 Fehler (Dateiname, Schreibfehler, Strichpunkt, Klammer, Selektor)

## Teil B: Erweitern
1. **Navigation:** Baue im `<nav>` eine horizontale Navigation mit den Punkten Restaurant, Speisekarte,
   Öffnungszeiten und Kontakt. Die Links springen zum jeweiligen Abschnitt auf der Seite (Anker-Links).
   Links weiss, ohne Unterstrich, beim Hover unterstrichen. Logo, Titel und Navigation stehen
   nebeneinander in einer Zeile (Flexbox), die Navigation rechts.
2. **Öffnungszeiten:** Füge zwischen Speisekarte und Kontakt einen Abschnitt „Öffnungszeiten“ mit einer
   Tabelle ein (Spalten Tag und Zeit; Mo–Do 11–21 Uhr, Fr–Sa 11–24 Uhr, So geschlossen). Die Tabelle hat
   Rahmen ohne doppelte Linien und eine farbige Kopfzeile.
3. **Inhalt zentrieren:** Der Inhalt im `<main>` ist höchstens 800px breit und horizontal zentriert.
4. **Fusszeile:** Ergänze das Jahr und einen E-Mail-Link (`info@schwarzegans.ch`). Text zentriert.

## Kontrolle
- [ ] Logo sichtbar, Titel weiss auf dunkel, alle Preise fett und braun
- [ ] Alle Navigations-Links springen an die richtige Stelle (auch „Kontakt“ im Text)
- [ ] W3C Validator zeigt keine Fehler

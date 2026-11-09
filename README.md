# M101 Prüfungsvorbereitung (ZLI, Webauftritt mit HTML/CSS)

Üben für die Leistungsbeurteilung im Modul 101: eine bestehende Website **reparieren** und **erweitern**,
mit normalem HTML und CSS. Kein JavaScript, keine Tools nötig: nur Browser und Editor (VS Code).

## Inhalt
| Ordner/Datei | Was |
|---|---|
| [`AGENT-GUIDE.md`](AGENT-GUIDE.md) | **Das Wichtigste.** Ablauf in der Prüfung, Regeln, Fehlersuche, Code-Muster für alle typischen Aufgaben, Schlusskontrolle. Auch für die KI gedacht. |
| [`cheatsheet/cheatsheet.pdf`](cheatsheet/cheatsheet.pdf) | **Spickzettel für die Theorie-LB**: 1 A4-Blatt beidseitig (2 Seiten), alle Theorie aus dem Kurs. Doppelseitig, 100 % / „Tatsächliche Grösse“ drucken. Quelle: `cheatsheet.html` |
| `01-bistro-fehler/` | Übung 1: HTML/CSS-Fehler finden (wie Kurs-Übung 3.3), Navigation, Tabelle |
| `02-wanderverein-flexbox/` | Übung 2: Layout mit Flexbox und semantischen Tags (wie 5.1/5.2a), Spezifität |
| `03-fotoclub-grid/` | Übung 3: Galerie mit CSS Grid und Hover (wie 5.3), Tabelle, Links, Dateinamen |
| `kursmaterial/` | Kopie aus Moodle: Folien (PDF), Übungsvorlagen, Lösungen, KI-Regelwerk |

Jede Übung hat `AUFGABE.md` (Auftrag), `aufgabe/` (Startdateien) und `loesung/` (fertige Lösung + `LOESUNG.md`
mit allen Fehlern erklärt).

## So übst du
1. Repo holen: `git clone <url>` oder auf GitHub „Code → Download ZIP“.
2. Ordner in VS Code öffnen. Empfohlen: Erweiterung „Live Server“ (Rechtsklick auf HTML → „Open with Live
   Server“), dann lädt der Browser bei jedem Speichern neu. Sonst: HTML-Datei doppelklicken, F5 nach jedem Speichern.
3. `AUFGABE.md` lesen, im Ordner `aufgabe/` arbeiten, genau nach dem Ablauf im
   [AGENT-GUIDE](AGENT-GUIDE.md#der-ablauf-playbook).
4. Erst danach mit `loesung/` vergleichen. Nochmal von vorne: `git checkout -- .` setzt alles zurück.

Reihenfolge: 1 → 2 → 3. Ziel: jede Übung in 40–45 Minuten.

## In der Prüfung
1. Eigenständigkeitserklärung lesen (dort steht, ob und wie KI erlaubt ist).
2. Der KI zuerst den [AGENT-GUIDE](AGENT-GUIDE.md) geben (Prompt steht drin), dann Aufgabe und Dateien.
3. Ablauf: lesen → im Browser anschauen → Liste „kaputt / ergänzen“ → Fehler zuerst → Punkt für Punkt
   erweitern → nach jedem Schritt im Browser prüfen → Validator → Schlusskontrolle.
4. Du bist verantwortlich: jede Änderung selber verstehen und im Browser kontrollieren.

## Links
- SELFHTML Wiki (im Kurs verlinkt): <https://wiki.selfhtml.org/>
- MDN HTML/CSS (deutsch): <https://developer.mozilla.org/de/>
- Flexbox: <https://css-tricks.com/snippets/css/a-guide-to-flexbox/> · Grid: <https://css-tricks.com/snippets/css/complete-guide-grid/>
- W3C Validator: <https://validator.w3.org/#validate_by_input>

Bilder in den Übungen: Unsplash (aus Kurs-Übung 5.3) und das Kurs-Logo „Schwarze Gans“.

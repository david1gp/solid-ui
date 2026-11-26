# DemoKalender: Terminsuche über Such-Pille

Status: Task 1 offen

## Ziel

Auf der Seite `/modules/DemoKalender` (https://adaptive-solid-ui.pages.dev/modules/DemoKalender, Quelle `src/demos/modules/DemoKalender.tsx`) existiert in der Kopfzeile ein Such-Icon (MDI "magnify", `<svg viewBox="0 0 24 24" class="shrink-0 align-middle fill-current size-5"><path d="M9.5,3A6.5,6.5 0 0,1 16,9.5...">`).
Ein Klick darauf soll eine Such-Pille (abgerundetes, pill-förmiges Text-Eingabefeld) öffnen. Die Eingabe filtert die Termine im Kalender nach Titel: Termine, deren Titel nicht passt, werden ausgeblendet. Beispiel: Eingabe "Telefonat" → nur Termine mit "Telefonat" im Titel bleiben sichtbar.

## Entscheidungen

- Matching: case-insensitive Teilstring-Suche auf dem Termin-Titel, Eingabe getrimmt. Leere Eingabe = alle Termine sichtbar.
- Filter wirkt live beim Tippen (kein Submit nötig) und in allen Ansichten des Kalenders (Monat, Woche, ggf. Tag/Liste), da er auf der Termin-Datenquelle angewendet wird, nicht pro Ansicht.
- Such-Pille: erscheint an Stelle bzw. neben dem Such-Icon in der Kopfzeile, bekommt beim Öffnen automatisch Fokus, Placeholder "Termine suchen…", Such-Icon links in der Pille, Schließen-Button (X) rechts.
- Schließen (X-Button oder Escape) leert die Suche und zeigt wieder alle Termine; das Such-Icon erscheint wieder.
- Kein Treffer: Kalender zeigt einfach keine Termine (kein extra Empty-State nötig), Navigation bleibt funktionsfähig.
- Bestehende Komponenten/Utilities aus dem Repo (Input, Button, Icons, Tailwind-Klassen, Solid-Signals) verwenden; keine neuen Dependencies.
- Änderung nur im DemoKalender-Demo; geteilte Kalender-Komponenten nur anfassen, falls nötig, um gefilterte Termine durchzureichen (bevorzugt: gefiltertes Array als Prop übergeben). Code-Style: Logik (Filterfunktion) gerne in eigene kleine Datei, `.tsx` bleibt view-orientiert.

## Tasks

1. Such-Pille + Titel-Filter in DemoKalender implementieren, lokal im Browser verifizieren (Öffnen, Fokus, Tippen "Telefonat" filtert in Monats- und Wochenansicht, X/Escape setzt zurück, Monatsnavigation funktioniert weiter), committen, in main mergen, pushen, deployen, live verifizieren.

## Kontext

- Vorherige Commits auf der Seite: 1b72a29 (Überschrift "Terminkalender"), 5e0339e (Avatar-Gruppe entfernt), danach Entfernung des Filter-Buttons (Trichter-Icon).
- `bun install` in mktemp-Worktrees schlug mit EROFS fehl → `node_modules` aus `/adaptive/solid-ui` symlinken.

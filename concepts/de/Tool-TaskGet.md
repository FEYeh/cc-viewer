# TaskGet

## Definition

Ruft die vollständigen Details einer Aufgabe anhand ihrer ID ab.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `taskId` | string | Ja | Die abzurufende Aufgaben-ID |

## Rückgabe

- `subject` — Aufgabentitel
- `description` — Detaillierte Anforderungen und Kontext
- `status` — Status: `pending`, `in_progress` oder `completed`
- `blocks` — Liste der Aufgaben, die von dieser Aufgabe blockiert werden
- `blockedBy` — Liste der Voraussetzungsaufgaben, die diese Aufgabe blockieren

## Anwendungsfälle

**Geeignet für:**
- Vollständige Beschreibung und Kontext einer Aufgabe vor Arbeitsbeginn abrufen
- Aufgabenabhängigkeiten verstehen
- Nach Aufgabenzuweisung vollständige Anforderungen abrufen

## Hinweise

- Nach dem Abrufen sollte die `blockedBy`-Liste geprüft werden, bevor mit der Arbeit begonnen wird
- TaskList verwenden, um Zusammenfassungen aller Aufgaben anzuzeigen

## Bedeutung in cc-viewer

TaskGet ist eine interne Aufgabenverwaltungsoperation und erzeugt keine eigenständige API-Anfrage.

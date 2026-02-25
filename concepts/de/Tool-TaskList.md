# TaskList

## Definition

Listet alle Aufgaben in der Aufgabenliste auf, um den Gesamtfortschritt und verfügbare Arbeit einzusehen.

## Parameter

Keine Parameter.

## Rückgabe

Zusammenfassung jeder Aufgabe:
- `id` — Aufgabenkennung
- `subject` — Kurzbeschreibung
- `status` — Status: `pending`, `in_progress` oder `completed`
- `owner` — Verantwortlicher (Agent-ID), leer bedeutet nicht zugewiesen
- `blockedBy` — Liste der unerledigten Aufgaben-IDs, die diese Aufgabe blockieren

## Anwendungsfälle

**Geeignet für:**
- Verfügbare Aufgaben anzeigen (Status pending, kein Owner, nicht blockiert)
- Gesamtfortschritt des Projekts prüfen
- Blockierte Aufgaben finden
- Nach Abschluss einer Aufgabe die nächste finden

## Hinweise

- Aufgaben bevorzugt in ID-Reihenfolge bearbeiten (niedrigste ID zuerst), da frühere Aufgaben oft Kontext für spätere liefern
- Aufgaben mit `blockedBy` können erst nach Auflösung der Abhängigkeiten übernommen werden
- TaskGet verwenden, um vollständige Details einer bestimmten Aufgabe abzurufen

## Bedeutung in cc-viewer

TaskList ist eine interne Aufgabenverwaltungsoperation und erzeugt keine eigenständige API-Anfrage.

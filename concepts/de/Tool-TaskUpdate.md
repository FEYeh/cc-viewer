# TaskUpdate

## Definition

Aktualisiert den Status, Inhalt oder die Abhängigkeiten einer Aufgabe in der Aufgabenliste.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `taskId` | string | Ja | Die zu aktualisierende Aufgaben-ID |
| `status` | enum | Nein | Neuer Status: `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | Nein | Neuer Titel |
| `description` | string | Nein | Neue Beschreibung |
| `activeForm` | string | Nein | Text in Verlaufsform, der während der Bearbeitung angezeigt wird |
| `owner` | string | Nein | Neuer Aufgabenverantwortlicher (Agent-Name) |
| `metadata` | object | Nein | Zu mergende Metadaten (auf null setzen zum Löschen eines Schlüssels) |
| `addBlocks` | string[] | Nein | Liste der Aufgaben-IDs, die von dieser Aufgabe blockiert werden |
| `addBlockedBy` | string[] | Nein | Liste der Voraussetzungsaufgaben-IDs, die diese Aufgabe blockieren |

## Status-Workflow

```
pending → in_progress → completed
```

`deleted` kann von jedem Status aus gesetzt werden und entfernt die Aufgabe dauerhaft.

## Anwendungsfälle

**Geeignet für:**
- Aufgabe bei Arbeitsbeginn als `in_progress` markieren
- Aufgabe nach Abschluss als `completed` markieren
- Abhängigkeiten zwischen Aufgaben festlegen
- Aufgabeninhalt bei Anforderungsänderungen aktualisieren

**Wichtige Regeln:**
- Nur als `completed` markieren, wenn die Aufgabe vollständig abgeschlossen ist
- Bei Fehlern oder Blockaden den Status `in_progress` beibehalten
- Nicht als `completed` markieren bei: fehlgeschlagenen Tests, unvollständiger Implementierung, ungelösten Fehlern

## Hinweise

- Vor der Aktualisierung den aktuellen Status über TaskGet abrufen, um veraltete Daten zu vermeiden
- Nach Abschluss einer Aufgabe TaskList aufrufen, um die nächste verfügbare Aufgabe zu finden

## Bedeutung in cc-viewer

TaskUpdate ist eine interne Aufgabenverwaltungsoperation und erzeugt keine eigenständige API-Anfrage.

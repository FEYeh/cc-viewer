# TaskCreate

## Definition

Erstellt einen strukturierten Aufgabenlisteneintrag zur Fortschrittsverfolgung, Organisation komplexer Aufgaben und Darstellung des Arbeitsfortschritts für den Benutzer.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `subject` | string | Ja | Kurzer Aufgabentitel im Imperativ (z.B. "Fix authentication bug") |
| `description` | string | Ja | Detaillierte Beschreibung mit Kontext und Akzeptanzkriterien |
| `activeForm` | string | Nein | Text im Verlaufsform, der während der Bearbeitung angezeigt wird (z.B. "Fixing authentication bug") |
| `metadata` | object | Nein | Beliebige Metadaten, die der Aufgabe angehängt werden |

## Anwendungsfälle

**Geeignet für:**
- Komplexe mehrstufige Aufgaben (mehr als 3 Schritte)
- Der Benutzer hat mehrere To-Do-Punkte angegeben
- Arbeitsverfolgung im Planungsmodus
- Der Benutzer fordert ausdrücklich eine Todo-Liste an

**Nicht geeignet für:**
- Einzelne einfache Aufgaben
- Einfache Operationen mit weniger als 3 Schritten
- Reine Konversation oder Informationsabfragen

## Hinweise

- Alle neuen Aufgaben haben den Anfangsstatus `pending`
- `subject` im Imperativ ("Run tests"), `activeForm` in der Verlaufsform ("Running tests")
- Nach der Erstellung können über TaskUpdate Abhängigkeiten gesetzt werden (blocks/blockedBy)
- Vor der Erstellung sollte TaskList aufgerufen werden, um doppelte Aufgaben zu vermeiden

## Bedeutung in cc-viewer

TaskCreate ist eine interne Aufgabenverwaltungsoperation von Claude Code und erzeugt keine eigenständige API-Anfrage. Im Chat Mode ist jedoch der tool_use Block des Modellaufrufs sichtbar.

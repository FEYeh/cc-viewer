# TaskStop

## Definition

Stoppt eine laufende Hintergrundaufgabe.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `task_id` | string | Nein | ID der zu stoppenden Hintergrundaufgabe |
| `shell_id` | string | Nein | Veraltet, stattdessen `task_id` verwenden |

## Anwendungsfälle

**Geeignet für:**
- Nicht mehr benötigte lang laufende Aufgaben beenden
- Versehentlich gestartete Hintergrundaufgaben abbrechen

## Hinweise

- Gibt Erfolgs- oder Fehlerstatus zurück
- Der `shell_id`-Parameter ist veraltet; `task_id` verwenden

## Bedeutung in cc-viewer

TaskStop-Aufrufe erzeugen selbst keine API-Anfrage und gehören zu den internen Aufgabenverwaltungsoperationen von Claude Code.

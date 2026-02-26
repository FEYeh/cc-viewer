# ExitPlanMode

## Definition

Verlässt den Planungsmodus und reicht den Plan zur Benutzerfreigabe ein. Der Planinhalt wird aus der zuvor geschriebenen Plandatei gelesen.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `allowedPrompts` | array | Nein | Liste der für die Planumsetzung benötigten Berechtigungsbeschreibungen |

Jedes Element im `allowedPrompts`-Array:

| Feld | Typ | Erforderlich | Beschreibung |
|------|-----|--------------|--------------|
| `tool` | enum | Ja | Das zutreffende Tool, derzeit nur `Bash` unterstützt |
| `prompt` | string | Ja | Semantische Beschreibung der Operation (z.B. "run tests", "install dependencies") |

## Anwendungsfälle

**Geeignet für:**
- Der Plan im Planungsmodus ist fertig und bereit zur Benutzerfreigabe
- Nur für Implementierungsaufgaben, die Code schreiben erfordern

**Nicht geeignet für:**
- Reine Recherche-/Erkundungsaufgaben – kein Verlassen des Planungsmodus nötig
- Den Benutzer fragen „Ist der Plan in Ordnung?" – genau das ist die Funktion dieses Tools, verwenden Sie nicht AskUserQuestion dafür

## Hinweise

- Dieses Tool akzeptiert keinen Planinhalt als Parameter – es liest aus der zuvor geschriebenen Plandatei
- Der Benutzer sieht den Inhalt der Plandatei zur Genehmigung
- Verwenden Sie nicht AskUserQuestion vor dem Aufruf dieses Tools, um zu fragen „Ist der Plan in Ordnung?" – das wäre redundant
- Erwähnen Sie den „Plan" nicht in Fragen, da der Benutzer den Planinhalt vor ExitPlanMode nicht sehen kann

## Bedeutung in cc-viewer

Der ExitPlanMode-Aufruf markiert das Ende der Planungsphase. Im Anfrage-Log wechseln die Anfragen nach diesem Aufruf typischerweise zu Implementierungsoperationen (Edit, Write, Bash usw.).

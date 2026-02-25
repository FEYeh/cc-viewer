# AskUserQuestion

## Definition

Stellt dem Benutzer während der Ausführung Fragen, um Klärungen zu erhalten, Annahmen zu überprüfen oder Entscheidungen anzufordern.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `questions` | array | Ja | Fragenliste (1–4 Fragen) |
| `answers` | object | Nein | Vom Benutzer gesammelte Antworten |
| `annotations` | object | Nein | Anmerkungen zu jeder Frage (z.B. Hinweise zur Vorschauauswahl) |
| `metadata` | object | Nein | Metadaten für Tracking und Analyse |

Jedes `question`-Objekt:

| Feld | Typ | Erforderlich | Beschreibung |
|------|-----|--------------|--------------|
| `question` | string | Ja | Vollständiger Fragetext, sollte mit einem Fragezeichen enden |
| `header` | string | Ja | Kurzes Label (max. 12 Zeichen), wird als Label-Chip angezeigt |
| `options` | array | Ja | 2–4 Optionen |
| `multiSelect` | boolean | Ja | Ob Mehrfachauswahl erlaubt ist |

Jedes `option`-Objekt:

| Feld | Typ | Erforderlich | Beschreibung |
|------|-----|--------------|--------------|
| `label` | string | Ja | Anzeigetext der Option (1–5 Wörter) |
| `description` | string | Ja | Beschreibung der Option |
| `markdown` | string | Nein | Vorschauinhalt (für visuellen Vergleich von ASCII-Layouts, Code-Snippets usw.) |

## Anwendungsfälle

**Geeignet für:**
- Sammeln von Benutzerpräferenzen oder Anforderungen
- Klärung mehrdeutiger Anweisungen
- Einholen von Entscheidungen während der Implementierung
- Bereitstellung von Richtungsoptionen für den Benutzer

**Nicht geeignet für:**
- Fragen wie „Ist der Plan in Ordnung?" – dafür sollte ExitPlanMode verwendet werden

## Hinweise

- Der Benutzer kann immer "Other" wählen, um eine benutzerdefinierte Eingabe zu machen
- Die empfohlene Option steht an erster Stelle mit "(Recommended)" am Ende des Labels
- `markdown`-Vorschau wird nur bei Einzelauswahl-Fragen unterstützt
- Optionen mit `markdown` wechseln zu einem nebeneinander angeordneten Layout
- Im Planungsmodus wird es verwendet, um Anforderungen vor der Festlegung des Plans zu klären

## Bedeutung in cc-viewer

AskUserQuestion-Aufrufe erscheinen im Anfrage-Log als `tool_use` Content Block mit Fragen- und Optionsdefinitionen. Die Antworten des Benutzers erscheinen im Nachrichtenverlauf nachfolgender Anfragen.

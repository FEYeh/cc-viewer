# Skill

## Definition

Führt einen Skill in der Hauptkonversation aus. Skills sind spezialisierte Fähigkeiten, die der Benutzer über Slash Commands (z.B. `/commit`, `/review-pr`) aufrufen kann.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `skill` | string | Ja | Skill-Name (z.B. "commit", "review-pr", "pdf") |
| `args` | string | Nein | Skill-Argumente |

## Anwendungsfälle

**Geeignet für:**
- Der Benutzer hat einen Slash Command im Format `/<skill-name>` eingegeben
- Die Anfrage des Benutzers entspricht der Funktionalität eines registrierten Skills

**Nicht geeignet für:**
- Integrierte CLI-Befehle (z.B. `/help`, `/clear`)
- Bereits laufende Skills
- Skill-Namen, die nicht in der Liste verfügbarer Skills stehen

## Hinweise

- Nach dem Aufruf wird der Skill zu einem vollständigen Prompt expandiert
- Unterstützt vollqualifizierte Namen (z.B. `ms-office-suite:pdf`)
- Die Liste verfügbarer Skills wird in system-reminder-Nachrichten bereitgestellt
- Wenn ein `<command-name>`-Tag sichtbar ist, bedeutet dies, dass der Skill bereits geladen ist – direkt ausführen statt dieses Tool erneut aufzurufen
- Einen Skill nicht erwähnen, ohne das Tool tatsächlich aufzurufen

## Bedeutung in cc-viewer

Skill-Aufrufe erscheinen im Anfrage-Log als `tool_use` Content Block. Der nach der Skill-Expansion generierte Prompt beeinflusst den System-Prompt oder Nachrichteninhalt nachfolgender Anfragen.

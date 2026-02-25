# WebFetch

## Definition

Ruft den Inhalt einer angegebenen URL ab, konvertiert HTML in Markdown und verarbeitet den Inhalt mit einem KI-Modell basierend auf dem Prompt.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `url` | string (URI) | Ja | Die vollständige abzurufende URL |
| `prompt` | string | Ja | Beschreibt, welche Informationen von der Seite extrahiert werden sollen |

## Anwendungsfälle

**Geeignet für:**
- Inhalte öffentlicher Webseiten abrufen
- Online-Dokumentation nachschlagen
- Bestimmte Informationen aus Webseiten extrahieren

**Nicht geeignet für:**
- URLs, die Authentifizierung erfordern (Google Docs, Confluence, Jira, GitHub usw.) – zuerst nach einem dedizierten MCP-Tool suchen
- GitHub-URLs – bevorzugt `gh` CLI verwenden

## Hinweise

- Die URL muss eine vollständige gültige URL sein
- HTTP wird automatisch auf HTTPS hochgestuft
- Bei sehr großen Inhalten können die Ergebnisse zusammengefasst werden
- Enthält einen sich selbst bereinigenden 15-Minuten-Cache
- Wenn die URL zu einem anderen Host weiterleitet, gibt das Tool die Weiterleitungs-URL zurück; eine erneute Anfrage mit der neuen URL ist erforderlich
- Wenn ein MCP-bereitgestelltes Web-Fetch-Tool verfügbar ist, dieses bevorzugt verwenden

## Bedeutung in cc-viewer

WebFetch-Aufrufe erscheinen im Anfrage-Log als `tool_use` / `tool_result` Content-Block-Paare. `tool_result` enthält die KI-verarbeitete Zusammenfassung des Webseiteninhalts.

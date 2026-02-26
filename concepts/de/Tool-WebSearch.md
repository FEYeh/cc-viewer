# WebSearch

## Definition

Führt eine Suchmaschinenabfrage durch und gibt Suchergebnisse zurück, um aktuelle Informationen zu erhalten.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `query` | string | Ja | Suchanfrage (mindestens 2 Zeichen) |
| `allowed_domains` | string[] | Nein | Nur Ergebnisse von diesen Domains einschließen |
| `blocked_domains` | string[] | Nein | Ergebnisse von diesen Domains ausschließen |

## Anwendungsfälle

**Geeignet für:**
- Aktuelle Informationen abrufen, die über den Wissensstand des Modells hinausgehen
- Aktuelle Ereignisse und neueste Daten finden
- Neueste technische Dokumentation suchen

## Hinweise

- Suchergebnisse werden im Markdown-Hyperlink-Format zurückgegeben
- Nach der Verwendung muss am Ende der Antwort ein "Sources:"-Abschnitt mit den relevanten URLs angefügt werden
- Unterstützt Domain-Filterung (einschließen/ausschließen)
- In Suchanfragen sollte das aktuelle Jahr verwendet werden
- Nur in den USA verfügbar

## Bedeutung in cc-viewer

WebSearch-Aufrufe erscheinen im Anfrage-Log als `tool_use` / `tool_result` Content-Block-Paare. `tool_result` enthält die Liste der Suchergebnisse.

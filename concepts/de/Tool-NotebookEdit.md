# NotebookEdit

## Definition

Ersetzt, fügt ein oder löscht bestimmte Zellen in einem Jupyter Notebook (.ipynb-Datei).

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `notebook_path` | string | Ja | Absoluter Pfad der Notebook-Datei |
| `new_source` | string | Ja | Neuer Inhalt der Zelle |
| `cell_id` | string | Nein | ID der zu bearbeitenden Zelle. Im Einfügemodus wird die neue Zelle nach dieser ID eingefügt |
| `cell_type` | enum | Nein | Zellentyp: `code` oder `markdown`. Im Einfügemodus erforderlich |
| `edit_mode` | enum | Nein | Bearbeitungsmodus: `replace` (Standard), `insert`, `delete` |

## Anwendungsfälle

**Geeignet für:**
- Code- oder Markdown-Zellen in Jupyter Notebooks ändern
- Neue Zellen zum Notebook hinzufügen
- Zellen aus dem Notebook löschen

## Hinweise

- `cell_number` ist 0-indiziert
- `insert`-Modus fügt eine neue Zelle an der angegebenen Position ein
- `delete`-Modus löscht die Zelle an der angegebenen Position
- Der Pfad muss ein absoluter Pfad sein

## Bedeutung in cc-viewer

NotebookEdit-Aufrufe erscheinen im Anfrage-Log als `tool_use` Content Block und zeichnen die konkreten Änderungsoperationen am Notebook auf.

# Edit

## Definition

Bearbeitet Dateien durch exakte Zeichenkettenersetzung. Ersetzt `old_string` in der Datei durch `new_string`.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `file_path` | string | Ja | Absoluter Pfad der zu ändernden Datei |
| `old_string` | string | Ja | Der zu ersetzende Originaltext |
| `new_string` | string | Ja | Der neue Ersetzungstext (muss sich von old_string unterscheiden) |
| `replace_all` | boolean | Nein | Ob alle Vorkommen ersetzt werden sollen, Standard `false` |

## Anwendungsfälle

**Geeignet für:**
- Ändern bestimmter Codeabschnitte in vorhandenen Dateien
- Bugfixes, Logik-Updates
- Variablen umbenennen (mit `replace_all: true`)
- Jedes Szenario, das präzise Dateiänderungen erfordert

**Nicht geeignet für:**
- Neue Dateien erstellen – dafür Write verwenden
- Umfangreiche Neuschreibungen – möglicherweise Write zum Überschreiben der gesamten Datei erforderlich

## Hinweise

- Vor der Verwendung muss die Datei über Read gelesen worden sein, sonst tritt ein Fehler auf
- `old_string` muss in der Datei eindeutig sein, sonst schlägt die Bearbeitung fehl. Bei Nicht-Eindeutigkeit mehr Kontext angeben oder `replace_all` verwenden
- Beim Bearbeiten von Text muss die ursprüngliche Einrückung (Tab/Leerzeichen) beibehalten werden; das Zeilennummernpräfix der Read-Ausgabe nicht einschließen
- Vorhandene Dateien bearbeiten hat Vorrang vor dem Erstellen neuer Dateien
- `new_string` muss sich von `old_string` unterscheiden

## Bedeutung in cc-viewer

Edit-Aufrufe erscheinen im Anfrage-Log als `tool_use` Content Block, dessen `input` `old_string` und `new_string` enthält und zur Nachverfolgung der Dateiänderungen des Modells verwendet werden kann.

# Read

## Definition

Liest Dateiinhalte aus dem lokalen Dateisystem. Unterstützt Textdateien, Bilder, PDF und Jupyter Notebooks.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `file_path` | string | Ja | Absoluter Pfad der Datei |
| `offset` | number | Nein | Startzeilennummer (für abschnittsweises Lesen großer Dateien) |
| `limit` | number | Nein | Anzahl zu lesender Zeilen (für abschnittsweises Lesen großer Dateien) |
| `pages` | string | Nein | PDF-Seitenbereich (z.B. "1-5", "3", "10-20"), nur für PDF |

## Anwendungsfälle

**Geeignet für:**
- Codedateien, Konfigurationsdateien und andere Textdateien lesen
- Bilddateien anzeigen (Claude ist ein multimodales Modell)
- PDF-Dokumente lesen
- Jupyter Notebooks lesen (gibt alle Zellen mit Ausgaben zurück)
- Mehrere Dateien parallel lesen, um Kontext zu erhalten

**Nicht geeignet für:**
- Verzeichnisse lesen – dafür den `ls`-Befehl in Bash verwenden
- Offene Codebasis-Erkundung – dafür Task (Explore-Typ) verwenden

## Hinweise

- Der Pfad muss ein absoluter Pfad sein, kein relativer Pfad
- Standardmäßig werden die ersten 2000 Zeilen der Datei gelesen
- Zeilen mit mehr als 2000 Zeichen werden abgeschnitten
- Die Ausgabe verwendet das `cat -n`-Format, Zeilennummern beginnen bei 1
- Große PDFs (über 10 Seiten) erfordern den `pages`-Parameter, maximal 20 Seiten pro Aufruf
- Das Lesen einer nicht existierenden Datei gibt einen Fehler zurück (kein Absturz)
- Mehrere Read-Aufrufe können in einer einzelnen Nachricht parallel ausgeführt werden

## Bedeutung in cc-viewer

Read-Aufrufe erscheinen im Anfrage-Log als `tool_use` (Aufruf) und `tool_result` (zurückgegebener Inhalt) Content-Block-Paare. `tool_result` enthält den tatsächlichen Dateiinhalt und kann zur Analyse verwendet werden, welche Dateien das Modell gelesen hat.

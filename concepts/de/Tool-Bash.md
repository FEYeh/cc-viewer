# Bash

## Definition

Führt Shell-Befehle aus, mit optionaler Timeout-Einstellung. Das Arbeitsverzeichnis bleibt zwischen Befehlen bestehen, der Shell-Zustand (Umgebungsvariablen usw.) jedoch nicht.

## Parameter

| Parameter | Typ | Erforderlich | Beschreibung |
|-----------|-----|--------------|--------------|
| `command` | string | Ja | Der auszuführende Bash-Befehl |
| `description` | string | Nein | Kurze Beschreibung des Befehls |
| `timeout` | number | Nein | Timeout in Millisekunden, maximal 600000, Standard 120000 |
| `run_in_background` | boolean | Nein | Ob im Hintergrund ausgeführt werden soll |

## Anwendungsfälle

**Geeignet für:**
- Git-Operationen (commit, push, branch usw.)
- npm/yarn und andere Paketverwaltungsbefehle
- Docker-Operationen
- Kompilierungs- und Build-Befehle
- Verzeichnisinhalte auflisten (`ls`)
- Andere Systembefehle, die Shell-Ausführung erfordern

**Nicht geeignet für:**
- Dateien lesen – dafür Read verwenden
- Dateinamen suchen – dafür Glob verwenden
- Dateiinhalte suchen – dafür Grep verwenden
- Dateien bearbeiten – dafür Edit verwenden
- Dateien schreiben – dafür Write verwenden
- Informationen an den Benutzer ausgeben – direkt im Antworttext ausgeben
- Lang laufende Prozesse (Dev-Server, Watch-Modus) – der Benutzer sollte diese manuell starten

## Hinweise

- Pfade mit Leerzeichen müssen in doppelte Anführungszeichen eingeschlossen werden
- Ausgaben über 30.000 Zeichen werden abgeschnitten
- Im Hintergrund laufende Befehle liefern Ergebnisse über TaskOutput
- Verwenden Sie möglichst absolute Pfade und vermeiden Sie `cd`
- Unabhängige Befehle können parallel in mehreren Bash-Aufrufen ausgeführt werden
- Abhängige Befehle werden mit `&&` verkettet
- Die Shell-Umgebung wird aus dem Benutzerprofil (bash oder zsh) initialisiert

## Bedeutung in cc-viewer

Bash-Aufrufe erscheinen im Anfrage-Log als `tool_use` (enthält den Befehl) und `tool_result` (enthält die Ausgabe) Content-Block-Paare. Die Befehlsausgabe kann zur Analyse des Modellverhaltens verwendet werden.

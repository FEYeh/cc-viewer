# EnterPlanMode

## Definition

Schaltet Claude Code in den Planungsmodus um, um vor der Implementierung die Codebasis zu erkunden und einen Plan zu entwerfen.

## Parameter

Keine Parameter.

## Anwendungsfälle

**Geeignet für:**
- Neue Feature-Implementierung – erfordert Architekturentscheidungen
- Mehrere mögliche Ansätze – Benutzerauswahl erforderlich
- Codeänderungen beeinflussen bestehendes Verhalten oder Struktur
- Änderungen an mehreren Dateien – möglicherweise 2–3 oder mehr Dateien betroffen
- Unklare Anforderungen – erst erkunden, dann Umfang verstehen
- Benutzerpräferenzen sind wichtig – die Implementierung kann mehrere sinnvolle Richtungen haben

**Nicht geeignet für:**
- Einzeilige oder wenige Zeilen umfassende Korrekturen (Tippfehler, offensichtliche Bugs)
- Der Benutzer hat sehr spezifische Anweisungen gegeben
- Reine Recherche-/Erkundungsaufgaben – dafür Task (Explore-Typ) verwenden

## Verhalten im Planungsmodus

Nach dem Eintritt in den Planungsmodus wird Claude Code:
1. Mit Glob, Grep, Read Tools die Codebasis eingehend erkunden
2. Bestehende Muster und Architektur verstehen
3. Einen Implementierungsplan entwerfen
4. Den Plan dem Benutzer zur Genehmigung vorlegen
5. Bei Bedarf AskUserQuestion zur Klärung verwenden
6. Nach Fertigstellung des Plans über ExitPlanMode den Modus verlassen

## Hinweise

- Dieses Tool erfordert die Zustimmung des Benutzers zum Eintritt in den Planungsmodus
- Im Zweifelsfall lieber planen – frühzeitige Abstimmung ist besser als Nacharbeit

## Bedeutung in cc-viewer

EnterPlanMode-Aufrufe erscheinen im Anfrage-Log als `tool_use` Content Block. Die Anfragesequenz nach dem Eintritt in den Planungsmodus besteht typischerweise hauptsächlich aus explorativen Tool-Aufrufen (Glob, Grep, Read), bis ExitPlanMode aufgerufen wird.

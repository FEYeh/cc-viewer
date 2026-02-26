# MainAgent

## Definition

MainAgent ist die Hauptanfragekette von Claude Code im Nicht-Agent-Team-Modus. Jede Interaktion eines Benutzers mit Claude Code erzeugt eine Reihe von API-Anfragen, wobei die MainAgent-Anfragen die Kern-Gesprächskette bilden – sie tragen den vollständigen System-Prompt, Tool-Definitionen und Nachrichtenverlauf.

## Erkennung

In cc-viewer wird MainAgent durch `req.mainAgent === true` identifiziert und von `interceptor.js` beim Abfangen der Anfrage automatisch markiert.

Erkennungsbedingungen (alle müssen erfüllt sein):
- Der Request-Body enthält das `system`-Feld (System-Prompt)
- Der Request-Body enthält das `tools`-Array (Tool-Definitionen)
- Der System-Prompt enthält den charakteristischen Text "Claude Code"

## Unterschied zu SubAgent

| Merkmal | MainAgent | SubAgent |
|---------|-----------|----------|
| System-Prompt | Vollständiger Claude Code Haupt-Prompt | Kompakter aufgabenspezifischer Prompt |
| tools-Array | Enthält alle verfügbaren Tools | Enthält normalerweise nur die wenigen für die Aufgabe benötigten Tools |
| Nachrichtenverlauf | Akkumuliert den vollständigen Gesprächskontext | Enthält nur aufgabenbezogene Nachrichten |
| Cache-Verhalten | Hat Prompt Caching (5 Minuten TTL) | Normalerweise kein Cache oder kleinerer Cache |

## Bedeutung in cc-viewer

- **Cache-Tracking**: Der Prompt-Caching-Status von MainAgent-Anfragen wirkt sich direkt auf die Kosten aus. Durch Überwachung des Verhältnisses von `cache_creation_input_tokens` zu `cache_read_input_tokens` kann die Cache-Trefferquote bestimmt werden
- **Cache-Miss-Analyse**: Wenn MainAgent-Anfragen viele Cache Creations (statt Cache Reads) aufweisen, bedeutet dies, dass der Cache verloren ging und neu aufgebaut wurde – cc-viewer markiert diese Anfragen mit einem roten Punkt-Indikator
- **Hauptketten-Analyse**: Die MainAgent-Anfragesequenz spiegelt den vollständigen Interaktionsprozess zwischen Benutzer und Claude Code wider und ist die Kerndatenquelle für die Analyse des Sitzungsverhaltens
- **Sitzungsrekonstruktion**: cc-viewer rekonstruiert die Gesprächsansicht (Chat Mode) anhand des Nachrichtenverlaufs der MainAgent-Anfragen

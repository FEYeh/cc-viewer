# Grep

## Definizione

Potente strumento di ricerca nel contenuto basato su ripgrep. Supporta espressioni regolari, filtro per tipo di file e diverse modalità di output.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `pattern` | string | Sì | Pattern di ricerca con espressione regolare |
| `path` | string | No | Percorso di ricerca (file o directory), predefinita la directory di lavoro corrente |
| `glob` | string | No | Filtro per nome file (es. `*.js`, `*.{ts,tsx}`) |
| `type` | string | No | Filtro per tipo di file (es. `js`, `py`, `rust`), più efficiente di glob |
| `output_mode` | enum | No | Modalità di output: `files_with_matches` (predefinita), `content`, `count` |
| `-i` | boolean | No | Ricerca senza distinzione maiuscole/minuscole |
| `-n` | boolean | No | Mostra numeri di riga (solo modalità content), predefinito true |
| `-A` | number | No | Numero di righe da mostrare dopo la corrispondenza |
| `-B` | number | No | Numero di righe da mostrare prima della corrispondenza |
| `-C` / `context` | number | No | Numero di righe da mostrare prima e dopo la corrispondenza |
| `head_limit` | number | No | Limita il numero di voci nell'output, predefinito 0 (illimitato) |
| `offset` | number | No | Salta i primi N risultati |
| `multiline` | boolean | No | Abilita la modalità di corrispondenza multiriga, predefinito false |

## Scenari d'uso

**Adatto per:**
- Cercare stringhe o pattern specifici nel codebase
- Trovare dove vengono usate funzioni/variabili
- Filtrare i risultati di ricerca per tipo di file
- Contare il numero di corrispondenze

**Non adatto per:**
- Cercare file per nome — usare Glob
- Esplorazione aperta che richiede più cicli di ricerca — usare Task (tipo Explore)

## Note

- Usa la sintassi ripgrep (non grep), i caratteri speciali come le parentesi graffe devono essere escapati
- La modalità `files_with_matches` restituisce solo i percorsi dei file, la più efficiente
- La modalità `content` restituisce il contenuto delle righe corrispondenti, supporta righe di contesto
- La corrispondenza multiriga richiede l'impostazione `multiline: true`
- Usare sempre lo strumento Grep anziché i comandi `grep` o `rg` in Bash

## Significato in cc-viewer

Le chiamate Grep appaiono nei log delle richieste come coppie di content block `tool_use` / `tool_result`. Il `tool_result` contiene i risultati della ricerca.

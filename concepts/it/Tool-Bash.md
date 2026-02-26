# Bash

## Definizione

Esegue comandi shell, con supporto opzionale per il timeout. La directory di lavoro persiste tra i comandi, ma lo stato della shell (variabili d'ambiente, ecc.) non persiste.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `command` | string | Sì | Il comando bash da eseguire |
| `description` | string | No | Breve descrizione del comando |
| `timeout` | number | No | Timeout in millisecondi, massimo 600000, predefinito 120000 |
| `run_in_background` | boolean | No | Se eseguire in background |

## Scenari d'uso

**Adatto per:**
- Operazioni git (commit, push, branch, ecc.)
- Comandi di gestione pacchetti npm/yarn
- Operazioni docker
- Comandi di compilazione e build
- Elencare il contenuto delle directory (`ls`)
- Altri comandi di sistema che richiedono l'esecuzione shell

**Non adatto per:**
- Leggere file — usare Read
- Cercare nomi di file — usare Glob
- Cercare contenuto di file — usare Grep
- Modificare file — usare Edit
- Scrivere file — usare Write
- Mostrare informazioni all'utente — scrivere direttamente nel testo della risposta
- Processi a lunga esecuzione (dev server, modalità watch) — consigliare all'utente di eseguirli manualmente

## Note

- I percorsi con spazi devono essere racchiusi tra virgolette doppie
- L'output oltre 30000 caratteri viene troncato
- I comandi in background ottengono i risultati tramite TaskOutput
- Usare preferibilmente percorsi assoluti, evitare `cd`
- I comandi indipendenti possono essere chiamati in parallelo con più Bash
- I comandi con dipendenze vanno concatenati con `&&`
- L'ambiente shell viene inizializzato dal profilo dell'utente (bash o zsh)

## Significato in cc-viewer

Le chiamate Bash appaiono nei log delle richieste come coppie di content block `tool_use` (contenente il comando) e `tool_result` (contenente l'output). L'output dell'esecuzione del comando può essere usato per analizzare il comportamento operativo del modello.

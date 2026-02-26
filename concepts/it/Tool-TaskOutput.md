# TaskOutput

## Definizione

Ottiene l'output di un task in background in esecuzione o completato. Applicabile a shell in background, agent asincroni e sessioni remote.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `task_id` | string | Sì | ID del task |
| `block` | boolean | Sì | Se attendere in modo bloccante il completamento del task, predefinito `true` |
| `timeout` | number | Sì | Tempo massimo di attesa (millisecondi), predefinito 30000, massimo 600000 |

## Scenari d'uso

**Adatto per:**
- Controllare i progressi di un agent in background avviato tramite Task (`run_in_background: true`)
- Ottenere i risultati dell'esecuzione di comandi Bash in background
- Attendere il completamento di un task asincrono e ottenerne l'output

**Non adatto per:**
- Task in primo piano — i task in primo piano restituiscono direttamente i risultati, questo strumento non è necessario

## Note

- `block: true` blocca fino al completamento del task o al timeout
- `block: false` per un controllo non bloccante dello stato corrente
- L'ID del task può essere trovato tramite il comando `/tasks`
- Applicabile a tutti i tipi di task: shell in background, agent asincroni, sessioni remote

## Significato in cc-viewer

La chiamata TaskOutput non genera richieste API, è un'operazione interna di gestione dei task di Claude Code e non appare nei log delle richieste.

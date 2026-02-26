# TaskStop

## Definizione

Ferma un task in background in esecuzione.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `task_id` | string | No | ID del task in background da fermare |
| `shell_id` | string | No | Deprecato, usare `task_id` al suo posto |

## Scenari d'uso

**Adatto per:**
- Terminare task a lunga esecuzione non più necessari
- Annullare task in background avviati per errore

## Note

- Restituisce uno stato di successo o fallimento
- Il parametro `shell_id` è deprecato, usare `task_id`

## Significato in cc-viewer

La chiamata TaskStop non genera richieste API, è un'operazione interna di gestione dei task di Claude Code.

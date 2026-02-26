# TaskGet

## Definizione

Ottiene i dettagli completi di un task tramite il suo ID.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `taskId` | string | Sì | ID del task da ottenere |

## Contenuto restituito

- `subject` — Titolo del task
- `description` — Requisiti dettagliati e contesto
- `status` — Stato: `pending`, `in_progress` o `completed`
- `blocks` — Lista dei task bloccati da questo task
- `blockedBy` — Lista dei task prerequisiti che bloccano questo task

## Scenari d'uso

**Adatto per:**
- Ottenere la descrizione completa e il contesto di un task prima di iniziare il lavoro
- Comprendere le dipendenze del task
- Ottenere i requisiti completi dopo essere stati assegnati a un task

## Note

- Dopo aver ottenuto il task, verificare che la lista `blockedBy` sia vuota prima di iniziare il lavoro
- Usare TaskList per visualizzare il riepilogo di tutti i task

## Significato in cc-viewer

TaskGet è un'operazione interna di gestione dei task, non genera richieste API indipendenti.

# TaskList

## Definizione

Elenca tutti i task nella lista dei task, per visualizzare i progressi complessivi e il lavoro disponibile.

## Parametri

Nessun parametro.

## Contenuto restituito

Informazioni di riepilogo per ogni task:
- `id` — Identificatore del task
- `subject` — Breve descrizione
- `status` — Stato: `pending`, `in_progress` o `completed`
- `owner` — Responsabile (agent ID), vuoto se non assegnato
- `blockedBy` — Lista degli ID dei task non completati che bloccano questo task

## Scenari d'uso

**Adatto per:**
- Vedere quali task sono disponibili (stato pending, senza owner, non bloccati)
- Controllare i progressi complessivi del progetto
- Trovare task bloccati
- Trovare il prossimo task dopo averne completato uno

## Note

- Elaborare i task preferibilmente in ordine di ID (ID più basso per primo), poiché i task precedenti forniscono tipicamente contesto per quelli successivi
- I task con `blockedBy` non possono essere presi in carico finché le dipendenze non sono risolte
- Usare TaskGet per ottenere i dettagli completi di un task specifico

## Significato in cc-viewer

TaskList è un'operazione interna di gestione dei task, non genera richieste API indipendenti.

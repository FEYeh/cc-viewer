# TaskUpdate

## Definizione

Aggiorna lo stato, il contenuto o le dipendenze di un task nella lista dei task.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `taskId` | string | Sì | ID del task da aggiornare |
| `status` | enum | No | Nuovo stato: `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | No | Nuovo titolo |
| `description` | string | No | Nuova descrizione |
| `activeForm` | string | No | Testo al presente progressivo mostrato durante l'esecuzione |
| `owner` | string | No | Nuovo responsabile del task (nome dell'agent) |
| `metadata` | object | No | Metadati da unire (impostare a null per eliminare una chiave) |
| `addBlocks` | string[] | No | Lista degli ID dei task bloccati da questo task |
| `addBlockedBy` | string[] | No | Lista degli ID dei task prerequisiti che bloccano questo task |

## Flusso degli stati

```
pending → in_progress → completed
```

`deleted` può essere raggiunto da qualsiasi stato e rimuove permanentemente il task.

## Scenari d'uso

**Adatto per:**
- Contrassegnare un task come `in_progress` quando si inizia il lavoro
- Contrassegnare un task come `completed` quando il lavoro è terminato
- Impostare le dipendenze tra i task
- Aggiornare il contenuto del task quando i requisiti cambiano

**Regole importanti:**
- Contrassegnare come `completed` solo quando il task è completamente terminato
- In caso di errori o blocchi, mantenere `in_progress`
- Non contrassegnare come `completed` in caso di test falliti, implementazione incompleta o errori non risolti

## Note

- Prima dell'aggiornamento, ottenere lo stato più recente del task tramite TaskGet per evitare dati obsoleti
- Dopo aver completato un task, chiamare TaskList per trovare il prossimo task disponibile

## Significato in cc-viewer

TaskUpdate è un'operazione interna di gestione dei task, non genera richieste API indipendenti.

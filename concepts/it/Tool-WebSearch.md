# WebSearch

## Definizione

Esegue una query su motore di ricerca, restituendo risultati di ricerca per ottenere informazioni aggiornate.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `query` | string | Sì | Query di ricerca (minimo 2 caratteri) |
| `allowed_domains` | string[] | No | Includi solo risultati da questi domini |
| `blocked_domains` | string[] | No | Escludi risultati da questi domini |

## Scenari d'uso

**Adatto per:**
- Ottenere informazioni aggiornate oltre la data di cutoff della conoscenza del modello
- Cercare eventi attuali e dati recenti
- Cercare la documentazione tecnica più recente

## Note

- I risultati di ricerca vengono restituiti in formato hyperlink markdown
- Dopo l'uso, è obbligatorio aggiungere una sezione "Sources:" alla fine della risposta, elencando gli URL pertinenti
- Supporta il filtro per dominio (inclusione/esclusione)
- Usare l'anno corrente nelle query di ricerca
- Disponibile solo negli Stati Uniti

## Significato in cc-viewer

Le chiamate WebSearch appaiono nei log delle richieste come coppie di content block `tool_use` / `tool_result`. Il `tool_result` contiene la lista dei risultati di ricerca.

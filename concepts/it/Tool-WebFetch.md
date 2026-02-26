# WebFetch

## Definizione

Recupera il contenuto di una pagina web dall'URL specificato, converte l'HTML in markdown e lo elabora con un modello AI in base al prompt.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `url` | string (URI) | Sì | URL completo da recuperare |
| `prompt` | string | Sì | Descrive quali informazioni estrarre dalla pagina |

## Scenari d'uso

**Adatto per:**
- Ottenere il contenuto di pagine web pubbliche
- Consultare documentazione online
- Estrarre informazioni specifiche da una pagina web

**Non adatto per:**
- URL che richiedono autenticazione (Google Docs, Confluence, Jira, GitHub, ecc.) — cercare prima uno strumento MCP dedicato
- URL di GitHub — preferire l'uso della CLI `gh`

## Note

- L'URL deve essere un URL valido e completo
- HTTP viene automaticamente aggiornato a HTTPS
- I risultati possono essere riassunti se il contenuto è troppo grande
- Include una cache auto-pulente di 15 minuti
- Quando l'URL reindirizza a un host diverso, lo strumento restituisce l'URL di reindirizzamento e occorre effettuare una nuova richiesta con il nuovo URL
- Se è disponibile uno strumento web fetch fornito da MCP, preferire quello

## Significato in cc-viewer

Le chiamate WebFetch appaiono nei log delle richieste come coppie di content block `tool_use` / `tool_result`. Il `tool_result` contiene il riepilogo del contenuto web elaborato dall'AI.

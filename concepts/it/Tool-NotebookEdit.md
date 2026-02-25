# NotebookEdit

## Definizione

Sostituisce, inserisce o elimina celle specifiche in un Jupyter notebook (file .ipynb).

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `notebook_path` | string | Sì | Percorso assoluto del file notebook |
| `new_source` | string | Sì | Nuovo contenuto della cella |
| `cell_id` | string | No | ID della cella da modificare. In modalità inserimento, la nuova cella viene inserita dopo questo ID |
| `cell_type` | enum | No | Tipo di cella: `code` o `markdown`. Obbligatorio in modalità inserimento |
| `edit_mode` | enum | No | Modalità di modifica: `replace` (predefinita), `insert`, `delete` |

## Scenari d'uso

**Adatto per:**
- Modificare celle di codice o markdown in un Jupyter notebook
- Aggiungere nuove celle a un notebook
- Eliminare celle da un notebook

## Note

- `cell_number` è indicizzato a partire da 0
- La modalità `insert` inserisce una nuova cella nella posizione specificata
- La modalità `delete` elimina la cella nella posizione specificata
- Il percorso deve essere assoluto

## Significato in cc-viewer

Le chiamate NotebookEdit appaiono nei log delle richieste come content block `tool_use`, che registrano le operazioni specifiche di modifica sul notebook.

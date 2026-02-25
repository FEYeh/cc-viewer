# Edit

## Definizione

Modifica file tramite sostituzione esatta di stringhe. Sostituisce `old_string` con `new_string` nel file.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `file_path` | string | Sì | Percorso assoluto del file da modificare |
| `old_string` | string | Sì | Testo originale da sostituire |
| `new_string` | string | Sì | Nuovo testo sostitutivo (deve essere diverso da old_string) |
| `replace_all` | boolean | No | Se sostituire tutte le occorrenze, predefinito `false` |

## Scenari d'uso

**Adatto per:**
- Modificare sezioni specifiche di codice in file esistenti
- Correggere bug, aggiornare la logica
- Rinominare variabili (con `replace_all: true`)
- Qualsiasi scenario che richieda la modifica precisa del contenuto di un file

**Non adatto per:**
- Creare nuovi file — usare Write
- Riscritture su larga scala — potrebbe essere necessario Write per sovrascrivere l'intero file

## Note

- Prima dell'uso è necessario aver letto il file tramite Read, altrimenti si verifica un errore
- `old_string` deve essere unico nel file, altrimenti la modifica fallisce. Se non è unico, fornire più contesto per renderlo unico, oppure usare `replace_all`
- Quando si modifica il testo, mantenere l'indentazione originale (tab/spazi), non includere il prefisso del numero di riga dall'output di Read
- Preferire la modifica dei file esistenti anziché crearne di nuovi
- `new_string` deve essere diverso da `old_string`

## Significato in cc-viewer

Le chiamate Edit appaiono nei log delle richieste come content block `tool_use`, il cui `input` contiene `old_string` e `new_string`, utili per tracciare quali modifiche il modello ha apportato ai file.

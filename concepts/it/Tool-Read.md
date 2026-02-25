# Read

## Definizione

Legge il contenuto di un file dal file system locale. Supporta file di testo, immagini, PDF e Jupyter notebook.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `file_path` | string | Sì | Percorso assoluto del file |
| `offset` | number | No | Numero di riga iniziale (per la lettura segmentata di file grandi) |
| `limit` | number | No | Numero di righe da leggere (per la lettura segmentata di file grandi) |
| `pages` | string | No | Intervallo di pagine PDF (es. "1-5", "3", "10-20"), applicabile solo ai PDF |

## Scenari d'uso

**Adatto per:**
- Leggere file di codice, file di configurazione e altri file di testo
- Visualizzare file immagine (Claude è un modello multimodale)
- Leggere documenti PDF
- Leggere Jupyter notebook (restituisce tutte le celle con i relativi output)
- Leggere più file in parallelo per ottenere contesto

**Non adatto per:**
- Leggere directory — usare il comando `ls` di Bash
- Esplorazione aperta del codebase — usare Task (tipo Explore)

## Note

- Il percorso deve essere assoluto, non relativo
- Per impostazione predefinita legge le prime 2000 righe del file
- Le righe che superano i 2000 caratteri vengono troncate
- L'output usa il formato `cat -n`, con numeri di riga a partire da 1
- Per PDF grandi (oltre 10 pagine) è necessario specificare il parametro `pages`, massimo 20 pagine per volta
- La lettura di un file inesistente restituisce un errore (non causa un crash)
- È possibile chiamare più Read in parallelo in un singolo messaggio

## Significato in cc-viewer

Le chiamate Read appaiono nei log delle richieste come coppie di content block `tool_use` (chiamata) e `tool_result` (contenuto restituito). Il `tool_result` contiene il contenuto effettivo del file, utile per analizzare quali file il modello ha letto.

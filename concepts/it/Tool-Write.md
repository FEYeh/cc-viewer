# Write

## Definizione

Scrive contenuto nel file system locale. Se il file esiste già, viene sovrascritto.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `file_path` | string | Sì | Percorso assoluto del file (deve essere assoluto) |
| `content` | string | Sì | Contenuto da scrivere |

## Scenari d'uso

**Adatto per:**
- Creare nuovi file
- Quando è necessario riscrivere completamente il contenuto di un file

**Non adatto per:**
- Modificare contenuto parziale di un file — usare Edit
- Non creare proattivamente file di documentazione (*.md) o README, a meno che l'utente non lo richieda esplicitamente

## Note

- Se il file di destinazione esiste già, è necessario prima leggerlo tramite Read, altrimenti l'operazione fallisce
- Sovrascrive l'intero contenuto del file esistente
- Preferire Edit per modificare file esistenti, Write è solo per creare nuovi file o riscritture complete

## Significato in cc-viewer

Le chiamate Write appaiono nei log delle richieste come content block `tool_use`, il cui `input.content` contiene il contenuto completo scritto.

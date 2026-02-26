# Skill

## Definizione

Esegue una skill (abilità) nella conversazione principale. Le skill sono capacità specializzate che l'utente può invocare tramite slash command (es. `/commit`, `/review-pr`).

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `skill` | string | Sì | Nome della skill (es. "commit", "review-pr", "pdf") |
| `args` | string | No | Argomenti della skill |

## Scenari d'uso

**Adatto per:**
- L'utente ha inserito uno slash command nel formato `/<skill-name>`
- La richiesta dell'utente corrisponde alla funzionalità di una skill registrata

**Non adatto per:**
- Comandi CLI integrati (es. `/help`, `/clear`)
- Una skill già in esecuzione
- Nomi di skill non presenti nella lista delle skill disponibili

## Note

- Dopo l'invocazione, la skill viene espansa in un prompt completo
- Supporta nomi completamente qualificati (es. `ms-office-suite:pdf`)
- La lista delle skill disponibili è fornita nei messaggi system-reminder
- Quando si vede un tag `<command-name>`, significa che la skill è stata caricata e va eseguita direttamente senza richiamare nuovamente questo strumento
- Non menzionare una skill senza aver effettivamente invocato lo strumento

## Significato in cc-viewer

Le chiamate Skill appaiono nei log delle richieste come content block `tool_use`. Il prompt espanso dalla skill influenza il system prompt o il contenuto dei messaggi delle richieste successive.

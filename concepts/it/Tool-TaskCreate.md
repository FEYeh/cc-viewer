# TaskCreate

## Definizione

Crea una voce strutturata nella lista dei task, per tracciare i progressi, organizzare task complessi e mostrare all'utente l'avanzamento del lavoro.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `subject` | string | Sì | Breve titolo del task, in forma imperativa (es. "Fix authentication bug") |
| `description` | string | Sì | Descrizione dettagliata, inclusi contesto e criteri di accettazione |
| `activeForm` | string | No | Testo al presente progressivo mostrato durante l'esecuzione (es. "Fixing authentication bug") |
| `metadata` | object | No | Metadati arbitrari allegati al task |

## Scenari d'uso

**Adatto per:**
- Task complessi multi-step (più di 3 step)
- L'utente ha fornito più elementi da fare
- Tracciamento del lavoro in modalità pianificazione
- L'utente richiede esplicitamente l'uso di una lista todo

**Non adatto per:**
- Un singolo task semplice
- Operazioni semplici con meno di 3 step
- Conversazioni pure o richieste informative

## Note

- Tutti i task appena creati hanno stato iniziale `pending`
- `subject` usa la forma imperativa ("Run tests"), `activeForm` usa il presente progressivo ("Running tests")
- Dopo la creazione, è possibile impostare le dipendenze (blocks/blockedBy) tramite TaskUpdate
- Prima di creare, verificare con TaskList se esistono task duplicati

## Significato in cc-viewer

TaskCreate è un'operazione interna di gestione dei task di Claude Code, non genera richieste API indipendenti. Tuttavia, nella Chat Mode è possibile vedere il content block tool_use in cui il modello invoca questo strumento.

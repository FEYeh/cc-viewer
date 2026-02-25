# ExitPlanMode

## Definizione

Esce dalla modalità pianificazione e sottopone il piano all'approvazione dell'utente. Il contenuto del piano viene letto dal file di piano scritto in precedenza.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `allowedPrompts` | array | No | Lista di descrizioni dei permessi necessari per implementare il piano |

Ogni elemento nell'array `allowedPrompts`:

| Campo | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `tool` | enum | Sì | Lo strumento applicabile, attualmente supporta solo `Bash` |
| `prompt` | string | Sì | Descrizione semantica dell'operazione (es. "run tests", "install dependencies") |

## Scenari d'uso

**Adatto per:**
- In modalità pianificazione, il piano è completato e pronto per l'approvazione dell'utente
- Solo per task di implementazione che richiedono la scrittura di codice

**Non adatto per:**
- Task puramente di ricerca/esplorazione — non è necessario uscire dalla modalità pianificazione
- Voler chiedere all'utente "il piano va bene?" — questa è esattamente la funzione di questo strumento, non usare AskUserQuestion per chiederlo

## Note

- Questo strumento non accetta il contenuto del piano come parametro — lo legge dal file di piano scritto in precedenza
- L'utente vedrà il contenuto del file di piano per l'approvazione
- Non usare AskUserQuestion per chiedere "il piano va bene?" prima di chiamare questo strumento, sarebbe ridondante
- Non menzionare il "piano" nelle domande, poiché l'utente non può vedere il contenuto del piano prima di ExitPlanMode

## Significato in cc-viewer

La chiamata ExitPlanMode segna la fine della fase di pianificazione. Nei log delle richieste, le richieste successive a questa chiamata passano tipicamente a operazioni di implementazione (Edit, Write, Bash, ecc.).

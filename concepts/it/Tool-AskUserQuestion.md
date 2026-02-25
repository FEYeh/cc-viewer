# AskUserQuestion

## Definizione

Pone domande all'utente durante l'esecuzione, per ottenere chiarimenti, verificare ipotesi o richiedere decisioni.

## Parametri

| Parametro | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `questions` | array | Sì | Lista di domande (1-4 domande) |
| `answers` | object | No | Risposte raccolte dall'utente |
| `annotations` | object | No | Annotazioni per ogni domanda (es. note per l'anteprima delle selezioni) |
| `metadata` | object | No | Metadati per tracciamento e analisi |

Ogni oggetto `question`:

| Campo | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `question` | string | Sì | Testo completo della domanda, deve terminare con un punto interrogativo |
| `header` | string | Sì | Etichetta breve (massimo 12 caratteri), visualizzata come chip |
| `options` | array | Sì | 2-4 opzioni |
| `multiSelect` | boolean | Sì | Se è consentita la selezione multipla |

Ogni oggetto `option`:

| Campo | Tipo | Obbligatorio | Descrizione |
|------|------|------|------|
| `label` | string | Sì | Testo visualizzato dell'opzione (1-5 parole) |
| `description` | string | Sì | Descrizione dell'opzione |
| `markdown` | string | No | Contenuto di anteprima (per il confronto visivo di layout ASCII, frammenti di codice, ecc.) |

## Scenari d'uso

**Adatto per:**
- Raccogliere preferenze o requisiti dell'utente
- Chiarire istruzioni ambigue
- Ottenere decisioni durante l'implementazione
- Offrire all'utente scelte di direzione

**Non adatto per:**
- Chiedere "il piano va bene?" — usare ExitPlanMode

## Note

- L'utente può sempre selezionare "Other" per fornire un input personalizzato
- L'opzione consigliata va messa per prima, con "(Recommended)" alla fine della label
- L'anteprima `markdown` è supportata solo per domande a selezione singola
- Le opzioni con `markdown` passano a un layout affiancato
- In modalità pianificazione, viene usato per chiarire i requisiti prima di definire il piano

## Significato in cc-viewer

La chiamata AskUserQuestion appare nei log delle richieste come content block `tool_use`, contenente la definizione delle domande e delle opzioni. Le risposte dell'utente compaiono nella cronologia dei messaggi delle richieste successive.

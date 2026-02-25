# EnterPlanMode

## Definizione

Passa Claude Code alla modalità pianificazione, utilizzata per esplorare il codebase e progettare un piano prima dell'implementazione.

## Parametri

Nessun parametro.

## Scenari d'uso

**Adatto per:**
- Implementazione di nuove funzionalità — richiede decisioni architetturali
- Esistono più approcci possibili — richiede la scelta dell'utente
- Le modifiche al codice influenzano il comportamento o la struttura esistente
- Modifiche multi-file — potenzialmente coinvolgono 2-3 o più file
- Requisiti poco chiari — necessario esplorare prima di comprendere l'ambito
- Le preferenze dell'utente sono importanti — l'implementazione può avere più direzioni ragionevoli

**Non adatto per:**
- Correzioni di una o poche righe (errori di battitura, bug evidenti)
- L'utente ha fornito istruzioni molto specifiche
- Task puramente di ricerca/esplorazione — usare Task (tipo Explore)

## Comportamento in modalità pianificazione

Dopo l'ingresso in modalità pianificazione, Claude Code:
1. Usa gli strumenti Glob, Grep, Read per esplorare in profondità il codebase
2. Comprende i pattern e l'architettura esistenti
3. Progetta il piano di implementazione
4. Sottopone il piano all'approvazione dell'utente
5. Se necessario, usa AskUserQuestion per chiarimenti
6. Quando il piano è pronto, esce tramite ExitPlanMode

## Note

- Questo strumento richiede il consenso dell'utente per entrare in modalità pianificazione
- In caso di dubbio sulla necessità di pianificare, preferire la pianificazione — allinearsi in anticipo è meglio che rifare il lavoro

## Significato in cc-viewer

La chiamata EnterPlanMode appare nei log delle richieste come content block `tool_use`. Le richieste successive all'ingresso in modalità pianificazione sono tipicamente dominate da chiamate a strumenti esplorativi (Glob, Grep, Read), fino alla chiamata di ExitPlanMode.

# ExitPlanMode

## Definition

Forlader planlægningstilstand og indsender planen til brugerens godkendelse. Planens indhold læses fra den tidligere skrevne planfil.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `allowedPrompts` | array | Nej | Liste over tilladelsebeskrivelser nødvendige for at implementere planen |

Hvert element i `allowedPrompts`-arrayet:

| Felt | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `tool` | enum | Ja | Det gældende værktøj, understøtter i øjeblikket kun `Bash` |
| `prompt` | string | Ja | Semantisk beskrivelse af operationen (f.eks. "run tests", "install dependencies") |

## Brugsscenarier

**Egnet til:**
- I planlægningstilstand er planen færdig og klar til brugerens godkendelse
- Kun til implementeringsopgaver der kræver kodeskrivning

**Ikke egnet til:**
- Rene forsknings-/udforskningsopgaver — det er ikke nødvendigt at forlade planlægningstilstand
- At ville spørge brugeren "er planen OK?" — det er præcis dette værktøjs funktion, brug ikke AskUserQuestion til at spørge

## Bemærkninger

- Dette værktøj accepterer ikke planindhold som parameter — det læser fra den tidligere skrevne planfil
- Brugeren vil se planfilens indhold til godkendelse
- Brug ikke AskUserQuestion til at spørge "er planen OK?" før du kalder dette værktøj, det er overflødigt
- Nævn ikke "planen" i spørgsmål, da brugeren ikke kan se planindholdet før ExitPlanMode

## Betydning i cc-viewer

ExitPlanMode-kaldet markerer afslutningen af planlægningsfasen. I requestloggen skifter requests efter dette kald typisk til implementeringsoperationer (Edit, Write, Bash osv.).

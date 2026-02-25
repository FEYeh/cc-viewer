# TaskCreate

## Definition

Opretter en struktureret opgavelistepost til at spore fremskridt, organisere komplekse opgaver og vise brugeren arbejdets fremdrift.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `subject` | string | Ja | Kort opgavetitel i bydeform (f.eks. "Fix authentication bug") |
| `description` | string | Ja | Detaljeret beskrivelse inkl. kontekst og acceptkriterier |
| `activeForm` | string | Nej | Tekst i nutids-tillægsform vist under udførelse (f.eks. "Fixing authentication bug") |
| `metadata` | object | Nej | Vilkårlig metadata knyttet til opgaven |

## Brugsscenarier

**Egnet til:**
- Komplekse flertrinsopgaver (mere end 3 trin)
- Brugeren har givet flere gøremål
- Sporing af arbejde i planlægningstilstand
- Brugeren beder udtrykkeligt om en todo-liste

**Ikke egnet til:**
- En enkelt simpel opgave
- Simple operationer med færre end 3 trin
- Ren samtale eller informationsforespørgsler

## Bemærkninger

- Alle nyoprettede opgaver har startstatus `pending`
- `subject` bruger bydeform ("Run tests"), `activeForm` bruger nutids-tillægsform ("Running tests")
- Efter oprettelse kan afhængigheder (blocks/blockedBy) sættes via TaskUpdate
- Før oprettelse bør man tjekke med TaskList, om der findes duplikerede opgaver

## Betydning i cc-viewer

TaskCreate er en intern opgavestyringsoperation i Claude Code og genererer ikke selvstændige API-requests. Men i Chat Mode kan man se det tool_use-block, hvor modellen kalder dette værktøj.

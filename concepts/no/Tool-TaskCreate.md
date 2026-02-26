# TaskCreate

## Definisjon

Oppretter strukturerte oppgavelisteelementer for å spore fremdrift, organisere komplekse oppgaver og vise arbeidsfremdrift til brukeren.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `subject` | string | Ja | Kort oppgavetittel i imperativform (f.eks. "Fix authentication bug") |
| `description` | string | Ja | Detaljert beskrivelse med kontekst og akseptansekriterier |
| `activeForm` | string | Nei | Tekst i presens partisipp som vises under utførelse (f.eks. "Fixing authentication bug") |
| `metadata` | object | Nei | Vilkårlig metadata knyttet til oppgaven |

## Bruksscenarioer

**Egnet for bruk:**
- Komplekse flerstegsoppgaver (mer enn 3 steg)
- Brukeren har gitt flere gjøremål
- Spore arbeid i planleggingsmodus
- Brukeren ber eksplisitt om å bruke oppgaveliste

**Ikke egnet for bruk:**
- Enkelt, enkel oppgave
- Enkle operasjoner med 3 steg eller færre
- Ren samtale eller informasjonsforespørsel

## Merknader

- Alle nye oppgaver starter med status `pending`
- `subject` bruker imperativform ("Run tests"), `activeForm` bruker presens partisipp ("Running tests")
- Etter opprettelse kan avhengigheter (blocks/blockedBy) settes via TaskUpdate
- Før opprettelse bør TaskList kalles for å sjekke om det finnes duplikater

## Betydning i cc-viewer

TaskCreate er en intern oppgavebehandlingsoperasjon i Claude Code og produserer ikke en selvstendig API-forespørsel. Men i Chat Mode kan du se tool_use-blokken der modellen kaller dette verktøyet.

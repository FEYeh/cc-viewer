# ExitPlanMode

## Definisjon

Går ut av planleggingsmodus og sender planen til brukeren for godkjenning. Planinnholdet leses fra planfilen som ble skrevet tidligere.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `allowedPrompts` | array | Nei | Liste over tillatelsesbeskrivelser som kreves for implementeringsplanen |

Hvert element i `allowedPrompts`-arrayen:

| Felt | Type | Påkrevd | Beskrivelse |
|------|------|---------|-------------|
| `tool` | enum | Ja | Gjeldende verktøy, for øyeblikket støttes kun `Bash` |
| `prompt` | string | Ja | Semantisk beskrivelse av operasjonen (f.eks. "run tests", "install dependencies") |

## Bruksscenarioer

**Egnet for bruk:**
- Planen er ferdig i planleggingsmodus og klar til å sendes for brukergodkjenning
- Brukes kun for implementeringsoppgaver som krever kodeskriving

**Ikke egnet for bruk:**
- Rene forsknings-/utforskningsoppgaver — trenger ikke å gå ut av planleggingsmodus
- Spørre "er planen OK?" — dette er nettopp funksjonen til dette verktøyet, ikke bruk AskUserQuestion for det

## Merknader

- Dette verktøyet aksepterer ikke planinnhold som parameter — det leser fra planfilen som ble skrevet tidligere
- Brukeren vil se innholdet i planfilen for godkjenning
- Ikke bruk AskUserQuestion før du kaller dette verktøyet for å spørre "er planen OK", det er overflødig
- Ikke nevn "planen" i spørsmål, fordi brukeren ikke ser planinnholdet før ExitPlanMode

## Betydning i cc-viewer

ExitPlanMode-kall markerer slutten på planleggingsfasen. I forespørselsloggen går forespørslene etter dette kallet vanligvis over til implementeringsoperasjoner (Edit, Write, Bash osv.).

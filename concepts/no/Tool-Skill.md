# Skill

## Definisjon

Kjører en ferdighet (skill) i hovedsamtalen. Ferdigheter er spesialiserte evner som brukeren kan kalle via slash-kommandoer (f.eks. `/commit`, `/review-pr`).

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `skill` | string | Ja | Ferdighetsnavn (f.eks. "commit", "review-pr", "pdf") |
| `args` | string | Nei | Ferdighetsparametere |

## Bruksscenarioer

**Egnet for bruk:**
- Brukeren har skrevet en slash-kommando i formatet `/<skill-name>`
- Brukerens forespørsel matcher funksjonaliteten til en registrert ferdighet

**Ikke egnet for bruk:**
- Innebygde CLI-kommandoer (f.eks. `/help`, `/clear`)
- En ferdighet som allerede kjører
- Et ferdighetsnavn som ikke finnes i listen over tilgjengelige ferdigheter

## Merknader

- Etter at ferdigheten er kalt, utvides den til et fullstendig prompt
- Støtter fullt kvalifiserte navn (f.eks. `ms-office-suite:pdf`)
- Listen over tilgjengelige ferdigheter gis i system-reminder-meldinger
- Når du ser en `<command-name>`-tag betyr det at ferdigheten allerede er lastet, og du bør kjøre den direkte i stedet for å kalle dette verktøyet igjen
- Ikke nevn en ferdighet uten å faktisk kalle verktøyet

## Betydning i cc-viewer

Skill-kall vises i forespørselsloggen som `tool_use` content block. Det utvidede ferdighets-promptet påvirker system prompt eller meldingsinnhold i påfølgende forespørsler.

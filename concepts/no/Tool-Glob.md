# Glob

## Definisjon

Raskt filnavnmønstermatchingsverktøy som støtter kodebaser av enhver størrelse. Returnerer matchende filstier sortert etter endringstid.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `pattern` | string | Ja | Glob-mønster (f.eks. `**/*.js`, `src/**/*.ts`) |
| `path` | string | Nei | Søkekatalog, standard er gjeldende arbeidskatalog. Ikke send "undefined" eller "null" |

## Bruksscenarioer

**Egnet for bruk:**
- Søke etter filer med filnavnmønster
- Finne alle filer av en bestemt type (f.eks. alle `.tsx`-filer)
- Lokalisere filer når du søker etter en bestemt klassedefinisjon (f.eks. `class Foo`)
- Kan starte flere Glob-kall parallelt i en enkelt melding

**Ikke egnet for bruk:**
- Søke i filinnhold — bruk Grep
- Åpen utforskning som krever flere søkerunder — bruk Task (Explore-type)

## Merknader

- Støtter standard glob-syntaks: `*` matcher ett nivå, `**` matcher flere nivåer, `{}` matcher flere valg
- Resultater sortert etter endringstid
- Anbefales fremfor `find`-kommandoen i Bash

## Betydning i cc-viewer

Glob-kall vises i forespørselsloggen som et par av `tool_use` / `tool_result` content blocks. `tool_result` inneholder listen over matchende filstier.

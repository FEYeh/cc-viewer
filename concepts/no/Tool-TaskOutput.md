# TaskOutput

## Definisjon

Henter utdata fra bakgrunnsoppgaver som kjører eller er fullført. Gjelder for bakgrunns-shell, asynkrone agenter og fjernsesjoner.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `task_id` | string | Ja | Oppgave-ID |
| `block` | boolean | Ja | Om den skal blokkere og vente til oppgaven er ferdig, standard `true` |
| `timeout` | number | Ja | Maksimal ventetid (millisekunder), standard 30000, maks 600000 |

## Bruksscenarioer

**Egnet for bruk:**
- Sjekke fremdriften til bakgrunnsagenter startet via Task (`run_in_background: true`)
- Hente resultater fra bakgrunns-Bash-kommandoer
- Vente på at asynkrone oppgaver fullføres og hente utdata

**Ikke egnet for bruk:**
- Forgrunnsoppgaver — disse returnerer resultater direkte, dette verktøyet er ikke nødvendig

## Merknader

- `block: true` blokkerer til oppgaven er ferdig eller tidsavbruddet nås
- `block: false` for ikke-blokkerende sjekk av gjeldende status
- Oppgave-ID kan finnes via `/tasks`-kommandoen
- Gjelder for alle oppgavetyper: bakgrunns-shell, asynkrone agenter, fjernsesjoner

## Betydning i cc-viewer

TaskOutput-kall produserer ikke en API-forespørsel i seg selv; det er en intern oppgavebehandlingsoperasjon i Claude Code og vises ikke i forespørselsloggen.

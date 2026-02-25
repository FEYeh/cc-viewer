# TaskOutput

## Definition

Henter output fra en kørende eller fuldført baggrundsopgave. Gælder for baggrunds-shells, asynkrone agenter og fjernsessioner.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `task_id` | string | Ja | Opgave-ID |
| `block` | boolean | Ja | Om der skal ventes blokerende på opgavens fuldførelse, standard `true` |
| `timeout` | number | Ja | Maksimal ventetid (millisekunder), standard 30000, maks. 600000 |

## Brugsscenarier

**Egnet til:**
- Kontrollere fremdriften for en baggrundsagent startet via Task (`run_in_background: true`)
- Hente udførelsesresultater fra Bash-kommandoer i baggrunden
- Vente på fuldførelse af en asynkron opgave og hente output

**Ikke egnet til:**
- Forgrundsopgaver — forgrundsopgaver returnerer resultater direkte, dette værktøj er ikke nødvendigt

## Bemærkninger

- `block: true` blokerer indtil opgaven er fuldført eller timeout
- `block: false` til ikke-blokerende kontrol af aktuel status
- Opgave-ID kan findes via `/tasks`-kommandoen
- Gælder for alle opgavetyper: baggrunds-shells, asynkrone agenter, fjernsessioner

## Betydning i cc-viewer

TaskOutput-kald genererer ikke API-requests; det er en intern opgavestyringsoperation i Claude Code og vises ikke i requestloggen.

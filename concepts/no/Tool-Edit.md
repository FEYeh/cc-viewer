# Edit

## Definisjon

Redigerer filer via nøyaktig strengerstatning. Erstatter `old_string` med `new_string` i filen.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `file_path` | string | Ja | Absolutt sti til filen som skal endres |
| `old_string` | string | Ja | Originalteksten som skal erstattes |
| `new_string` | string | Ja | Ny tekst etter erstatning (må være forskjellig fra old_string) |
| `replace_all` | boolean | Nei | Om alle treff skal erstattes, standard `false` |

## Bruksscenarioer

**Egnet for bruk:**
- Endre spesifikke kodedeler i eksisterende filer
- Fikse feil, oppdatere logikk
- Gi nytt navn til variabler (med `replace_all: true`)
- Alle scenarioer som krever nøyaktig endring av filinnhold

**Ikke egnet for bruk:**
- Opprette nye filer — bruk Write
- Omfattende omskriving — kan kreve Write for å overskrive hele filen

## Merknader

- Filen må først leses via Read før bruk, ellers oppstår feil
- `old_string` må være unik i filen, ellers mislykkes redigeringen. Hvis den ikke er unik, må du gi mer kontekst for å gjøre den unik, eller bruke `replace_all`
- Behold original innrykk (tab/mellomrom) ved redigering av tekst, ikke inkluder linjenummerprefikset fra Read-utdata
- Foretrekk å redigere eksisterende filer fremfor å opprette nye
- `new_string` må være forskjellig fra `old_string`

## Betydning i cc-viewer

Edit-kall vises i forespørselsloggen som `tool_use` content block, der `input` inneholder `old_string` og `new_string`, som kan brukes til å spore hvilke endringer modellen har gjort i filer.

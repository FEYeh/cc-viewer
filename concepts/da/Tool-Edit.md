# Edit

## Definition

Redigerer filer via præcis strengerstatning. Erstatter `old_string` med `new_string` i filen.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `file_path` | string | Ja | Absolut sti til filen der skal ændres |
| `old_string` | string | Ja | Originaltekst der skal erstattes |
| `new_string` | string | Ja | Ny erstatningstekst (skal være forskellig fra old_string) |
| `replace_all` | boolean | Nej | Om alle forekomster skal erstattes, standard `false` |

## Brugsscenarier

**Egnet til:**
- Ændre specifikke kodeafsnit i eksisterende filer
- Rette fejl, opdatere logik
- Omdøbe variabler (med `replace_all: true`)
- Ethvert scenarie der kræver præcis ændring af filindhold

**Ikke egnet til:**
- Oprette nye filer — brug Write
- Omfattende omskrivninger — kan kræve Write til at overskrive hele filen

## Bemærkninger

- Filen skal først være læst via Read, ellers opstår en fejl
- `old_string` skal være unik i filen, ellers fejler redigeringen. Hvis den ikke er unik, angiv mere kontekst for at gøre den unik, eller brug `replace_all`
- Ved redigering af tekst skal den originale indrykning (tab/mellemrum) bevares; medtag ikke linjenummerpræfikset fra Read-output
- Foretræk redigering af eksisterende filer frem for at oprette nye
- `new_string` skal være forskellig fra `old_string`

## Betydning i cc-viewer

Edit-kald vises i requestloggen som `tool_use` content block, hvis `input` indeholder `old_string` og `new_string`, som kan bruges til at spore hvilke ændringer modellen har foretaget i filer.

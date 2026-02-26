# Read

## Definition

Læser filindhold fra det lokale filsystem. Understøtter tekstfiler, billeder, PDF og Jupyter notebook.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `file_path` | string | Ja | Absolut sti til filen |
| `offset` | number | Nej | Startlinjenummer (til segmenteret læsning af store filer) |
| `limit` | number | Nej | Antal linjer der skal læses (til segmenteret læsning af store filer) |
| `pages` | string | Nej | PDF-sideinterval (f.eks. "1-5", "3", "10-20"), gælder kun for PDF |

## Brugsscenarier

**Egnet til:**
- Læse kodefiler, konfigurationsfiler og andre tekstfiler
- Se billedfiler (Claude er en multimodal model)
- Læse PDF-dokumenter
- Læse Jupyter notebooks (returnerer alle celler med output)
- Læse flere filer parallelt for at få kontekst

**Ikke egnet til:**
- Læse mapper — brug Bashs `ls`-kommando
- Åben udforskning af kodebasen — brug Task (Explore-type)

## Bemærkninger

- Stien skal være absolut, ikke relativ
- Læser som standard de første 2000 linjer af filen
- Linjer over 2000 tegn afkortes
- Output bruger `cat -n`-format med linjenumre startende fra 1
- Store PDF'er (over 10 sider) kræver angivelse af `pages`-parameteren, maks. 20 sider ad gangen
- Læsning af en ikke-eksisterende fil returnerer en fejl (crasher ikke)
- Man kan kalde flere Read parallelt i en enkelt besked

## Betydning i cc-viewer

Read-kald vises i requestloggen som `tool_use` (kald) og `tool_result` (returneret indhold) content block-par. `tool_result` indeholder filens faktiske indhold, som kan bruges til at analysere hvilke filer modellen har læst.

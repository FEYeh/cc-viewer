# AskUserQuestion

## Definition

Stiller spørgsmål til brugeren under udførelsen for at få afklaring, verificere antagelser eller anmode om beslutninger.

## Parametre

| Parameter | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `questions` | array | Ja | Liste af spørgsmål (1-4 spørgsmål) |
| `answers` | object | Nej | Svar indsamlet fra brugeren |
| `annotations` | object | Nej | Annotationer for hvert spørgsmål (f.eks. noter til forhåndsvisning af valg) |
| `metadata` | object | Nej | Metadata til sporing og analyse |

Hvert `question`-objekt:

| Felt | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `question` | string | Ja | Komplet spørgsmålstekst, skal slutte med spørgsmålstegn |
| `header` | string | Ja | Kort label (maks. 12 tegn), vises som label-chip |
| `options` | array | Ja | 2-4 valgmuligheder |
| `multiSelect` | boolean | Ja | Om flervalg er tilladt |

Hvert `option`-objekt:

| Felt | Type | Påkrævet | Beskrivelse |
|------|------|------|------|
| `label` | string | Ja | Visningstekst for valgmuligheden (1-5 ord) |
| `description` | string | Ja | Beskrivelse af valgmuligheden |
| `markdown` | string | Nej | Forhåndsvisningsindhold (til visuel sammenligning af ASCII-layout, kodestykker osv.) |

## Brugsscenarier

**Egnet til:**
- Indsamling af brugerpræferencer eller krav
- Afklaring af tvetydige instruktioner
- Indhentning af beslutninger under implementering
- Give brugeren retningsvalg

**Ikke egnet til:**
- At spørge "er planen OK?" — brug ExitPlanMode

## Bemærkninger

- Brugeren kan altid vælge "Other" for at give brugerdefineret input
- Den anbefalede valgmulighed placeres først med "(Recommended)" i slutningen af label
- `markdown`-forhåndsvisning understøttes kun for enkeltvalgs-spørgsmål
- Valgmuligheder med `markdown` skifter til side-om-side-layout
- I planlægningstilstand bruges det til at afklare krav, før planen fastlægges

## Betydning i cc-viewer

AskUserQuestion-kald vises i requestloggen som `tool_use` content block, der indeholder spørgsmåls- og valgmulighedsdefinitioner. Brugerens svar vises i beskedhistorikken for efterfølgende requests.

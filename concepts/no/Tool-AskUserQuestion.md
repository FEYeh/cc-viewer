# AskUserQuestion

## Definisjon

Stiller spørsmål til brukeren under utførelse, for å få avklaringer, verifisere antakelser eller be om beslutninger.

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `questions` | array | Ja | Spørsmålsliste (1–4 spørsmål) |
| `answers` | object | Nei | Svar samlet inn fra brukeren |
| `annotations` | object | Nei | Merknader for hvert spørsmål (f.eks. notater for forhåndsvisning av valg) |
| `metadata` | object | Nei | Metadata for sporing og analyse |

Hvert `question`-objekt:

| Felt | Type | Påkrevd | Beskrivelse |
|------|------|---------|-------------|
| `question` | string | Ja | Fullstendig spørsmålstekst, bør ende med spørsmålstegn |
| `header` | string | Ja | Kort etikett (maks 12 tegn), vises som etikett-chip |
| `options` | array | Ja | 2–4 alternativer |
| `multiSelect` | boolean | Ja | Om flervalg er tillatt |

Hvert `option`-objekt:

| Felt | Type | Påkrevd | Beskrivelse |
|------|------|---------|-------------|
| `label` | string | Ja | Visningstekst for alternativet (1–5 ord) |
| `description` | string | Ja | Beskrivelse av alternativet |
| `markdown` | string | Nei | Forhåndsvisningsinnhold (for visuell sammenligning av ASCII-layout, kodesnutter osv.) |

## Bruksscenarioer

**Egnet for bruk:**
- Samle inn brukerpreferanser eller krav
- Avklare tvetydige instruksjoner
- Få beslutninger under implementering
- Gi brukeren retningsvalg

**Ikke egnet for bruk:**
- Spørre "er planen OK?" — bruk ExitPlanMode

## Merknader

- Brukeren kan alltid velge "Other" for å gi egendefinert inndata
- Anbefalt alternativ plasseres først, med "(Recommended)" lagt til på slutten av label
- `markdown`-forhåndsvisning støttes kun for enkeltvalg-spørsmål
- Alternativer med `markdown` bytter til side-ved-side-layout
- I planleggingsmodus brukes dette til å avklare krav før planen fastsettes

## Betydning i cc-viewer

AskUserQuestion-kall vises i forespørselsloggen som `tool_use` content block, som inneholder spørsmåls- og alternativdefinisjoner. Brukerens svar vises i meldingshistorikken for påfølgende forespørsler.

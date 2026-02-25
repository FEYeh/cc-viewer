# NotebookEdit

## Definisjon

Erstatter, setter inn eller sletter spesifikke celler i Jupyter notebook (.ipynb-filer).

## Parametere

| Parameter | Type | Påkrevd | Beskrivelse |
|-----------|------|---------|-------------|
| `notebook_path` | string | Ja | Absolutt sti til notebook-filen |
| `new_source` | string | Ja | Nytt innhold for cellen |
| `cell_id` | string | Nei | ID-en til cellen som skal redigeres. I insert-modus settes den nye cellen inn etter denne ID-en |
| `cell_type` | enum | Nei | Celletype: `code` eller `markdown`. Påkrevd i insert-modus |
| `edit_mode` | enum | Nei | Redigeringsmodus: `replace` (standard), `insert`, `delete` |

## Bruksscenarioer

**Egnet for bruk:**
- Endre kode- eller markdown-celler i Jupyter notebook
- Legge til nye celler i notebook
- Slette celler fra notebook

## Merknader

- `cell_number` er 0-indeksert
- `insert`-modus setter inn en ny celle på angitt posisjon
- `delete`-modus sletter cellen på angitt posisjon
- Stien må være absolutt

## Betydning i cc-viewer

NotebookEdit-kall vises i forespørselsloggen som `tool_use` content block, som registrerer de spesifikke endringsoperasjonene på notebook.

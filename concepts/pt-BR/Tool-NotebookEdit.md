# NotebookEdit

## Definição

Substitui, insere ou exclui células específicas em um Jupyter notebook (arquivo .ipynb).

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `notebook_path` | string | Sim | Caminho absoluto do arquivo notebook |
| `new_source` | string | Sim | Novo conteúdo da célula |
| `cell_id` | string | Não | ID da célula a editar. No modo de inserção, a nova célula é inserida após este ID |
| `cell_type` | enum | Não | Tipo de célula: `code` ou `markdown`. Obrigatório no modo de inserção |
| `edit_mode` | enum | Não | Modo de edição: `replace` (padrão), `insert`, `delete` |

## Cenários de Uso

**Adequado para:**
- Modificar células de código ou markdown em Jupyter notebooks
- Adicionar novas células ao notebook
- Excluir células do notebook

## Observações

- `cell_number` é indexado a partir de 0
- O modo `insert` insere uma nova célula na posição especificada
- O modo `delete` exclui a célula na posição especificada
- O caminho deve ser absoluto

## Significado no cc-viewer

A chamada NotebookEdit aparece nos logs de requisição como um content block `tool_use`, registrando a operação específica de modificação no notebook.

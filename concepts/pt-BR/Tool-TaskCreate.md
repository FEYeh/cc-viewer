# TaskCreate

## Definição

Cria entradas estruturadas na lista de tarefas, para rastrear progresso, organizar tarefas complexas e mostrar o andamento do trabalho ao usuário.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `subject` | string | Sim | Título curto da tarefa, usar forma imperativa (ex: "Fix authentication bug") |
| `description` | string | Sim | Descrição detalhada, incluindo contexto e critérios de aceitação |
| `activeForm` | string | Não | Texto no gerúndio exibido quando em andamento (ex: "Fixing authentication bug") |
| `metadata` | object | Não | Metadados arbitrários anexados à tarefa |

## Cenários de Uso

**Adequado para:**
- Tarefas complexas de múltiplas etapas (mais de 3 etapas)
- O usuário forneceu múltiplos itens a fazer
- Rastrear trabalho no modo de planejamento
- O usuário solicitou explicitamente o uso de lista de tarefas

**Não adequado para:**
- Tarefa única e simples
- Operações simples de até 3 etapas
- Consultas puramente conversacionais ou informativas

## Observações

- Todas as tarefas criadas têm status inicial `pending`
- `subject` usa forma imperativa ("Run tests"), `activeForm` usa gerúndio ("Running tests")
- Após criar a tarefa, pode-se definir dependências (blocks/blockedBy) via TaskUpdate
- Antes de criar, deve-se chamar TaskList para verificar se há tarefas duplicadas

## Significado no cc-viewer

TaskCreate é uma operação interna de gerenciamento de tarefas do Claude Code, não gera requisições API independentes. Porém, no Chat Mode é possível ver o bloco tool_use do modelo chamando esta ferramenta.

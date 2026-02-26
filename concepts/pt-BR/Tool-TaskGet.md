# TaskGet

## Definição

Obtém os detalhes completos de uma tarefa através do ID da tarefa.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `taskId` | string | Sim | ID da tarefa a obter |

## Conteúdo Retornado

- `subject` — Título da tarefa
- `description` — Requisitos detalhados e contexto
- `status` — Status: `pending`, `in_progress` ou `completed`
- `blocks` — Lista de tarefas bloqueadas por esta tarefa
- `blockedBy` — Lista de tarefas pré-requisito que bloqueiam esta tarefa

## Cenários de Uso

**Adequado para:**
- Obter a descrição completa e contexto da tarefa antes de iniciar o trabalho
- Entender as dependências da tarefa
- Obter requisitos completos após ser atribuído a uma tarefa

## Observações

- Após obter a tarefa, deve-se verificar se a lista `blockedBy` está vazia antes de iniciar o trabalho
- Use TaskList para ver o resumo de todas as tarefas

## Significado no cc-viewer

TaskGet é uma operação interna de gerenciamento de tarefas, não gera requisições API independentes.

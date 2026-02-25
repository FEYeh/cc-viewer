# TaskUpdate

## Definição

Atualiza o status, conteúdo ou dependências de uma tarefa na lista de tarefas.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `taskId` | string | Sim | ID da tarefa a atualizar |
| `status` | enum | Não | Novo status: `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | Não | Novo título |
| `description` | string | Não | Nova descrição |
| `activeForm` | string | Não | Texto no gerúndio exibido quando em andamento |
| `owner` | string | Não | Novo responsável pela tarefa (nome do agent) |
| `metadata` | object | Não | Metadados a mesclar (definir como null para excluir chave) |
| `addBlocks` | string[] | Não | Lista de IDs de tarefas bloqueadas por esta tarefa |
| `addBlockedBy` | string[] | Não | Lista de IDs de tarefas pré-requisito que bloqueiam esta tarefa |

## Fluxo de Status

```
pending → in_progress → completed
```

`deleted` pode ser atingido a partir de qualquer status, removendo permanentemente a tarefa.

## Cenários de Uso

**Adequado para:**
- Marcar tarefa como `in_progress` ao iniciar o trabalho
- Marcar tarefa como `completed` após concluir o trabalho
- Definir dependências entre tarefas
- Atualizar conteúdo da tarefa quando requisitos mudam

**Regras importantes:**
- Só marcar como `completed` quando a tarefa estiver totalmente concluída
- Manter como `in_progress` ao encontrar erros ou bloqueios
- Não marcar como `completed` quando testes falham, implementação está incompleta ou há erros não resolvidos

## Observações

- Antes de atualizar, deve-se obter o status mais recente da tarefa via TaskGet para evitar dados desatualizados
- Após concluir uma tarefa, chamar TaskList para encontrar a próxima tarefa disponível

## Significado no cc-viewer

TaskUpdate é uma operação interna de gerenciamento de tarefas, não gera requisições API independentes.

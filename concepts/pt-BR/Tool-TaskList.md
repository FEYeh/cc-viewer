# TaskList

## Definição

Lista todas as tarefas na lista de tarefas, para visualizar o progresso geral e trabalho disponível.

## Parâmetros

Sem parâmetros.

## Conteúdo Retornado

Informações resumidas de cada tarefa:
- `id` — Identificador da tarefa
- `subject` — Descrição curta
- `status` — Status: `pending`, `in_progress` ou `completed`
- `owner` — Responsável (ID do agent), vazio indica não atribuído
- `blockedBy` — Lista de IDs de tarefas não concluídas que bloqueiam esta tarefa

## Cenários de Uso

**Adequado para:**
- Ver quais tarefas estão disponíveis (status pending, sem owner, não bloqueadas)
- Verificar o progresso geral do projeto
- Encontrar tarefas bloqueadas
- Encontrar a próxima tarefa após concluir uma

## Observações

- Prefira processar tarefas em ordem de ID (menor ID primeiro), pois tarefas anteriores geralmente fornecem contexto para as posteriores
- Tarefas com `blockedBy` não podem ser reivindicadas até que as dependências sejam resolvidas
- Use TaskGet para obter detalhes completos de uma tarefa específica

## Significado no cc-viewer

TaskList é uma operação interna de gerenciamento de tarefas, não gera requisições API independentes.

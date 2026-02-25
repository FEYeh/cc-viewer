# AskUserQuestion

## Definição

Faz perguntas ao usuário durante a execução, para obter esclarecimentos, validar suposições ou solicitar decisões.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `questions` | array | Sim | Lista de perguntas (1-4 perguntas) |
| `answers` | object | Não | Respostas coletadas do usuário |
| `annotations` | object | Não | Anotações para cada pergunta (ex: notas de pré-visualização de seleção) |
| `metadata` | object | Não | Metadados para rastreamento e análise |

Cada objeto `question`:

| Campo | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `question` | string | Sim | Texto completo da pergunta, deve terminar com ponto de interrogação |
| `header` | string | Sim | Rótulo curto (máximo 12 caracteres), exibido como chip de tag |
| `options` | array | Sim | 2-4 opções |
| `multiSelect` | boolean | Sim | Se permite seleção múltipla |

Cada objeto `option`:

| Campo | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `label` | string | Sim | Texto de exibição da opção (1-5 palavras) |
| `description` | string | Sim | Descrição da opção |
| `markdown` | string | Não | Conteúdo de pré-visualização (para comparação visual de layouts ASCII, trechos de código, etc.) |

## Cenários de Uso

**Adequado para:**
- Coletar preferências ou requisitos do usuário
- Esclarecer instruções ambíguas
- Obter decisões durante a implementação
- Oferecer opções de direção ao usuário

**Não adequado para:**
- Perguntar "o plano está ok?" — deve usar ExitPlanMode

## Observações

- O usuário sempre pode escolher "Other" para fornecer entrada personalizada
- A opção recomendada deve ser colocada em primeiro lugar, com "(Recommended)" no final do label
- A pré-visualização `markdown` é suportada apenas para perguntas de seleção única
- Opções com `markdown` alternam para layout lado a lado
- No modo de planejamento, usado para esclarecer requisitos antes de definir o plano

## Significado no cc-viewer

A chamada AskUserQuestion aparece nos logs de requisição como um content block `tool_use`, contendo a definição das perguntas e opções. As respostas do usuário aparecem no histórico de mensagens das requisições subsequentes.

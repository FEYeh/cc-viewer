# ExitPlanMode

## Definição

Sai do modo de planejamento e submete o plano para aprovação do usuário. O conteúdo do plano é lido do arquivo de plano previamente escrito.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `allowedPrompts` | array | Não | Lista de descrições de permissões necessárias para o plano de implementação |

Cada elemento do array `allowedPrompts`:

| Campo | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `tool` | enum | Sim | Ferramenta aplicável, atualmente suporta apenas `Bash` |
| `prompt` | string | Sim | Descrição semântica da operação (ex: "run tests", "install dependencies") |

## Cenários de Uso

**Adequado para:**
- No modo de planejamento, quando o plano está completo e pronto para submissão à aprovação do usuário
- Usado apenas para tarefas de implementação que requerem escrita de código

**Não adequado para:**
- Tarefas puramente de pesquisa/exploração — não é necessário sair do modo de planejamento
- Querer perguntar ao usuário "o plano está ok?" — esta é exatamente a função desta ferramenta, não use AskUserQuestion para isso

## Observações

- Esta ferramenta não aceita o conteúdo do plano como parâmetro — ela lê do arquivo de plano previamente escrito
- O usuário verá o conteúdo do arquivo de plano para aprovação
- Não use AskUserQuestion para perguntar "o plano está ok?" antes de chamar esta ferramenta, isso é redundante
- Não mencione "plano" nas perguntas, pois o usuário não pode ver o conteúdo do plano antes do ExitPlanMode

## Significado no cc-viewer

A chamada ExitPlanMode marca o fim da fase de planejamento. Nos logs de requisição, as requisições após esta chamada tipicamente mudam para operações de implementação (Edit, Write, Bash, etc.).

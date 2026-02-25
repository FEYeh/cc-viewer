# EnterPlanMode

## Definição

Alterna o Claude Code para o modo de planejamento, usado para explorar a base de código e projetar um plano antes da implementação.

## Parâmetros

Sem parâmetros.

## Cenários de Uso

**Adequado para:**
- Implementação de novas funcionalidades — requer decisões de arquitetura
- Existem múltiplas abordagens viáveis — requer escolha do usuário
- Modificações de código afetam comportamento ou estrutura existente
- Alterações em múltiplos arquivos — possivelmente envolvendo 2-3 ou mais arquivos
- Requisitos não claros — necessário explorar antes de entender o escopo
- Preferências do usuário são importantes — a implementação pode ter múltiplas direções razoáveis

**Não adequado para:**
- Correções de uma ou poucas linhas (erros de digitação, bugs óbvios)
- O usuário já forneceu instruções muito específicas
- Tarefas puramente de pesquisa/exploração — deve usar Task (tipo Explore)

## Comportamento no Modo de Planejamento

Após entrar no modo de planejamento, o Claude Code irá:
1. Usar ferramentas Glob, Grep, Read para explorar profundamente a base de código
2. Compreender padrões e arquitetura existentes
3. Projetar o plano de implementação
4. Submeter o plano para aprovação do usuário
5. Usar AskUserQuestion se necessário para esclarecimentos
6. Sair via ExitPlanMode quando o plano estiver pronto

## Observações

- Esta ferramenta requer consentimento do usuário para entrar no modo de planejamento
- Se não tiver certeza se o planejamento é necessário, prefira planejar — alinhar antecipadamente é melhor que retrabalho

## Significado no cc-viewer

A chamada EnterPlanMode aparece nos logs de requisição como um content block `tool_use`. Após entrar no modo de planejamento, a sequência de requisições é tipicamente dominada por chamadas de ferramentas exploratórias (Glob, Grep, Read), até que ExitPlanMode seja chamado.

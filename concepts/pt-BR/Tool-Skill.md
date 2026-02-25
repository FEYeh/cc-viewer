# Skill

## Definição

Executa uma skill (habilidade) na conversa principal. Skills são capacidades especializadas que o usuário pode invocar através de slash commands (ex: `/commit`, `/review-pr`).

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `skill` | string | Sim | Nome da skill (ex: "commit", "review-pr", "pdf") |
| `args` | string | Não | Argumentos da skill |

## Cenários de Uso

**Adequado para:**
- O usuário digitou um slash command no formato `/<skill-name>`
- A solicitação do usuário corresponde à funcionalidade de uma skill registrada

**Não adequado para:**
- Comandos CLI integrados (ex: `/help`, `/clear`)
- Skills que já estão em execução
- Nomes de skills que não estão na lista de skills disponíveis

## Observações

- Após ser invocada, a skill se expande em um prompt completo
- Suporta nomes totalmente qualificados (ex: `ms-office-suite:pdf`)
- A lista de skills disponíveis é fornecida nas mensagens system-reminder
- Quando a tag `<command-name>` é vista, significa que a skill já foi carregada e deve ser executada diretamente sem chamar esta ferramenta novamente
- Não mencione uma skill sem realmente invocar a ferramenta

## Significado no cc-viewer

A chamada Skill aparece nos logs de requisição como um content block `tool_use`. O prompt expandido pela skill afeta o system prompt ou conteúdo das mensagens das requisições subsequentes.

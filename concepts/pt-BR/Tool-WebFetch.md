# WebFetch

## Definição

Busca o conteúdo de uma URL especificada, converte HTML para markdown e processa o conteúdo usando um modelo de IA com base no prompt.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `url` | string (URI) | Sim | URL completa a ser buscada |
| `prompt` | string | Sim | Descreve que informação extrair da página |

## Cenários de Uso

**Adequado para:**
- Obter conteúdo de páginas web públicas
- Consultar documentação online
- Extrair informações específicas de páginas web

**Não adequado para:**
- URLs que requerem autenticação (Google Docs, Confluence, Jira, GitHub, etc.) — deve primeiro procurar ferramentas MCP dedicadas
- URLs do GitHub — prefira usar o CLI `gh`

## Observações

- A URL deve ser uma URL válida completa
- HTTP é automaticamente atualizado para HTTPS
- Resultados podem ser resumidos quando o conteúdo é muito grande
- Inclui cache com auto-limpeza de 15 minutos
- Quando a URL redireciona para um host diferente, a ferramenta retorna a URL de redirecionamento, sendo necessário fazer nova requisição com a nova URL
- Se houver uma ferramenta web fetch fornecida por MCP disponível, prefira usá-la

## Significado no cc-viewer

As chamadas WebFetch aparecem nos logs de requisição como pares de content blocks `tool_use` / `tool_result`. O `tool_result` contém o resumo do conteúdo da página web processado por IA.

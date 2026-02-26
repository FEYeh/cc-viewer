# WebSearch

## Definição

Executa consultas em mecanismo de busca, retornando resultados de pesquisa para obter informações atualizadas.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `query` | string | Sim | Consulta de busca (mínimo 2 caracteres) |
| `allowed_domains` | string[] | Não | Incluir apenas resultados destes domínios |
| `blocked_domains` | string[] | Não | Excluir resultados destes domínios |

## Cenários de Uso

**Adequado para:**
- Obter informações atualizadas além da data de corte do conhecimento do modelo
- Buscar eventos atuais e dados recentes
- Pesquisar documentação técnica mais recente

## Observações

- Os resultados de busca são retornados em formato de hyperlinks markdown
- Após o uso, é obrigatório incluir uma seção "Sources:" no final da resposta, listando as URLs relevantes
- Suporta filtragem de domínios (inclusão/exclusão)
- A consulta de busca deve usar o ano atual
- Disponível apenas nos EUA

## Significado no cc-viewer

As chamadas WebSearch aparecem nos logs de requisição como pares de content blocks `tool_use` / `tool_result`. O `tool_result` contém a lista de resultados da busca.

# Glob

## Definição

Ferramenta rápida de correspondência de padrões de nomes de arquivo, suporta bases de código de qualquer tamanho. Retorna caminhos de arquivos correspondentes ordenados por data de modificação.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `pattern` | string | Sim | Padrão glob (ex: `**/*.js`, `src/**/*.ts`) |
| `path` | string | Não | Diretório de busca, padrão é o diretório de trabalho atual. Não passe "undefined" ou "null" |

## Cenários de Uso

**Adequado para:**
- Buscar arquivos por padrão de nome
- Encontrar todos os arquivos de um tipo específico (ex: todos os arquivos `.tsx`)
- Localizar arquivos ao buscar definições de classes específicas (ex: `class Foo`)
- Pode iniciar múltiplas chamadas Glob em paralelo em uma única mensagem

**Não adequado para:**
- Buscar conteúdo de arquivo — deve usar Grep
- Exploração aberta que requer múltiplas rodadas de busca — deve usar Task (tipo Explore)

## Observações

- Suporta sintaxe glob padrão: `*` corresponde a um nível, `**` corresponde a múltiplos níveis, `{}` corresponde a múltiplas opções
- Resultados ordenados por data de modificação
- Mais recomendado que o comando `find` do Bash

## Significado no cc-viewer

As chamadas Glob aparecem nos logs de requisição como pares de content blocks `tool_use` / `tool_result`. O `tool_result` contém a lista de caminhos de arquivos correspondentes.

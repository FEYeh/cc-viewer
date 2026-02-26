# Bash

## Definição

Executa comandos shell, com suporte a configuração opcional de timeout. O diretório de trabalho persiste entre comandos, mas o estado do shell (variáveis de ambiente, etc.) não persiste.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `command` | string | Sim | Comando bash a ser executado |
| `description` | string | Não | Descrição curta do comando |
| `timeout` | number | Não | Timeout em milissegundos, máximo 600000, padrão 120000 |
| `run_in_background` | boolean | Não | Se deve executar em segundo plano |

## Cenários de Uso

**Adequado para:**
- Operações git (commit, push, branch, etc.)
- Comandos de gerenciamento de pacotes como npm/yarn
- Operações docker
- Comandos de compilação e build
- Listar conteúdo de diretórios (`ls`)
- Outros comandos de sistema que requerem execução shell

**Não adequado para:**
- Ler arquivos — deve usar Read
- Buscar nomes de arquivo — deve usar Glob
- Buscar conteúdo de arquivo — deve usar Grep
- Editar arquivos — deve usar Edit
- Escrever arquivos — deve usar Write
- Exibir informações ao usuário — exibir diretamente no texto da resposta
- Processos de longa duração (dev server, modo watch) — recomendar que o usuário execute manualmente

## Observações

- Caminhos com espaços devem ser envolvidos em aspas duplas
- Saída acima de 30000 caracteres será truncada
- Comandos em segundo plano obtêm resultados via TaskOutput
- Prefira usar caminhos absolutos, evite `cd`
- Comandos independentes podem invocar múltiplos Bash em paralelo
- Comandos com dependências devem ser encadeados com `&&`
- O ambiente shell é inicializado a partir do profile do usuário (bash ou zsh)

## Significado no cc-viewer

As chamadas Bash aparecem nos logs de requisição como pares de content blocks `tool_use` (contendo o comando) e `tool_result` (contendo a saída). A saída da execução do comando pode ser usada para analisar o comportamento operacional do modelo.

# Read

## Definição

Lê conteúdo de arquivo do sistema de arquivos local. Suporta arquivos de texto, imagens, PDF e Jupyter notebook.

## Parâmetros

| Parâmetro | Tipo | Obrigatório | Descrição |
|------|------|------|------|
| `file_path` | string | Sim | Caminho absoluto do arquivo |
| `offset` | number | Não | Número da linha inicial (para leitura segmentada de arquivos grandes) |
| `limit` | number | Não | Número de linhas a ler (para leitura segmentada de arquivos grandes) |
| `pages` | string | Não | Intervalo de páginas do PDF (ex: "1-5", "3", "10-20"), aplicável apenas a PDF |

## Cenários de Uso

**Adequado para:**
- Ler arquivos de código, configuração e outros arquivos de texto
- Visualizar arquivos de imagem (Claude é um modelo multimodal)
- Ler documentos PDF
- Ler Jupyter notebooks (retorna todas as células e saídas)
- Ler múltiplos arquivos em paralelo para obter contexto

**Não adequado para:**
- Ler diretórios — deve usar o comando `ls` do Bash
- Exploração aberta da base de código — deve usar Task (tipo Explore)

## Observações

- O caminho deve ser absoluto, não relativo
- Por padrão, lê as primeiras 2000 linhas do arquivo
- Linhas com mais de 2000 caracteres serão truncadas
- A saída usa formato `cat -n`, com números de linha começando em 1
- PDFs grandes (mais de 10 páginas) devem especificar o parâmetro `pages`, máximo de 20 páginas por vez
- Ler um arquivo inexistente retorna erro (não causa crash)
- Pode chamar múltiplos Read em paralelo em uma única mensagem

## Significado no cc-viewer

As chamadas Read aparecem nos logs de requisição como pares de content blocks `tool_use` (chamada) e `tool_result` (conteúdo retornado). O `tool_result` contém o conteúdo real do arquivo, podendo ser usado para analisar quais arquivos o modelo leu.

# MainAgent

## Definição

MainAgent é a cadeia de requisições principal do Claude Code quando não está no modo agent team. Cada interação do usuário com o Claude Code gera uma série de requisições à API, e as requisições do MainAgent formam a cadeia de diálogo central — elas carregam o system prompt completo, definições de ferramentas e histórico de mensagens.

## Como Identificar

No cc-viewer, o MainAgent é identificado por `req.mainAgent === true`, marcado automaticamente pelo `interceptor.js` durante a captura da requisição.

Condições de identificação (todas devem ser atendidas):
- O corpo da requisição contém o campo `system` (system prompt)
- O corpo da requisição contém o array `tools` (definições de ferramentas)
- O system prompt contém texto característico de "Claude Code"

## Diferença em Relação ao SubAgent

| Característica | MainAgent | SubAgent |
|------|-----------|----------|
| system prompt | Prompt principal completo do Claude Code | Prompt simplificado específico para a tarefa |
| array tools | Contém todas as ferramentas disponíveis | Geralmente contém apenas as poucas ferramentas necessárias para a tarefa |
| Histórico de mensagens | Acumula o contexto completo da conversa | Contém apenas mensagens relacionadas à subtarefa |
| Comportamento de cache | Possui prompt caching (TTL de 5 minutos) | Geralmente sem cache ou com cache menor |

## Significado no cc-viewer

- **Rastreamento de cache**: O estado do prompt caching das requisições do MainAgent afeta diretamente os custos. Monitorando a proporção entre `cache_creation_input_tokens` e `cache_read_input_tokens`, é possível avaliar a taxa de acerto do cache
- **Análise de perda de cache**: Quando requisições do MainAgent apresentam grande volume de cache creation (em vez de cache read), isso indica que o cache foi perdido e reconstruído. O cc-viewer marca essas requisições com um indicador de ponto vermelho
- **Análise da cadeia principal**: A sequência de requisições do MainAgent reflete o processo completo de interação do usuário com o Claude Code, sendo os dados centrais para análise do comportamento da sessão
- **Reconstrução da sessão**: O cc-viewer reconstrói a visualização da conversa (Chat Mode) através do histórico de mensagens das requisições do MainAgent

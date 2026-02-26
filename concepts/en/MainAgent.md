# MainAgent

## Definition

MainAgent is the primary request chain in Claude Code when not in agent team mode. Every interaction between the user and Claude Code produces a series of API requests, where MainAgent requests form the core conversation chain — they carry the complete system prompt, tool definitions, and message history.

## Identification

In cc-viewer, MainAgent is identified by `req.mainAgent === true`, automatically tagged by `interceptor.js` during request capture.

Criteria (all must be met):
- The request body contains a `system` field (system prompt)
- The request body contains a `tools` array (tool definitions)
- The system prompt contains "Claude Code" signature text

## Differences from SubAgent

| Feature | MainAgent | SubAgent |
|---------|-----------|----------|
| system prompt | Complete Claude Code main prompt | Streamlined task-specific prompt |
| tools array | Contains all available tools | Usually contains only a few tools needed for the task |
| Message history | Accumulates full conversation context | Contains only sub-task related messages |
| Caching behavior | Has prompt caching (5-minute TTL) | Usually no caching or smaller cache |

## Significance in cc-viewer

- **Cache tracking**: The prompt caching status of MainAgent requests directly affects costs. By monitoring the ratio of `cache_creation_input_tokens` to `cache_read_input_tokens`, you can assess cache hit rates
- **Cache miss analysis**: When MainAgent requests show large amounts of cache creation (rather than cache read), it indicates cache misses and rebuilds. cc-viewer marks these requests with a red dot indicator
- **Main chain analysis**: The MainAgent request sequence reflects the complete interaction between the user and Claude Code, serving as the core data for analyzing session behavior
- **Session reconstruction**: cc-viewer reconstructs the conversation view (Chat Mode) from MainAgent request message history

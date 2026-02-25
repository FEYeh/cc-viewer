# WebSearch

## Definition

Performs search engine queries and returns search results for obtaining up-to-date information.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | Yes | Search query (minimum 2 characters) |
| `allowed_domains` | string[] | No | Only include results from these domains |
| `blocked_domains` | string[] | No | Exclude results from these domains |

## Use Cases

**Good for:**
- Getting the latest information beyond the model's knowledge cutoff date
- Finding current events and recent data
- Searching for the latest technical documentation

## Notes

- Search results are returned in markdown hyperlink format
- After using this tool, a "Sources:" section must be appended at the end of the response listing the relevant URLs
- Supports domain filtering (include/exclude)
- Use the current year in search queries
- Only available in the US

## Significance in cc-viewer

WebSearch calls appear in request logs as `tool_use` / `tool_result` content block pairs. The `tool_result` contains the search results list.

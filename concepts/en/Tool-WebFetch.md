# WebFetch

## Definition

Fetches web page content from a specified URL, converts HTML to markdown, and processes the content using an AI model based on the prompt.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `url` | string (URI) | Yes | The full URL to fetch |
| `prompt` | string | Yes | Describes what information to extract from the page |

## Use Cases

**Good for:**
- Fetching content from public web pages
- Consulting online documentation
- Extracting specific information from web pages

**Not good for:**
- URLs requiring authentication (Google Docs, Confluence, Jira, GitHub, etc.) — look for a dedicated MCP tool first
- GitHub URLs — prefer using the `gh` CLI

## Notes

- The URL must be a complete, valid URL
- HTTP is automatically upgraded to HTTPS
- Results may be summarized if the content is too large
- Includes a 15-minute self-cleaning cache
- When a URL redirects to a different host, the tool returns the redirect URL, and you need to re-request with the new URL
- If an MCP-provided web fetch tool is available, prefer using that one

## Significance in cc-viewer

WebFetch calls appear in request logs as `tool_use` / `tool_result` content block pairs. The `tool_result` contains the AI-processed web content summary.

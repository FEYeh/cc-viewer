# Write

## Definition

Writes content to the local filesystem. Overwrites the file if it already exists.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | Yes | Absolute path of the file (must be an absolute path) |
| `content` | string | Yes | The content to write |

## Use Cases

**Good for:**
- Creating new files
- When a complete rewrite of file content is needed

**Not good for:**
- Modifying partial content in a file — use Edit instead
- Should not proactively create documentation files (*.md) or READMEs unless the user explicitly requests it

## Notes

- If the target file already exists, it must first be read via Read, otherwise it will fail
- Overwrites the entire content of existing files
- Prefer using Edit for existing files; Write is only for creating new files or complete rewrites

## Significance in cc-viewer

Write calls appear in request logs as `tool_use` content blocks, with `input.content` containing the complete written content.

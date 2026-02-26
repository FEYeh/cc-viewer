# Edit

## Definition

Edits files via exact string replacement. Replaces `old_string` with `new_string` in the file.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | Yes | Absolute path of the file to modify |
| `old_string` | string | Yes | The original text to replace |
| `new_string` | string | Yes | The new replacement text (must differ from old_string) |
| `replace_all` | boolean | No | Whether to replace all matches, default `false` |

## Use Cases

**Good for:**
- Modifying specific code sections in existing files
- Fixing bugs, updating logic
- Renaming variables (with `replace_all: true`)
- Any scenario requiring precise file content modification

**Not good for:**
- Creating new files — use Write instead
- Large-scale rewrites — may need Write to overwrite the entire file

## Notes

- You must first read the file via Read before using this tool, otherwise it will error
- `old_string` must be unique in the file, otherwise the edit fails. If not unique, provide more context to make it unique, or use `replace_all`
- When editing text, preserve the original indentation (tabs/spaces); do not include the line number prefix from Read output
- Prefer editing existing files over creating new ones
- `new_string` must differ from `old_string`

## Significance in cc-viewer

Edit calls appear in request logs as `tool_use` content blocks, with `input` containing `old_string` and `new_string`, which can be used to track what modifications the model made to files.

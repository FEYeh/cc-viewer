# Read

## Definition

Reads file contents from the local filesystem. Supports text files, images, PDFs, and Jupyter notebooks.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `file_path` | string | Yes | Absolute path of the file |
| `offset` | number | No | Starting line number (for reading large files in segments) |
| `limit` | number | No | Number of lines to read (for reading large files in segments) |
| `pages` | string | No | PDF page range (e.g., "1-5", "3", "10-20"), only applicable to PDFs |

## Use Cases

**Good for:**
- Reading code files, configuration files, and other text files
- Viewing image files (Claude is a multimodal model)
- Reading PDF documents
- Reading Jupyter notebooks (returns all cells with outputs)
- Reading multiple files in parallel to gather context

**Not good for:**
- Reading directories — use the `ls` command in Bash instead
- Open-ended codebase exploration — use Task (Explore type) instead

## Notes

- The path must be an absolute path, not a relative path
- Reads the first 2000 lines of a file by default
- Lines exceeding 2000 characters will be truncated
- Output uses `cat -n` format, with line numbers starting at 1
- Large PDFs (over 10 pages) must specify the `pages` parameter, max 20 pages per call
- Reading a non-existent file returns an error (does not crash)
- Multiple Read calls can be issued in parallel within a single message

## Significance in cc-viewer

Read calls appear in request logs as `tool_use` (invocation) and `tool_result` (returned content) content block pairs. The `tool_result` contains the actual file content, which can be used to analyze which files the model read.

# Bash

## Definition

Executes shell commands with optional timeout settings. The working directory persists between commands, but shell state (environment variables, etc.) does not persist.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `command` | string | Yes | The bash command to execute |
| `description` | string | No | A short description of the command |
| `timeout` | number | No | Timeout in milliseconds, max 600000, default 120000 |
| `run_in_background` | boolean | No | Whether to run in the background |

## Use Cases

**Good for:**
- git operations (commit, push, branch, etc.)
- npm/yarn and other package management commands
- docker operations
- Compilation and build commands
- Listing directory contents (`ls`)
- Other system commands that require shell execution

**Not good for:**
- Reading files — use Read instead
- Searching for filenames — use Glob instead
- Searching file contents — use Grep instead
- Editing files — use Edit instead
- Writing files — use Write instead
- Outputting information to the user — output directly in the response text
- Long-running processes (dev server, watch mode) — recommend the user run them manually

## Notes

- Paths containing spaces must be wrapped in double quotes
- Output exceeding 30000 characters will be truncated
- Background commands retrieve results via TaskOutput
- Use absolute paths whenever possible, avoid `cd`
- Independent commands can invoke multiple Bash calls in parallel
- Dependent commands should be chained with `&&`
- The shell environment is initialized from the user's profile (bash or zsh)

## Significance in cc-viewer

Bash calls appear in request logs as `tool_use` (containing the command) and `tool_result` (containing the output) content block pairs. The command execution output can be used to analyze the model's operational behavior.

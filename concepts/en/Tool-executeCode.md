# executeCode (mcp__ide__executeCode)

## Definition

Executes Python code in the Jupyter kernel of the current notebook file.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `code` | string | Yes | The Python code to execute |

## Use Cases

**Good for:**
- Executing code in a Jupyter notebook environment
- Testing code snippets
- Data analysis and computation

**Not good for:**
- Code execution outside of Jupyter environments — use Bash instead
- Modifying files — use Edit or Write instead

## Notes

- This is an MCP (Model Context Protocol) tool provided by IDE integration
- Code executes in the current Jupyter kernel, and state persists between calls
- Unless the user explicitly requests it, avoid declaring variables or modifying kernel state
- State is lost after a kernel restart

## Significance in cc-viewer

executeCode is an MCP tool that appears in the `tools` array of request logs under the name `mcp__ide__executeCode`. Its invocations and returns follow the standard `tool_use` / `tool_result` pattern. Adding or removing MCP tools causes changes to the tools array, which may trigger cache rebuilds.

# ExitPlanMode

## Definition

Exits plan mode and submits the plan for user approval. The plan content is read from a previously written plan file.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `allowedPrompts` | array | No | List of permission descriptions required for the implementation plan |

Each element in the `allowedPrompts` array:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tool` | enum | Yes | The applicable tool, currently only supports `Bash` |
| `prompt` | string | Yes | Semantic description of the operation (e.g., "run tests", "install dependencies") |

## Use Cases

**Good for:**
- The plan is complete in plan mode and ready for user approval
- Only for implementation tasks that require writing code

**Not good for:**
- Pure research/exploration tasks — no need to exit plan mode
- Asking the user "Is the plan okay?" — that is exactly what this tool does, do not use AskUserQuestion for that

## Notes

- This tool does not accept plan content as a parameter — it reads from a previously written plan file
- The user will see the plan file content for approval
- Do not use AskUserQuestion to ask "Is the plan okay?" before calling this tool, as that would be redundant
- Do not mention "the plan" in questions, since the user cannot see the plan content before ExitPlanMode

## Significance in cc-viewer

ExitPlanMode calls mark the end of the planning phase. In request logs, requests after this call typically shift to implementation operations (Edit, Write, Bash, etc.).

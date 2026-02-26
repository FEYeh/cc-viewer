# AskUserQuestion

## Definition

Asks the user a question during execution to obtain clarification, validate assumptions, or request decisions.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `questions` | array | Yes | List of questions (1-4 questions) |
| `answers` | object | No | Answers collected from the user |
| `annotations` | object | No | Annotations for each question (e.g., notes for preview selections) |
| `metadata` | object | No | Metadata for tracking and analysis |

Each `question` object:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `question` | string | Yes | Full question text, should end with a question mark |
| `header` | string | Yes | Short label (max 12 characters), displayed as a tag chip |
| `options` | array | Yes | 2-4 options |
| `multiSelect` | boolean | Yes | Whether multiple selections are allowed |

Each `option` object:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | string | Yes | Option display text (1-5 words) |
| `description` | string | Yes | Option description |
| `markdown` | string | No | Preview content (for visual comparison of ASCII layouts, code snippets, etc.) |

## Use Cases

**Good for:**
- Collecting user preferences or requirements
- Clarifying ambiguous instructions
- Getting decisions during implementation
- Providing directional choices to the user

**Not good for:**
- Asking "Is the plan okay?" — use ExitPlanMode instead

## Notes

- The user can always choose "Other" to provide custom input
- Place the recommended option first and append "(Recommended)" to its label
- `markdown` preview is only supported for single-select questions
- Options with `markdown` switch to a side-by-side layout
- In plan mode, used to clarify requirements before finalizing the plan

## Significance in cc-viewer

AskUserQuestion calls appear in request logs as `tool_use` content blocks containing the question and option definitions. The user's answers appear in the message history of subsequent requests.

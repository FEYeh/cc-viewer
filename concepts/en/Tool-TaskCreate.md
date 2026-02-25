# TaskCreate

## Definition

Creates a structured task list entry for tracking progress, organizing complex tasks, and demonstrating work progress to the user.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `subject` | string | Yes | Short task title in imperative form (e.g., "Fix authentication bug") |
| `description` | string | Yes | Detailed description including context and acceptance criteria |
| `activeForm` | string | No | Present continuous text displayed when in progress (e.g., "Fixing authentication bug") |
| `metadata` | object | No | Arbitrary metadata attached to the task |

## Use Cases

**Good for:**
- Complex multi-step tasks (more than 3 steps)
- When the user provides multiple to-do items
- Tracking work in plan mode
- When the user explicitly requests a todo list

**Not good for:**
- A single simple task
- Simple operations with 3 or fewer steps
- Pure conversation or information queries

## Notes

- All newly created tasks have an initial status of `pending`
- `subject` uses imperative form ("Run tests"), `activeForm` uses present continuous ("Running tests")
- After creating a task, use TaskUpdate to set dependencies (blocks/blockedBy)
- Before creating, call TaskList first to check for duplicate tasks

## Significance in cc-viewer

TaskCreate is an internal task management operation in Claude Code and does not produce independent API requests. However, the model's tool_use block for calling this tool can be seen in Chat Mode.

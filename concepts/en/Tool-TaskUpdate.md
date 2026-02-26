# TaskUpdate

## Definition

Updates the status, content, or dependencies of a task in the task list.

## Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `taskId` | string | Yes | The task ID to update |
| `status` | enum | No | New status: `pending` / `in_progress` / `completed` / `deleted` |
| `subject` | string | No | New title |
| `description` | string | No | New description |
| `activeForm` | string | No | Present continuous text displayed when in progress |
| `owner` | string | No | New task owner (agent name) |
| `metadata` | object | No | Metadata to merge (set to null to delete a key) |
| `addBlocks` | string[] | No | List of task IDs blocked by this task |
| `addBlockedBy` | string[] | No | List of prerequisite task IDs blocking this task |

## Status Workflow

```
pending → in_progress → completed
```

`deleted` can be entered from any status and permanently removes the task.

## Use Cases

**Good for:**
- Marking a task as `in_progress` when starting work
- Marking a task as `completed` when work is done
- Setting dependencies between tasks
- Updating task content when requirements change

**Important rules:**
- Only mark a task as `completed` when it is fully finished
- Keep the task as `in_progress` when encountering errors or blockers
- Do not mark as `completed` if tests are failing, implementation is incomplete, or unresolved errors exist

## Notes

- Before updating, retrieve the task's latest status via TaskGet to avoid stale data
- After completing a task, call TaskList to find the next available task

## Significance in cc-viewer

TaskUpdate is an internal task management operation and does not produce independent API requests.

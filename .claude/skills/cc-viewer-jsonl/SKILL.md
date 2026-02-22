---
name: cc-viewer-jsonl
description: JSONL log file management rules for cc-viewer. Use when working on cc-viewer's log file creation, rotation, resume, cleanup, or file watching logic. Covers interceptor.js and server.js log lifecycle.
---

# CC-Viewer JSONL Log Management

> **Important:** If any JSONL-related rules are changed in `interceptor.js` or `server.js`, update this skill file accordingly to keep it in sync.

## File Location & Naming

- Base directory: `~/.claude/cc-viewer/`
- Project directory: `~/.claude/cc-viewer/{projectName}/`
- File pattern: `{projectName}_{YYYYMMDD_HHMMSS}.jsonl`
- Project name: `basename(cwd)`, special chars → `_`
- File name retains project name for portability when moved independently

## Record Format

Records separated by `\n---\n`. Each record is a JSON object:

```json
{
  "timestamp": "ISO8601",
  "url": "...",
  "method": "POST",
  "headers": {},
  "body": { "model": "...", "messages": [], "stream": true },
  "response": { "status": 200, "body": {} },
  "duration": 1234,
  "isStream": true,
  "isHeartbeat": false,
  "mainAgent": true
}
```

## Lifecycle

### 1. Startup

1. Generate new file path with current timestamp
2. Clean up `_temp.jsonl` residuals (rename to `.jsonl` or merge+delete)
3. Check for recent log: find latest file for same project → prompt resume (no time limit)

### 2. Resume Flow

- Recent log found → write to `_temp.jsonl` while waiting for user choice
- User chooses "continue" → append temp content to old file, use old file
- User chooses "new" → rename temp to permanent, use new file

### 3. Writing

- Stream requests: write entry on request start, update same entry when response completes
- Entry lookup: match by `timestamp` + `url`
- Append with `\n---\n` separator

### 4. Rotation

- Trigger: every MainAgent request checks file size
- Threshold: 200MB (`MAX_LOG_SIZE`)
- Action: generate new file path, switch `LOG_FILE`; old file untouched

### 5. Server File Watching

- `server.js` watches `LOG_FILE` with `fs.watch`
- Detects rotation: if `LOG_FILE` changed, start watching new file
- Parses new entries, pushes via SSE to browser clients
- Supports `full_reload` event for initial batch load

## Key Rules

- No automatic deletion or retention policy
- Resume prompt: always shown when same-project log exists (no time limit)
- Temp files always cleaned on startup and process exit
- MainAgent detection: requires `system` containing "You are Claude Code", 10+ tools including Task/Edit/Bash, excludes SubAgent patterns
- Multi-instance: ports 7008-7099

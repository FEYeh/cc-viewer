import React from 'react';
import { Collapse, Typography } from 'antd';
import { renderMarkdown } from '../utils/markdown';
import { escapeHtml, truncateText, getSvgAvatar } from '../utils/helpers';
import { renderAssistantText } from '../utils/systemTags';
import DiffView from './DiffView';
import ToolResultView from './ToolResultView';

const { Text } = Typography;

const avatarBase = {
  width: 32,
  height: 32,
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexShrink: 0,
};

const bubbleBase = {
  borderRadius: 12,
  padding: '10px 14px',
  maxWidth: '100%',
  fontSize: 14,
  lineHeight: 1.6,
  wordBreak: 'break-word',
};

class ChatMessage extends React.Component {
  formatTime(ts) {
    if (!ts) return null;
    try {
      const d = new Date(ts);
      const pad = n => String(n).padStart(2, '0');
      return `${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
    } catch { return null; }
  }

  renderLabel(name, extra) {
    const { timestamp } = this.props;
    const timeStr = this.formatTime(timestamp);
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
        <Text type="secondary" style={{ fontSize: 11 }}>{name}{extra || ''}</Text>
        {timeStr && <Text style={{ fontSize: 10, color: '#6b7280', flexShrink: 0, marginLeft: 8 }}>{timeStr}</Text>}
      </div>
    );
  }
  renderSegments(segments) {
    return segments.map((seg, i) => {
      if (seg.type === 'system-tag') {
        return (
          <Collapse
            key={i}
            ghost
            size="small"
            items={[{
              key: '1',
              label: <Text type="secondary" style={{ fontSize: 12 }}>{seg.tag}</Text>,
              children: <pre style={{
                fontSize: 12,
                color: '#9ca3af',
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                margin: 0,
              }}>{seg.content}</pre>,
            }]}
            style={{ margin: '4px 0' }}
          />
        );
      }
      return (
        <div
          key={i}
          className="chat-md"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(seg.content) }}
        />
      );
    });
  }

  renderToolCall(tu) {
    // 如果 input 是字符串（流式组装残留），尝试解析
    if (typeof tu.input === 'string') {
      try {
        const cleaned = tu.input.replace(/^\[object Object\]/, '');
        tu = { ...tu, input: JSON.parse(cleaned) };
      } catch {
        // 无法解析，保持原样
      }
    }

    // Edit → diff 视图
    if (tu.name === 'Edit' && tu.input && tu.input.old_string != null && tu.input.new_string != null) {
      return (
        <DiffView
          key={tu.id}
          file_path={tu.input.file_path || ''}
          old_string={tu.input.old_string}
          new_string={tu.input.new_string}
        />
      );
    }

    const inp = (tu.input && typeof tu.input === 'object') ? tu.input : {};
    const box = (label, children) => (
      <div key={tu.id} style={{
        background: '#1a1a2e',
        border: '1px solid #2a2a3e',
        borderRadius: 8,
        padding: '8px 12px',
        margin: '6px 0',
        fontSize: 12,
      }}>
        <Text strong style={{ color: '#a78bfa' }}>{label}</Text>
        {children}
      </div>
    );

    const codePre = (text, color) => (
      <pre style={{
        color: color || '#e5e7eb',
        fontSize: 12,
        margin: '4px 0 0',
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-all',
        background: '#0d1117',
        borderRadius: 4,
        padding: '6px 8px',
      }}>{text}</pre>
    );

    const pathTag = (p) => (
      <span style={{ color: '#7dd3fc', fontSize: 11 }}>{p}</span>
    );

    // Bash: show command and description
    if (tu.name === 'Bash') {
      const cmd = inp.command || '';
      const desc = inp.description || '';
      return box(
        <>Bash{desc ? <span style={{ color: '#6b7280', fontWeight: 400 }}> — {desc}</span> : ''}</>,
        codePre(cmd, '#c9d1d9')
      );
    }

    // Read: show file path + range
    if (tu.name === 'Read') {
      const fp = inp.file_path || '';
      const parts = [];
      if (inp.offset) parts.push(`offset: ${inp.offset}`);
      if (inp.limit) parts.push(`limit: ${inp.limit}`);
      const range = parts.length ? ` (${parts.join(', ')})` : '';
      return box(
        <>Read: {pathTag(fp)}<span style={{ color: '#6b7280' }}>{range}</span></>,
        null
      );
    }

    // Write: show file path + content preview
    if (tu.name === 'Write') {
      const fp = inp.file_path || '';
      const content = inp.content || '';
      const lines = content.split('\n');
      const preview = lines.length > 20
        ? lines.slice(0, 20).join('\n') + `\n... (${lines.length} lines total)`
        : content;
      return box(
        <>Write: {pathTag(fp)} <span style={{ color: '#6b7280' }}>({lines.length} lines)</span></>,
        codePre(preview, '#c9d1d9')
      );
    }

    // Glob: show pattern + path
    if (tu.name === 'Glob') {
      const pattern = inp.pattern || '';
      const path = inp.path || '';
      return box(
        <>Glob: <span style={{ color: '#fbbf24' }}>{pattern}</span>{path ? <span style={{ color: '#6b7280' }}> in {path}</span> : ''}</>,
        null
      );
    }

    // Grep: show pattern + path + options
    if (tu.name === 'Grep') {
      const pattern = inp.pattern || '';
      const path = inp.path || '';
      const opts = [];
      if (inp.glob) opts.push(`glob: ${inp.glob}`);
      if (inp.output_mode) opts.push(`mode: ${inp.output_mode}`);
      if (inp.head_limit) opts.push(`limit: ${inp.head_limit}`);
      const optsStr = opts.length ? ` (${opts.join(', ')})` : '';
      return box(
        <>Grep: <span style={{ color: '#fbbf24' }}>/{pattern}/</span>{path ? <span style={{ color: '#6b7280' }}> in {path}</span> : ''}<span style={{ color: '#6b7280' }}>{optsStr}</span></>,
        null
      );
    }

    // Task: show subagent type + description
    if (tu.name === 'Task') {
      const st = inp.subagent_type || '';
      const desc = inp.description || '';
      return box(
        <>Task({st}{desc ? ': ' + desc : ''})</>,
        null
      );
    }

    // Default: structured key-value display
    let toolLabel = tu.name;
    const keys = Object.keys(inp);
    if (keys.length === 0) {
      return box(toolLabel, null);
    }
    const items = keys.map(k => {
      const v = inp[k];
      const vs = typeof v === 'string' ? v : JSON.stringify(v);
      const display = vs.length > 200 ? vs.substring(0, 200) + '...' : vs;
      return (
        <div key={k} style={{ margin: '2px 0' }}>
          <span style={{ color: '#7dd3fc' }}>{k}: </span>
          <span style={{ color: '#9ca3af' }}>{display}</span>
        </div>
      );
    });
    return box(toolLabel, <div style={{ marginTop: 4, fontSize: 11 }}>{items}</div>);
  }

  renderUserMessage() {
    const { text } = this.props;
    return (
      <div style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
        <div style={{ ...avatarBase, background: '#1e40af' }}
          dangerouslySetInnerHTML={{ __html: getSvgAvatar('user') }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          {this.renderLabel('User')}
          <div style={{ ...bubbleBase, background: '#1e3a5f', color: '#e5e7eb' }}>
            {escapeHtml(text)}
          </div>
        </div>
      </div>
    );
  }

  renderToolResult(tr) {
    if (!tr) return null;
    return (
      <div style={{
        background: '#111827',
        border: '1px solid #1e293b',
        borderRadius: 6,
        padding: '6px 10px',
        margin: '2px 0 6px',
        fontSize: 11,
      }}>
        <Text type="secondary" style={{ fontSize: 11 }}>{tr.label}</Text>
        <ToolResultView toolName={tr.toolName} toolInput={tr.toolInput} resultText={tr.resultText} />
      </div>
    );
  }

  renderAssistantMessage() {
    const { content, toolResultMap = {}, modelInfo } = this.props;
    // content is an array of blocks: thinking, text, tool_use
    const thinkingBlocks = content.filter(b => b.type === 'thinking');
    const textBlocks = content.filter(b => b.type === 'text');
    const toolUseBlocks = content.filter(b => b.type === 'tool_use');

    let innerContent = [];

    thinkingBlocks.forEach((tb, i) => {
      innerContent.push(
        <Collapse
          key={`think-${i}`}
          ghost
          size="small"
          items={[{
            key: '1',
            label: <Text type="secondary" style={{ fontSize: 12 }}>思考过程</Text>,
            children: <pre style={{
              fontSize: 12,
              color: '#9ca3af',
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-all',
              margin: 0,
            }}>{tb.thinking || ''}</pre>,
          }]}
          style={{ margin: '4px 0' }}
        />
      );
    });

    textBlocks.forEach((tb, i) => {
      if (tb.text) {
        const { segments } = renderAssistantText(tb.text);
        innerContent.push(
          <div key={`text-${i}`}>{this.renderSegments(segments)}</div>
        );
      }
    });

    toolUseBlocks.forEach(tu => {
      innerContent.push(this.renderToolCall(tu));
      // 紧跟工具返回结果
      const tr = toolResultMap[tu.id];
      if (tr) {
        innerContent.push(
          <React.Fragment key={`tr-${tu.id}`}>{this.renderToolResult(tr)}</React.Fragment>
        );
      }
    });

    if (innerContent.length === 0) return null;

    return (
      <div style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
        <div style={{ ...avatarBase, background: modelInfo?.color || '#065f46' }}
          dangerouslySetInnerHTML={{ __html: modelInfo?.svg || getSvgAvatar('agent') }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          {this.renderLabel(modelInfo?.name || 'MainAgent')}
          <div style={{ ...bubbleBase, background: '#1a2332', color: '#e5e7eb' }}>
            {innerContent}
          </div>
        </div>
      </div>
    );
  }

  renderSubAgentMessage() {
    const { label, resultText, toolName, toolInput } = this.props;
    return (
      <div style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
        <div style={{ ...avatarBase, background: '#4a1d96' }}
          dangerouslySetInnerHTML={{ __html: getSvgAvatar('sub') }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          {this.renderLabel(label)}
          <div style={{ ...bubbleBase, background: '#1a1a2e', color: '#e5e7eb' }}>
            <ToolResultView toolName={toolName} toolInput={toolInput} resultText={resultText} />
          </div>
        </div>
      </div>
    );
  }

  renderUserSelectionMessage() {
    const { questions, answers } = this.props;
    return (
      <div style={{ display: 'flex', gap: 10, padding: '8px 0', justifyContent: 'flex-end' }}>
        <div style={{ minWidth: 0, maxWidth: '85%' }}>
          {this.renderLabel('User', ' — 选择')}
          <div style={{ ...bubbleBase, background: '#1a3a1a', color: '#e5e7eb' }}>
            {questions && questions.map((q, qi) => {
              const answer = answers?.[q.question] || '未选择';
              return (
                <div key={qi} style={{ marginBottom: qi < questions.length - 1 ? 10 : 0 }}>
                  <div style={{ fontSize: 13, color: '#ccc', marginBottom: 4 }}>{q.question}</div>
                  <div style={{ paddingLeft: 8 }}>
                    {q.options && q.options.map((opt, oi) => {
                      const isSelected = answer === opt.label;
                      return (
                        <div key={oi} style={{
                          fontSize: 12,
                          padding: '1px 0',
                          color: isSelected ? '#e5e5e5' : '#666',
                          fontWeight: isSelected ? 600 : 'normal',
                        }}>
                          {isSelected ? '● ' : '○ '}{opt.label}
                          {opt.description && <span style={{ color: '#555', marginLeft: 6, fontWeight: 'normal' }}>— {opt.description}</span>}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={{ ...avatarBase, background: '#2ea043' }}
          dangerouslySetInnerHTML={{ __html: getSvgAvatar('user') }}
        />
      </div>
    );
  }

  render() {
    const { role } = this.props;
    if (role === 'user') return this.renderUserMessage();
    if (role === 'user-selection') return this.renderUserSelectionMessage();
    if (role === 'assistant') return this.renderAssistantMessage();
    if (role === 'sub-agent') return this.renderSubAgentMessage();
    return null;
  }
}

export default ChatMessage;

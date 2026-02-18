import React from 'react';
import { Collapse, Typography } from 'antd';
import { renderMarkdown } from '../utils/markdown';
import { escapeHtml, truncateText, getSvgAvatar } from '../utils/helpers';
import { renderAssistantText } from '../utils/systemTags';

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
    let toolLabel = tu.name;
    if (tu.name === 'Task' && tu.input) {
      const st = tu.input.subagent_type || '';
      const desc = tu.input.description || '';
      toolLabel = `Task(${st}${desc ? ': ' + desc : ''})`;
    }
    const inputPreview = tu.input ? truncateText(JSON.stringify(tu.input), 300) : '';
    return (
      <div key={tu.id} style={{
        background: '#1a1a2e',
        border: '1px solid #2a2a3e',
        borderRadius: 8,
        padding: '8px 12px',
        margin: '6px 0',
        fontSize: 12,
      }}>
        <Text strong style={{ color: '#a78bfa' }}>{toolLabel}</Text>
        {inputPreview && (
          <pre style={{
            color: '#9ca3af',
            fontSize: 11,
            margin: '4px 0 0',
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-all',
          }}>{inputPreview}</pre>
        )}
      </div>
    );
  }

  renderUserMessage() {
    const { text } = this.props;
    return (
      <div style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
        <div style={{ ...avatarBase, background: '#1e40af' }}
          dangerouslySetInnerHTML={{ __html: getSvgAvatar('user') }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>User</Text>
          <div style={{ ...bubbleBase, background: '#1e3a5f', color: '#e5e7eb' }}>
            {escapeHtml(text)}
          </div>
        </div>
      </div>
    );
  }

  renderAssistantMessage() {
    const { content } = this.props;
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
    });

    if (innerContent.length === 0) return null;

    return (
      <div style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
        <div style={{ ...avatarBase, background: '#065f46' }}
          dangerouslySetInnerHTML={{ __html: getSvgAvatar('agent') }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>MainAgent</Text>
          <div style={{ ...bubbleBase, background: '#1a2332', color: '#e5e7eb' }}>
            {innerContent}
          </div>
        </div>
      </div>
    );
  }

  renderSubAgentMessage() {
    const { label, resultText } = this.props;
    return (
      <div style={{ display: 'flex', gap: 10, padding: '8px 0' }}>
        <div style={{ ...avatarBase, background: '#4a1d96' }}
          dangerouslySetInnerHTML={{ __html: getSvgAvatar('sub') }}
        />
        <div style={{ minWidth: 0, flex: 1 }}>
          <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 2 }}>{label}</Text>
          <div style={{ ...bubbleBase, background: '#1a1a2e', color: '#e5e7eb' }}>
            <div style={{
              background: '#111',
              borderRadius: 6,
              padding: '8px 12px',
              fontSize: 12,
            }}>
              <Text type="secondary" style={{ fontSize: 11, display: 'block', marginBottom: 4 }}>Result</Text>
              <pre style={{
                color: '#d1d5db',
                margin: 0,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-all',
                fontSize: 12,
              }}>{escapeHtml(truncateText(resultText, 1000))}</pre>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { role } = this.props;
    if (role === 'user') return this.renderUserMessage();
    if (role === 'assistant') return this.renderAssistantMessage();
    if (role === 'sub-agent') return this.renderSubAgentMessage();
    return null;
  }
}

export default ChatMessage;

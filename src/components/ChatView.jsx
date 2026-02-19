import React from 'react';
import { Empty, Typography, Divider } from 'antd';
import ChatMessage from './ChatMessage';
import { extractToolResultText, isSystemText } from '../utils/helpers';
import { renderAssistantText } from '../utils/systemTags';

const { Text } = Typography;

class ChatView extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const el = this.containerRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }

  renderSessionMessages(messages, keyPrefix, msgTimestamps) {
    // 构建 tool_use_id → tool_use 映射
    const toolUseMap = {};
    for (const msg of messages) {
      if (msg.role === 'assistant' && Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block.type === 'tool_use') {
            toolUseMap[block.id] = block;
          }
        }
      }
    }

    // 构建 tool_use_id → tool_result 映射
    const toolResultMap = {};
    for (const msg of messages) {
      if (msg.role === 'user' && Array.isArray(msg.content)) {
        for (const block of msg.content) {
          if (block.type === 'tool_result') {
            const matchedTool = toolUseMap[block.tool_use_id];
            let label = '工具返回';
            let toolName = null;
            let toolInput = null;
            if (matchedTool) {
              toolName = matchedTool.name;
              toolInput = matchedTool.input;
              if (matchedTool.name === 'Task' && matchedTool.input) {
                const st = matchedTool.input.subagent_type || '';
                const desc = matchedTool.input.description || '';
                label = `SubAgent: ${st}${desc ? ' — ' + desc : ''}`;
              } else {
                label = matchedTool.name + ' 返回';
              }
            }
            toolResultMap[block.tool_use_id] = {
              label,
              toolName,
              toolInput,
              resultText: extractToolResultText(block),
            };
          }
        }
      }
    }

    const renderedMessages = [];

    for (let mi = 0; mi < messages.length; mi++) {
      const msg = messages[mi];
      const content = msg.content;
      const ts = msgTimestamps && msgTimestamps[mi] ? msgTimestamps[mi] : null;

      if (msg.role === 'user') {
        if (Array.isArray(content)) {
          // 检测是否为 suggestion mode（用户选择）
          const suggestionText = content.find(b => b.type === 'text' && /^\[SUGGESTION MODE:/i.test((b.text || '').trim()));
          const toolResults = content.filter(b => b.type === 'tool_result');

          if (suggestionText && toolResults.length > 0) {
            // 用户选择型消息
            let questions = null;
            let answers = {};
            for (const tr of toolResults) {
              const matchedTool = toolUseMap[tr.tool_use_id];
              if (matchedTool && matchedTool.name === 'AskUserQuestion' && matchedTool.input?.questions) {
                questions = matchedTool.input.questions;
                const resultText = extractToolResultText(tr);
                try {
                  const parsed = JSON.parse(resultText);
                  answers = parsed.answers || {};
                } catch {}
                break;
              }
            }

            if (questions) {
              renderedMessages.push(
                <ChatMessage key={`${keyPrefix}-selection-${mi}`} role="user-selection" questions={questions} answers={answers} timestamp={ts} />
              );
            }
          } else {
            // 普通用户消息 — tool_result 不再单独渲染，已归入 assistant 消息
            const textBlocks = content.filter(b => b.type === 'text' && !isSystemText(b.text));

            for (let ti = 0; ti < textBlocks.length; ti++) {
              renderedMessages.push(
                <ChatMessage key={`${keyPrefix}-user-${mi}-${ti}`} role="user" text={textBlocks[ti].text} timestamp={ts} />
              );
            }
          }
        } else if (typeof content === 'string' && !isSystemText(content)) {
          renderedMessages.push(
            <ChatMessage key={`${keyPrefix}-user-${mi}`} role="user" text={content} timestamp={ts} />
          );
        }
      } else if (msg.role === 'assistant') {
        if (Array.isArray(content)) {
          renderedMessages.push(
            <ChatMessage key={`${keyPrefix}-asst-${mi}`} role="assistant" content={content} toolResultMap={toolResultMap} timestamp={ts} />
          );
        } else if (typeof content === 'string') {
          renderedMessages.push(
            <ChatMessage key={`${keyPrefix}-asst-${mi}`} role="assistant" content={[{ type: 'text', text: content }]} toolResultMap={toolResultMap} timestamp={ts} />
          );
        }
      }
    }

    return renderedMessages;
  }

  render() {
    const { mainAgentSessions } = this.props;

    if (!mainAgentSessions || mainAgentSessions.length === 0) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Empty description="暂无 mainAgent 对话数据" />
        </div>
      );
    }

    const allRendered = [];

    mainAgentSessions.forEach((session, si) => {
      // session 之间加分隔线（第一个 session 之前不加）
      if (si > 0) {
        allRendered.push(
          <Divider key={`session-div-${si}`} style={{ borderColor: '#333', margin: '16px 0' }}>
            <Text style={{ fontSize: 11, color: '#555' }}>此处基模出现userId切换会让上下文出现部分丢失</Text>
          </Divider>
        );
      }

      // 渲染该 session 的 messages
      allRendered.push(...this.renderSessionMessages(session.messages, `s${si}`, session.msgTimestamps));

      // 最后一个 session 渲染 response
      if (si === mainAgentSessions.length - 1 && session.response?.body?.content) {
        const respContent = session.response.body.content;
        if (Array.isArray(respContent)) {
          allRendered.push(
            <React.Fragment key="resp-divider">
              <Divider style={{ borderColor: '#2a2a2a', margin: '8px 0' }}>
                <Text type="secondary" style={{ fontSize: 11 }}>Last Response</Text>
              </Divider>
            </React.Fragment>
          );
          allRendered.push(
            <ChatMessage key="resp-asst" role="assistant" content={respContent} />
          );
        }
      }
    });

    return (
      <div
        ref={this.containerRef}
        style={{
          height: '100%',
          overflow: 'auto',
          padding: '16px 24px',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {allRendered}
      </div>
    );
  }
}

export default ChatView;

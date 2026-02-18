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

  render() {
    const { requests } = this.props;

    // 找到最新的 mainAgent 请求
    let mainReq = null;
    for (let i = requests.length - 1; i >= 0; i--) {
      if (requests[i].mainAgent === true) {
        mainReq = requests[i];
        break;
      }
    }

    if (!mainReq || !mainReq.body || !mainReq.body.messages) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Empty description="暂无 mainAgent 对话数据" />
        </div>
      );
    }

    const messages = mainReq.body.messages;

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

    const renderedMessages = [];

    for (let mi = 0; mi < messages.length; mi++) {
      const msg = messages[mi];
      const content = msg.content;

      if (msg.role === 'user') {
        if (Array.isArray(content)) {
          const toolResults = content.filter(b => b.type === 'tool_result');
          const textBlocks = content.filter(b => b.type === 'text' && !isSystemText(b.text));

          for (const tr of toolResults) {
            const matchedTool = toolUseMap[tr.tool_use_id];
            let label = '工具返回';
            if (matchedTool) {
              if (matchedTool.name === 'Task' && matchedTool.input) {
                const st = matchedTool.input.subagent_type || '';
                const desc = matchedTool.input.description || '';
                label = `SubAgent: ${st}${desc ? ' — ' + desc : ''}`;
              } else {
                label = matchedTool.name + ' 返回';
              }
            }
            const resultText = extractToolResultText(tr);
            renderedMessages.push(
              <ChatMessage key={`sub-${mi}-${tr.tool_use_id}`} role="sub-agent" label={label} resultText={resultText} />
            );
          }

          for (let ti = 0; ti < textBlocks.length; ti++) {
            renderedMessages.push(
              <ChatMessage key={`user-${mi}-${ti}`} role="user" text={textBlocks[ti].text} />
            );
          }
        } else if (typeof content === 'string' && !isSystemText(content)) {
          renderedMessages.push(
            <ChatMessage key={`user-${mi}`} role="user" text={content} />
          );
        }
      } else if (msg.role === 'assistant') {
        if (Array.isArray(content)) {
          renderedMessages.push(
            <ChatMessage key={`asst-${mi}`} role="assistant" content={content} />
          );
        } else if (typeof content === 'string') {
          renderedMessages.push(
            <ChatMessage key={`asst-${mi}`} role="assistant" content={[{ type: 'text', text: content }]} />
          );
        }
      }
    }

    // 渲染 response 中 assistant 的最终回复
    if (mainReq.response && mainReq.response.body && mainReq.response.body.content) {
      const respContent = mainReq.response.body.content;
      if (Array.isArray(respContent)) {
        renderedMessages.push(
          <React.Fragment key="resp-divider">
            <Divider style={{ borderColor: '#2a2a2a', margin: '8px 0' }}>
              <Text type="secondary" style={{ fontSize: 11 }}>Response</Text>
            </Divider>
          </React.Fragment>
        );
        renderedMessages.push(
          <ChatMessage key="resp-asst" role="assistant" content={respContent} />
        );
      }
    }

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
        {renderedMessages}
      </div>
    );
  }
}

export default ChatView;

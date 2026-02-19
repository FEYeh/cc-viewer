import React from 'react';
import { Space, Tag, Button, Badge, Typography, Dropdown, Popover, Modal, Collapse } from 'antd';
import { MessageOutlined, FileTextOutlined, ImportOutlined, DownOutlined, DashboardOutlined, SaveOutlined, ExportOutlined } from '@ant-design/icons';
import { isSystemText } from '../utils/helpers';

const { Text } = Typography;

function formatTokenCount(n) {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + 'M';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'K';
  return String(n);
}

function computeTokenStats(requests) {
  const byModel = {};
  for (const req of requests) {
    const usage = req.response?.body?.usage;
    if (!usage) continue;
    const model = req.body?.model || 'unknown';
    if (!byModel[model]) {
      byModel[model] = { input: 0, output: 0, cacheCreation: 0, cacheRead: 0 };
    }
    const s = byModel[model];
    s.input += (usage.input_tokens || 0);
    s.output += (usage.output_tokens || 0);
    s.cacheCreation += (usage.cache_creation_input_tokens || 0);
    s.cacheRead += (usage.cache_read_input_tokens || 0);
  }
  return byModel;
}

class AppHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = { countdownText: '', promptModalVisible: false, promptData: [] };
    this._rafId = null;
    this._expiredTimer = null;
    this.updateCountdown = this.updateCountdown.bind(this);
  }

  componentDidMount() {
    this.startCountdown();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cacheExpireAt !== this.props.cacheExpireAt) {
      this.startCountdown();
    }
  }

  componentWillUnmount() {
    if (this._rafId) cancelAnimationFrame(this._rafId);
    if (this._expiredTimer) clearTimeout(this._expiredTimer);
  }

  startCountdown() {
    if (this._rafId) cancelAnimationFrame(this._rafId);
    if (this._expiredTimer) clearTimeout(this._expiredTimer);
    if (!this.props.cacheExpireAt) {
      this.setState({ countdownText: '' });
      return;
    }
    this._rafId = requestAnimationFrame(this.updateCountdown);
  }

  updateCountdown() {
    const { cacheExpireAt } = this.props;
    if (!cacheExpireAt) {
      this.setState({ countdownText: '' });
      return;
    }

    const remaining = Math.max(0, cacheExpireAt - Date.now());
    if (remaining <= 0) {
      this.setState({ countdownText: '已失效' });
      this._expiredTimer = setTimeout(() => {
        this.setState({ countdownText: '' });
      }, 5000);
      return;
    }

    const totalSec = Math.ceil(remaining / 1000);
    let text;
    if (totalSec >= 60) {
      const m = Math.floor(totalSec / 60);
      const s = totalSec % 60;
      text = `${m}分${String(s).padStart(2, '0')}秒`;
    } else {
      text = `${totalSec}秒`;
    }
    this.setState({ countdownText: text });
    this._rafId = requestAnimationFrame(this.updateCountdown);
  }

  // 将一段文本拆分为普通文本和 system-reminder 片段
  static parseSegments(text) {
    const segments = [];
    const regex = /<system-reminder>([\s\S]*?)<\/system-reminder>/g;
    let lastIndex = 0;
    let sysIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      const before = text.slice(lastIndex, match.index).trim();
      if (before) segments.push({ type: 'text', content: before });
      sysIndex++;
      segments.push({ type: 'system', content: match[1].trim(), label: `系统上下文_${sysIndex}` });
      lastIndex = match.index + match[0].length;
    }
    const after = text.slice(lastIndex).trim();
    if (after) segments.push({ type: 'text', content: after });
    return segments;
  }

  // 从 response content 中提取内容（thinking blocks + 最后的 text 作为提问）
  static extractResponseContent(responseBody) {
    const content = responseBody?.content;
    if (!Array.isArray(content)) return null;
    const thinkingBlocks = [];
    let questionText = '';
    for (const block of content) {
      if (block.type === 'thinking') {
        thinkingBlocks.push(block.thinking || '');
      } else if (block.type === 'text') {
        questionText = block.text || '';
      }
    }
    return { thinkingBlocks, questionText };
  }

  // 从 response content 中提取用户回答（text block）
  static extractAnswerText(responseBody) {
    const content = responseBody?.content;
    if (!Array.isArray(content)) return '';
    for (const block of content) {
      if (block.type === 'text' && block.text) return block.text;
    }
    return '';
  }

  extractUserPrompts() {
    const { requests = [] } = this.props;
    const prompts = [];
    let prevUserCount = 0;
    let prevLastMsg = '';
    const mainAgentRequests = requests.filter(r => r.mainAgent);
    for (let ri = 0; ri < mainAgentRequests.length; ri++) {
      const req = mainAgentRequests[ri];
      const messages = req.body?.messages || [];
      const timestamp = req.timestamp || '';
      // userMsgs: 非系统文本，用于计数和判断新增
      // fullTexts: 完整文本（含 system-reminder），用于展示
      const userMsgs = [];
      const fullTexts = [];
      for (const msg of messages) {
        if (msg.role !== 'user') continue;
        if (typeof msg.content === 'string') {
          const text = msg.content.trim();
          if (!text) continue;
          if (!isSystemText(text) || /^\[SUGGESTION MODE:/i.test(text)) {
            userMsgs.push(text);
            fullTexts.push(text);
          }
        } else if (Array.isArray(msg.content)) {
          // 收集该 message 所有 text blocks 的完整拼接（含系统文本，用于展示）
          // 同时逐 block 判断是否有非系统文本（用于计数）
          const allText = msg.content
            .filter(b => b.type === 'text' && b.text?.trim())
            .map(b => b.text.trim())
            .join('\n');
          let hasUserText = false;
          for (const b of msg.content) {
            if (b.type !== 'text' || !b.text?.trim()) continue;
            const text = b.text.trim();
            if (!isSystemText(text) || /^\[SUGGESTION MODE:/i.test(text)) {
              hasUserText = true;
              break;
            }
          }
          if (hasUserText && allText) {
            userMsgs.push(allText);
            fullTexts.push(allText);
          }
        }
      }
      const lastMsg = userMsgs.length > 0 ? userMsgs[userMsgs.length - 1] : '';
      const lastFull = fullTexts.length > 0 ? fullTexts[fullTexts.length - 1] : '';
      if (userMsgs.length > 0 && (userMsgs.length > prevUserCount || lastMsg !== prevLastMsg)) {
        const raw = lastFull;
        if (/^\[SUGGESTION MODE:/i.test(lastMsg.trim())) {
          // 用户选择型 prompt
          // 前一个请求的 response content: thinking(可选) + text(Claude的提问)
          // 当前请求的 response content: text(用户的回答)
          const prevReq = ri > 0 ? mainAgentRequests[ri - 1] : null;
          const prevContent = prevReq ? AppHeader.extractResponseContent(prevReq.response?.body) : null;
          const answerText = AppHeader.extractAnswerText(req.response?.body);
          prompts.push({ type: 'selection', prevContent, answerText, timestamp });
        } else {
          prompts.push({ type: 'prompt', segments: AppHeader.parseSegments(raw), timestamp });
        }
      }
      prevUserCount = userMsgs.length;
      prevLastMsg = lastMsg;
    }
    return prompts;
  }

  handleShowPrompts = () => {
    this.setState({
      promptModalVisible: true,
      promptData: this.extractUserPrompts(),
    });
  }

  renderTokenStats() {
    const { requests = [] } = this.props;
    const byModel = computeTokenStats(requests);
    const models = Object.keys(byModel);

    if (models.length === 0) {
      return (
        <div style={{ padding: '8px 4px', color: '#999', fontSize: 13 }}>
          暂无 token 数据
        </div>
      );
    }

    const th = { padding: '2px 12px', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'nowrap', color: '#888', fontWeight: 'normal', textAlign: 'right' };
    const td = { padding: '2px 12px', fontSize: 12, fontFamily: 'monospace', whiteSpace: 'nowrap', color: '#e5e5e5', textAlign: 'right' };
    const label = { ...th, textAlign: 'left', color: '#aaa' };

    return (
      <div style={{ minWidth: 240 }}>
        {models.map((model) => {
          const s = byModel[model];
          const totalInput = s.input + s.cacheCreation + s.cacheRead;
          const cacheHitRate = totalInput > 0 ? ((s.cacheRead / totalInput) * 100).toFixed(1) : '0.0';
          return (
            <div key={model} style={{
              marginBottom: models.length > 1 ? 10 : 0,
              border: '1px solid #333',
              borderRadius: 6,
              padding: '8px 10px',
            }}>
              <div style={{
                fontSize: 13,
                fontWeight: 600,
                color: '#e5e5e5',
                marginBottom: 8,
                paddingBottom: 4,
                borderBottom: '1px solid #333',
              }}>
                {model}
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  <tr>
                    <td style={label}>Token</td>
                    <td style={th}>input</td>
                    <td style={th}>output</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                    <td style={label}></td>
                    <td style={td}>{formatTokenCount(totalInput)}</td>
                    <td style={td}>{formatTokenCount(s.output)}</td>
                  </tr>
                  <tr>
                    <td style={label}>Cache</td>
                    <td style={th}>create</td>
                    <td style={th}>read</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #2a2a2a' }}>
                    <td style={label}></td>
                    <td style={td}>{formatTokenCount(s.cacheCreation)}</td>
                    <td style={td}>{formatTokenCount(s.cacheRead)}</td>
                  </tr>
                  <tr>
                    <td style={label}>命中率</td>
                    <td colSpan={2} style={td}>{cacheHitRate}%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    );
  }

  renderTextPrompt(p) {
    return (
      <div style={{
        margin: '4px 0',
        background: '#141414',
        borderRadius: 6,
        border: '1px solid #303030',
        padding: '10px 14px',
      }}>
        {p.segments.map((seg, j) => {
          if (seg.type === 'text') {
            return (
              <pre key={j} style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: 13,
                lineHeight: 1.6,
                color: '#d9d9d9',
                margin: '4px 0',
              }}>{seg.content}</pre>
            );
          }
          return (
            <Collapse
              key={j}
              size="small"
              style={{ margin: '4px 0', background: '#1a1a1a', border: '1px solid #303030', borderRadius: 6 }}
              items={[{
                key: `sys-${j}`,
                label: <span style={{ color: '#888', fontSize: 12 }}>{seg.label}</span>,
                children: (
                  <pre style={{
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                    fontSize: 12,
                    lineHeight: 1.5,
                    color: '#999',
                    margin: 0,
                  }}>{seg.content}</pre>
                ),
              }]}
            />
          );
        })}
      </div>
    );
  }

  renderSelectionPrompt(p) {
    const { prevContent, answerText } = p;

    return (
      <div style={{
        margin: '4px 0',
        background: '#141414',
        borderRadius: 6,
        border: '1px solid #303030',
      }}>
        {/* Claude 的提问（前一个请求的 response） */}
        {prevContent && (
          <div style={{ padding: '10px 14px', borderBottom: '1px solid #252525' }}>
            <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>🤖 Claude</div>
            {prevContent.thinkingBlocks.length > 0 && (
              <Collapse
                size="small"
                style={{ marginBottom: 6, background: '#1a1a1a', border: '1px solid #303030', borderRadius: 6 }}
                items={[{
                  key: 'thinking',
                  label: <span style={{ color: '#888', fontSize: 12 }}>thinking</span>,
                  children: (
                    <pre style={{
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                      fontSize: 12,
                      lineHeight: 1.5,
                      color: '#999',
                      margin: 0,
                    }}>{prevContent.thinkingBlocks.join('\n\n')}</pre>
                  ),
                }]}
              />
            )}
            <pre style={{
              whiteSpace: 'pre-wrap',
              wordBreak: 'break-word',
              fontSize: 13,
              lineHeight: 1.6,
              color: '#bbb',
              margin: 0,
            }}>{prevContent.questionText}</pre>
          </div>
        )}
        {/* 用户的回答（当前请求的 response） */}
        <div style={{ padding: '10px 14px' }}>
          <div style={{ fontSize: 12, color: '#888', marginBottom: 6 }}>👤 用户选择</div>
          <pre style={{
            whiteSpace: 'pre-wrap',
            wordBreak: 'break-word',
            fontSize: 13,
            lineHeight: 1.6,
            color: '#d9d9d9',
            margin: 0,
            fontWeight: 600,
          }}>{answerText || '无回答'}</pre>
        </div>
      </div>
    );
  }

  render() {
    const { requestCount, viewMode, cacheType, onToggleViewMode, onImportLocalLogs, isLocalLog, localLogFile } = this.props;
    const { countdownText } = this.state;

    const menuItems = [
      {
        key: 'import-local',
        icon: <ImportOutlined />,
        label: '导入本地日志',
        onClick: onImportLocalLogs,
      },
      {
        key: 'save-log',
        icon: <SaveOutlined />,
        label: '当前日志另存为',
        onClick: () => {
          const a = document.createElement('a');
          a.href = '/api/download-log';
          a.click();
        },
      },
      {
        key: 'export-prompts',
        icon: <ExportOutlined />,
        label: '导出用户Prompt',
        onClick: this.handleShowPrompts,
      },
    ];

    return (
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
      }}>
        <Space size="middle">
          <Dropdown menu={{ items: menuItems }} trigger={['hover']}>
            <Text strong style={{ color: '#fff', fontSize: 18, cursor: 'pointer' }}>
              CC-Viewer <DownOutlined style={{ fontSize: 12, marginLeft: 4 }} />
            </Text>
          </Dropdown>
          <Popover
            content={this.renderTokenStats()}
            trigger="hover"
            placement="bottomLeft"
            overlayInnerStyle={{ background: '#1e1e1e', border: '1px solid #3a3a3a', borderRadius: 8, padding: '8px 8px' }}
          >
            <Tag style={{ borderRadius: 12, cursor: 'pointer', background: '#2a2a2a', border: '1px solid #3a3a3a', color: '#ccc' }}>
              <DashboardOutlined style={{ marginRight: 4 }} />
              Token 消耗统计
            </Tag>
          </Popover>
          <Tag color="green" style={{ borderRadius: 12 }}>
            <Badge status="processing" color="green" />
            <span style={{ marginLeft: 4 }}>{isLocalLog ? `历史日志: ${localLogFile}` : '实时监控中'}</span>
          </Tag>
        </Space>

        <Space size="middle">
          {countdownText && (
            <Tag color={countdownText === '已失效' ? 'red' : 'green'}>
              MainAgent缓存{cacheType ? `(${cacheType})` : ''}失效倒计时：
              <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{countdownText}</strong>
            </Tag>
          )}
          <Button
            size="small"
            icon={viewMode === 'raw' ? <MessageOutlined /> : <FileTextOutlined />}
            onClick={onToggleViewMode}
          >
            {viewMode === 'raw' ? '对话模式' : '原文模式'}
          </Button>
        </Space>
        <Modal
          title="用户 Prompt"
          open={this.state.promptModalVisible}
          onCancel={() => this.setState({ promptModalVisible: false })}
          footer={null}
          width={700}
        >
          <div style={{ maxHeight: 500, overflow: 'auto' }}>
            {this.state.promptData.length === 0 && (
              <div style={{ color: '#999', padding: 12 }}>暂无用户 Prompt</div>
            )}
            {this.state.promptData.map((p, i) => {
              const ts = p.timestamp ? new Date(p.timestamp).toLocaleString() : '未知时间';
              return (
                <div key={i}>
                  <div style={{
                    textAlign: 'center',
                    color: '#666',
                    fontSize: 12,
                    margin: '12px 0 8px',
                    borderBottom: '1px solid #303030',
                    paddingBottom: 6,
                  }}>
                    --- {ts} ---
                  </div>
                  {p.type === 'selection' ? this.renderSelectionPrompt(p) : this.renderTextPrompt(p)}
                </div>
              );
            })}
          </div>
        </Modal>
      </div>
    );
  }
}

export default AppHeader;

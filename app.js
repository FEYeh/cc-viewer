let requests = [];
let selectedIndex = null;
let currentTab = 'request';
let collapsedSections = {
  requestHeaders: true,
  responseHeaders: true
};
let bodyViewMode = { request: 'json', response: 'json' };
let viewMode = 'raw';
let _autoSelectTimer = null;

// 使用第三方库渲染 JSON
function renderJson(data, containerId) {
  try {
    const container = document.getElementById(containerId);
    if (!container) {
      console.error('找不到容器:', containerId);
      return;
    }

    // 清空容器
    container.innerHTML = '';

    // 判断根类型的括号
    const isArray = Array.isArray(data);
    const isObject = data !== null && typeof data === 'object';
    const openBracket = isArray ? '[' : (isObject ? '{' : '');
    const closeBracket = isArray ? ']' : (isObject ? '}' : '');

    // 等待 json-viewer 组件定义完成
    customElements.whenDefined('json-viewer').then(() => {
      // 添加根级开括号
      if (openBracket) {
        const open = document.createElement('span');
        open.textContent = openBracket;
        open.style.cssText = 'color: #e5e7eb; font-family: var(--font-family, monospace); font-size: 13px; display: block; line-height: 1.5rem;';
        container.appendChild(open);
      }

      // 创建 json-viewer 元素
      const viewer = document.createElement('json-viewer');
      viewer.data = data;

      // 添加到容器
      container.appendChild(viewer);

      requestAnimationFrame(() => {
        try {
          if (containerId === 'response-body-viewer') {
            // response body 默认全部展开
            viewer.expandAll();
          } else if (containerId === 'request-body-viewer') {
            // request body 中 messages/system/tools 展开一层
            viewer.setState((state) => ({
              expanded: {
                ...state.expanded,
                messages: true,
                system: true,
                tools: true
              }
            }));
          }
        } catch (e) {}
      });

      // 添加根级闭括号
      if (closeBracket) {
        const close = document.createElement('span');
        close.textContent = closeBracket;
        close.style.cssText = 'color: #e5e7eb; font-family: var(--font-family, monospace); font-size: 13px; display: block; line-height: 1.5rem;';
        container.appendChild(close);
      }
    }).catch(error => {
      console.error('json-viewer 组件加载失败:', error);
      container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    });
  } catch (error) {
    console.error('JSON渲染错误:', error);
    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
    }
  }
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// 将 markdown 文本渲染为 HTML（用于 assistant/subAgent 回复）
function renderMarkdown(text) {
  if (!text) return '';
  if (typeof marked !== 'undefined' && marked.parse) {
    try {
      return marked.parse(text, { breaks: true });
    } catch (e) {
      return escapeHtml(text);
    }
  }
  return escapeHtml(text);
}

// 已知的系统注入标签名（出现在 assistant text 中需要折叠展示）
const SYSTEM_TAGS = [
  'system-reminder', 'local-command-caveat', 'project-reminder',
  'important-instruction-reminders', 'file-modified-reminder', 'todo-reminder',
  'user-prompt-submit-hook', 'local-command-stdout', 'command-name',
  'task-notification', 'environment_details', 'context'
];

// 从文本中提取系统标签块，返回 { segments: [{type, tag?, content}] }
function parseSystemTags(text) {
  if (!text) return { segments: [] };
  const tagPattern = new RegExp(
    '<(' + SYSTEM_TAGS.join('|') + ')\\b[^>]*>([\\s\\S]*?)</\\1>',
    'gi'
  );
  const segments = [];
  let lastIndex = 0;
  let match;
  while ((match = tagPattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      const before = text.slice(lastIndex, match.index).trim();
      if (before) segments.push({ type: 'text', content: before });
    }
    segments.push({ type: 'system-tag', tag: match[1], content: match[2].trim() });
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    const rest = text.slice(lastIndex).trim();
    if (rest) segments.push({ type: 'text', content: rest });
  }
  return { segments };
}

// 渲染 assistant 文本：系统标签折叠，其余走 markdown
function renderAssistantText(text) {
  const { segments } = parseSystemTags(text);
  if (segments.length === 0) return '';
  let html = '';
  for (const seg of segments) {
    if (seg.type === 'system-tag') {
      html += `<details class="chat-thinking"><summary>${escapeHtml(seg.tag)}</summary><div class="chat-thinking-content">${escapeHtml(seg.content)}</div></details>`;
    } else {
      html += `<div class="chat-md">${renderMarkdown(seg.content)}</div>`;
    }
  }
  return html;
}

// 等待DOM加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // 拖拽调整宽度功能
  const leftPanel = document.getElementById('left-panel');
  const resizer = document.getElementById('resizer');

  if (!leftPanel || !resizer) {
    console.error('无法找到必要的DOM元素');
    return;
  }

  let isResizing = false;

  resizer.addEventListener('mousedown', (e) => {
    isResizing = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isResizing) return;

    const containerRect = document.querySelector('.main-container').getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;

    // 限制最小和最大宽度
    if (newWidth >= 250 && newWidth <= 800) {
      leftPanel.style.width = newWidth + 'px';
    }
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }
  });

  // 初始化EventSource连接
  initializeEventSource();
}

function initializeEventSource() {
  try {
    const eventSource = new EventSource('/events');

    eventSource.onmessage = handleEventMessage;
    eventSource.onerror = handleEventError;
  } catch (error) {
    console.error('EventSource初始化失败:', error);
  }
}

function handleEventMessage(event) {
  try {
    const entry = JSON.parse(event.data);

    // 直接添加新的请求条目
    const existingIndex = requests.findIndex(r =>
      r.timestamp === entry.timestamp && r.url === entry.url
    );

    if (existingIndex >= 0) {
      requests[existingIndex] = entry;
    } else {
      requests.push(entry);
    }

    renderRequests();

    // 没有选中状态时，等初始数据加载完后选中最后一条
    if (selectedIndex === null && requests.length > 0) {
      clearTimeout(_autoSelectTimer);
      _autoSelectTimer = setTimeout(() => {
        if (selectedIndex === null && requests.length > 0) {
          selectedIndex = requests.length - 1;
          renderRequests();
          renderDetail();
          const list = document.getElementById('request-list');
          if (list) list.scrollTop = list.scrollHeight;
        }
      }, 200);
    } else if (selectedIndex === requests.length - 1) {
      // 如果当前选中的是最新的请求，自动更新详情
      renderDetail();
    }

    // 对话模式下自动刷新
    if (viewMode === 'chat') {
      renderChatView();
    }
  } catch (error) {
    console.error('处理事件消息失败:', error);
  }
}

function handleEventError() {
  console.error('SSE连接错误');
}


function renderRequests() {
  const container = document.getElementById('request-list');
  document.getElementById('total-count').textContent = requests.length;

  if (requests.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <p>等待请求...</p>
      </div>
    `;
    selectedIndex = null;
    renderDetail();
    return;
  }

  container.innerHTML = requests.map((req, index) => {
    const time = new Date(req.timestamp).toLocaleTimeString('zh-CN');
    const urlObj = new URL(req.url);
    const urlPreview = urlObj.pathname + urlObj.search;

    const statusClass = req.response
      ? (req.response.status < 400 ? 'status-success' : 'status-error')
      : '';
    const statusText = req.response ? `HTTP ${req.response.status}` : '';

    return `
      <div class="request-item ${index === selectedIndex ? 'active' : ''} ${req.mainAgent ? 'main-agent' : ''}" onclick="selectRequest(${index})">
        <div class="request-item-header">
          <span class="method ${req.method}">${req.method}</span>
          ${req.mainAgent ? '<span class="agent-badge main">MainAgent</span>' : '<span class="agent-badge sub">SubAgent</span>'}
          <span class="timestamp">${time}</span>
        </div>
        <div class="url-preview" title="${req.url}">${urlPreview}</div>
        ${req.duration || req.response ? `
          <div class="request-meta">
            ${req.duration ? `<span>⏱️ ${req.duration}ms</span>` : ''}
            ${req.response ? `<span class="${statusClass}">${statusText}</span>` : ''}
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function selectRequest(index) {
  selectedIndex = index;
  renderRequests();
  renderDetail();
}

function renderDetail() {
  const container = document.getElementById('right-panel');

  if (selectedIndex === null || !requests[selectedIndex]) {
    container.innerHTML = `
      <div class="empty-detail">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path>
        </svg>
        <p>选择一个请求查看详情</p>
      </div>
    `;
    return;
  }

  const req = requests[selectedIndex];
  const time = new Date(req.timestamp).toLocaleString('zh-CN');

  // Build headers tables
  const requestHeadersTable = req.headers
    ? Object.entries(req.headers).map(([key, value]) =>
        `<tr><td>${key}</td><td>${value}</td></tr>`
      ).join('')
    : '<tr><td colspan="2">无 Headers</td></tr>';

  const responseHeadersTable = req.response?.headers
    ? Object.entries(req.response.headers).map(([key, value]) =>
        `<tr><td>${key}</td><td>${value}</td></tr>`
      ).join('')
    : '<tr><td colspan="2">无 Headers</td></tr>';

  container.innerHTML = `
    <div class="detail-header">
      <div class="detail-url">${req.url}</div>
      <div class="detail-meta">
        <div class="detail-meta-item">
          <span class="method ${req.method}">${req.method}</span>
        </div>
        <div class="detail-meta-item">
          <span>🕐 ${time}</span>
        </div>
        ${req.duration ? `
          <div class="detail-meta-item">
            <span>⏱️ ${req.duration}ms</span>
          </div>
        ` : ''}
        ${req.response ? `
          <div class="detail-meta-item">
            <span class="${req.response.status < 400 ? 'status-success' : 'status-error'}">
              HTTP ${req.response.status}
            </span>
          </div>
        ` : ''}
      </div>
    </div>

    <div class="tabs">
      <div class="tab ${currentTab === 'request' ? 'active' : ''}" onclick="switchTab('request')">
        Request
      </div>
      <div class="tab ${currentTab === 'response' ? 'active' : ''}" onclick="switchTab('response')">
        Response
      </div>
    </div>

    <div class="tab-content">
      <div class="tab-pane ${currentTab === 'request' ? 'active' : ''}">
        <div class="info-section">
          <div class="info-title collapsible" onclick="toggleSection('requestHeaders')">
            <span>${collapsedSections.requestHeaders ? '▶' : '▼'} Headers</span>
          </div>
          ${!collapsedSections.requestHeaders ? `
            <table class="info-table">
              ${requestHeadersTable}
            </table>
          ` : ''}
        </div>

        ${req.body ? `
          <div class="info-section">
            <div class="info-title body-title-bar">
              <span>Body</span>
              <div class="body-actions">
                <button class="body-action-btn ${bodyViewMode.request === 'text' ? 'active' : ''}" onclick="toggleBodyViewMode('request')" title="${bodyViewMode.request === 'json' ? '切换为纯文本' : '切换为 JSON 视图'}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  <span>${bodyViewMode.request === 'json' ? 'Text' : 'JSON'}</span>
                </button>
                <button class="body-action-btn" onclick="copyBodyJson('request')" title="复制 JSON">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  <span>复制</span>
                </button>
              </div>
            </div>
            ${bodyViewMode.request === 'json'
              ? '<div class="json-viewer" id="request-body-viewer"></div>'
              : `<pre class="body-text-view">${escapeHtml(typeof req.body === 'string' ? req.body : JSON.stringify(req.body, null, 2))}</pre>`}
          </div>
        ` : '<div class="info-section"><div class="info-title">Body</div><p style="color: #6b7280;">无 Body</p></div>'}
      </div>

      <div class="tab-pane ${currentTab === 'response' ? 'active' : ''}">
        ${req.response ? `
          <div class="info-section">
            <div class="info-title collapsible" onclick="toggleSection('responseHeaders')">
              <span>${collapsedSections.responseHeaders ? '▶' : '▼'} Headers</span>
            </div>
            ${!collapsedSections.responseHeaders ? `
              <table class="info-table">
                ${responseHeadersTable}
              </table>
            ` : ''}
          </div>

          <div class="info-section">
            <div class="info-title body-title-bar">
              <span>Body</span>
              ${!(typeof req.response.body === 'string' && req.response.body.includes('Streaming Response')) ? `
              <div class="body-actions">
                <button class="body-action-btn ${bodyViewMode.response === 'text' ? 'active' : ''}" onclick="toggleBodyViewMode('response')" title="${bodyViewMode.response === 'json' ? '切换为纯文本' : '切换为 JSON 视图'}">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  <span>${bodyViewMode.response === 'json' ? 'Text' : 'JSON'}</span>
                </button>
                <button class="body-action-btn" onclick="copyBodyJson('response')" title="复制 JSON">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                  <span>复制</span>
                </button>
              </div>
              ` : ''}
            </div>
            ${typeof req.response.body === 'string' && req.response.body.includes('Streaming Response')
              ? '<div style="padding: 20px; background: #1a1a1a; border-radius: 6px; border: 1px solid #2a2a2a; color: #9ca3af;"><p>⚡ 流式响应</p><p style="margin-top: 8px; font-size: 13px;">此请求使用了流式传输（SSE),响应内容无法完整捕获。</p></div>'
              : bodyViewMode.response === 'json'
                ? '<div class="json-viewer" id="response-body-viewer"></div>'
                : `<pre class="body-text-view">${escapeHtml(typeof req.response.body === 'string' ? req.response.body : JSON.stringify(req.response.body, null, 2))}</pre>`}
          </div>
        ` : '<div class="empty-detail"><svg fill="none" stroke="currentColor" viewBox="0 0 24 24" style="width: 48px; height: 48px; margin-bottom: 12px; opacity: 0.3;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><p>响应数据未捕获</p></div>'}
      </div>
    </div>
  `;

  // 渲染完 HTML 后，再渲染 JSON
  if (currentTab === 'request' && req.body && bodyViewMode.request === 'json') {
    renderJson(req.body, 'request-body-viewer');
  } else if (currentTab === 'response' && req.response && bodyViewMode.response === 'json' && !(typeof req.response.body === 'string' && req.response.body.includes('Streaming Response'))) {
    renderJson(req.response.body, 'response-body-viewer');
  }
}

function switchTab(tab) {
  currentTab = tab;
  renderDetail();
}

function toggleSection(section) {
  collapsedSections[section] = !collapsedSections[section];
  renderDetail();
}

function clearRequests() {
  if (confirm('确定要清空所有请求记录吗？')) {
    requests = [];
    selectedIndex = null;
    renderRequests();
    renderDetail();
  }
}

function showToast(message) {
  let toast = document.getElementById('copy-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'copy-toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

function copyBodyJson(type) {
  const req = requests[selectedIndex];
  if (!req) return;
  const data = type === 'request' ? req.body : req.response?.body;
  if (data == null) return;
  const text = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
  navigator.clipboard.writeText(text).then(() => showToast('复制成功'));
}

function toggleBodyViewMode(type) {
  bodyViewMode[type] = bodyViewMode[type] === 'json' ? 'text' : 'json';
  renderDetail();
}

// ========== 对话模式 ==========

function toggleViewMode() {
  viewMode = viewMode === 'raw' ? 'chat' : 'raw';
  const btn = document.getElementById('mode-toggle-btn');
  const mainContainer = document.querySelector('.main-container');
  const chatContainer = document.getElementById('chat-container');

  if (viewMode === 'chat') {
    btn.textContent = '打开原文模式';
    mainContainer.style.display = 'none';
    chatContainer.style.display = 'flex';
    renderChatView();
  } else {
    btn.textContent = '打开对话模式';
    mainContainer.style.display = 'flex';
    chatContainer.style.display = 'none';
  }
}

function getSvgAvatar(type) {
  if (type === 'user') {
    return '<svg viewBox="0 0 24 24"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>';
  }
  if (type === 'agent') {
    return '<svg viewBox="0 0 24 24"><path d="M12 2a2 2 0 012 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 017 7h1a1 1 0 011 1v3a1 1 0 01-1 1h-1.17A7 7 0 0113 22h-2a7 7 0 01-6.83-3H3a1 1 0 01-1-1v-3a1 1 0 011-1h1a7 7 0 017-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 012-2zM9.5 13a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm5 0a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"/></svg>';
  }
  // sub-agent
  return '<svg viewBox="0 0 24 24"><path d="M12 15.5A3.5 3.5 0 018.5 12 3.5 3.5 0 0112 8.5a3.5 3.5 0 013.5 3.5 3.5 3.5 0 01-3.5 3.5m7.43-2.53c.04-.32.07-.64.07-.97s-.03-.66-.07-1l2.11-1.63c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.49.49 0 0014 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64L4.57 11c-.04.34-.07.67-.07 1s.03.65.07.97l-2.11 1.66c-.19.15-.25.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1.01c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.58 1.69-.98l2.49 1.01c.22.08.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.66z"/></svg>';
}

function truncateText(text, maxLen) {
  if (!text) return '';
  return text.length > maxLen ? text.substring(0, maxLen) + '...' : text;
}

// 判断文本是否为系统注入内容（非用户原始输入）
function isSystemText(text) {
  if (!text) return true;
  const trimmed = text.trim();
  if (!trimmed) return true;
  // Claude Code 注入的系统内容都以 XML 标签开头，如 <system-reminder>, <task-notification>,
  // <local-command-caveat>, <command-name>, <thinking_mode> 等
  if (/^<[a-zA-Z_][\w-]*[\s>]/i.test(trimmed)) return true;
  // [SUGGESTION MODE: ...] 等方括号开头的系统指令
  if (/^\[SUGGESTION MODE:/i.test(trimmed)) return true;
  return false;
}

function renderChatView() {
  const chatContainer = document.getElementById('chat-container');

  // 找到最新的 mainAgent 请求
  let mainReq = null;
  for (let i = requests.length - 1; i >= 0; i--) {
    if (requests[i].mainAgent === true) {
      mainReq = requests[i];
      break;
    }
  }

  if (!mainReq || !mainReq.body || !mainReq.body.messages) {
    chatContainer.innerHTML = `
      <div class="chat-empty">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
        </svg>
        <p>暂无 mainAgent 对话数据</p>
      </div>
    `;
    return;
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

  let html = '<div class="chat-messages">';

  for (const msg of messages) {
    const content = msg.content;

    if (msg.role === 'user') {
      if (Array.isArray(content)) {
        // 检查是否有 tool_result
        const toolResults = content.filter(b => b.type === 'tool_result');
        const textBlocks = content.filter(b => b.type === 'text' && !isSystemText(b.text));

        // 渲染 tool_result 为 subAgent 返回
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
          html += renderSubAgentBubble(label, resultText);
        }

        // 渲染用户文本
        for (const tb of textBlocks) {
          html += renderUserBubble(tb.text);
        }
      } else if (typeof content === 'string' && !isSystemText(content)) {
        html += renderUserBubble(content);
      }
    } else if (msg.role === 'assistant') {
      if (Array.isArray(content)) {
        const thinkingBlocks = content.filter(b => b.type === 'thinking');
        const textBlocks = content.filter(b => b.type === 'text');
        const toolUseBlocks = content.filter(b => b.type === 'tool_use');

        // 一个 assistant 消息可能包含多种 block，合并渲染
        let bubbleInner = '';

        for (const tb of thinkingBlocks) {
          bubbleInner += `<details class="chat-thinking"><summary>思考过程</summary><div class="chat-thinking-content">${escapeHtml(tb.thinking || '')}</div></details>`;
        }

        for (const tb of textBlocks) {
          if (tb.text) {
            bubbleInner += renderAssistantText(tb.text);
          }
        }

        for (const tu of toolUseBlocks) {
          let toolLabel = tu.name;
          if (tu.name === 'Task' && tu.input) {
            const st = tu.input.subagent_type || '';
            const desc = tu.input.description || '';
            toolLabel = `Task(${st}${desc ? ': ' + desc : ''})`;
          }
          const inputPreview = tu.input ? truncateText(JSON.stringify(tu.input), 300) : '';
          bubbleInner += `<div class="chat-tool-call"><span class="tool-name">${escapeHtml(toolLabel)}</span><div class="tool-input">${escapeHtml(inputPreview)}</div></div>`;
        }

        if (bubbleInner) {
          html += renderAssistantBubble(bubbleInner);
        }
      } else if (typeof content === 'string') {
        html += renderAssistantBubble(renderAssistantText(content));
      }
    }
  }

  // 渲染 response 中 assistant 的最终回复
  if (mainReq.response && mainReq.response.body && mainReq.response.body.content) {
    const respContent = mainReq.response.body.content;
    if (Array.isArray(respContent)) {
      let bubbleInner = '';

      for (const block of respContent) {
        if (block.type === 'thinking') {
          bubbleInner += `<details class="chat-thinking"><summary>思考过程</summary><div class="chat-thinking-content">${escapeHtml(block.thinking || '')}</div></details>`;
        } else if (block.type === 'text' && block.text) {
          bubbleInner += renderAssistantText(block.text);
        } else if (block.type === 'tool_use') {
          let toolLabel = block.name;
          if (block.name === 'Task' && block.input) {
            const st = block.input.subagent_type || '';
            const desc = block.input.description || '';
            toolLabel = `Task(${st}${desc ? ': ' + desc : ''})`;
          }
          const inputPreview = block.input ? truncateText(JSON.stringify(block.input), 300) : '';
          bubbleInner += `<div class="chat-tool-call"><span class="tool-name">${escapeHtml(toolLabel)}</span><div class="tool-input">${escapeHtml(inputPreview)}</div></div>`;
        }
      }

      if (bubbleInner) {
        html += `<div style="border-top: 1px solid #2a2a2a; margin: 8px 0; padding-top: 8px;"><span style="font-size: 11px; color: #6b7280;">Response</span></div>`;
        html += renderAssistantBubble(bubbleInner);
      }
    }
  }

  html += '</div>';
  chatContainer.innerHTML = html;
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

function renderUserBubble(text) {
  return `
    <div class="chat-message user">
      <div class="chat-avatar user-avatar">${getSvgAvatar('user')}</div>
      <div>
        <div class="chat-role-label">User</div>
        <div class="chat-bubble">${escapeHtml(text)}</div>
      </div>
    </div>
  `;
}

function renderAssistantBubble(innerHtml) {
  return `
    <div class="chat-message assistant">
      <div class="chat-avatar agent-avatar">${getSvgAvatar('agent')}</div>
      <div>
        <div class="chat-role-label">MainAgent</div>
        <div class="chat-bubble">${innerHtml}</div>
      </div>
    </div>
  `;
}

function renderSubAgentBubble(label, resultText) {
  return `
    <div class="chat-message sub-agent">
      <div class="chat-avatar sub-avatar">${getSvgAvatar('sub')}</div>
      <div>
        <div class="chat-role-label">${escapeHtml(label)}</div>
        <div class="chat-bubble">
          <div class="chat-tool-result">
            <div class="tool-result-label">Result</div>
            <div class="tool-result-content">${escapeHtml(truncateText(resultText, 1000))}</div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function extractToolResultText(toolResult) {
  if (!toolResult.content) return String(toolResult.content ?? '');
  if (typeof toolResult.content === 'string') return toolResult.content;
  if (Array.isArray(toolResult.content)) {
    return toolResult.content
      .filter(b => b.type === 'text')
      .map(b => b.text)
      .join('\n');
  }
  return JSON.stringify(toolResult.content);
}

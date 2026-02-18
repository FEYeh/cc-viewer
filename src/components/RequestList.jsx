import React from 'react';
import { List, Tag, Typography, Empty } from 'antd';

const { Text } = Typography;

class RequestList extends React.Component {
  render() {
    const { requests, selectedIndex, onSelect } = this.props;

    if (requests.length === 0) {
      return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
          <Empty description="等待请求..." />
        </div>
      );
    }

    return (
      <div style={{ overflow: 'auto', height: '100%' }}>
        <List
          dataSource={requests}
          size="small"
          split={false}
          renderItem={(req, index) => {
            const time = new Date(req.timestamp).toLocaleTimeString('zh-CN');
            let urlPreview = req.url;
            try {
              const urlObj = new URL(req.url);
              urlPreview = urlObj.pathname + urlObj.search;
            } catch {}

            const isActive = index === selectedIndex;
            const statusOk = req.response && req.response.status < 400;
            const statusErr = req.response && req.response.status >= 400;

            return (
              <List.Item
                onClick={() => onSelect(index)}
                style={{
                  cursor: 'pointer',
                  padding: '8px 12px',
                  background: isActive ? '#1a2332' : 'transparent',
                  borderLeft: isActive ? '3px solid #3b82f6' : '3px solid transparent',
                  borderBottom: '1px solid #1f1f1f',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = '#151515';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) e.currentTarget.style.background = 'transparent';
                }}
              >
                <div style={{ width: '100%', minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <Tag color={req.method === 'POST' ? 'blue' : 'green'} style={{ margin: 0, fontSize: 11 }}>
                      {req.method}
                    </Tag>
                    {req.mainAgent
                      ? <Tag color="orange" style={{ margin: 0, fontSize: 11 }}>MainAgent</Tag>
                      : <Tag style={{ margin: 0, fontSize: 11 }}>SubAgent</Tag>
                    }
                    <Text type="secondary" style={{ fontSize: 11, marginLeft: 'auto' }}>{time}</Text>
                  </div>
                  <div style={{
                    fontSize: 12,
                    color: '#d1d5db',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }} title={req.url}>
                    {urlPreview}
                  </div>
                  {(req.duration || req.response) && (
                    <div style={{ display: 'flex', gap: 8, marginTop: 4, fontSize: 11 }}>
                      {req.duration && <Text type="secondary">⏱️ {req.duration}ms</Text>}
                      {req.response && (
                        <Text style={{ color: statusOk ? '#10b981' : statusErr ? '#ef4444' : '#9ca3af' }}>
                          HTTP {req.response.status}
                        </Text>
                      )}
                    </div>
                  )}
                </div>
              </List.Item>
            );
          }}
        />
      </div>
    );
  }
}

export default RequestList;

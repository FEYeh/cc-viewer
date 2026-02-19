import React, { useState } from 'react';
import { Typography } from 'antd';
import { t } from '../i18n';

const { Text } = Typography;

function DiffView({ file_path, old_string, new_string }) {
  const [collapsed, setCollapsed] = useState(false);

  const oldLines = old_string.split('\n');
  const newLines = new_string.split('\n');

  const diffLines = [];

  // Build simple unified diff: show removed lines then added lines
  oldLines.forEach(line => {
    diffLines.push({ type: 'del', text: line });
  });
  newLines.forEach(line => {
    diffLines.push({ type: 'add', text: line });
  });

  return (
    <div className="diff-view" style={{ margin: '6px 0' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 4,
        }}
      >
        <Text style={{ color: '#a78bfa', fontSize: 12, fontWeight: 600 }}>
          Edit: {file_path}
        </Text>
        <Text
          style={{ color: '#6b7280', fontSize: 11, cursor: 'pointer', userSelect: 'none' }}
          onClick={() => setCollapsed(c => !c)}
        >
          {collapsed ? t('ui.expand') : t('ui.collapse')}
        </Text>
      </div>
      {!collapsed && (
        <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.5, overflow: 'auto' }}>
          {diffLines.map((dl, i) => (
            <div
              key={i}
              className={dl.type === 'del' ? 'diff-line-del' : 'diff-line-add'}
            >
              {dl.type === 'del' ? '- ' : '+ '}{dl.text}
            </div>
          ))}
        </pre>
      )}
    </div>
  );
}

export default DiffView;

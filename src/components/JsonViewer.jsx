import React from 'react';
import { JsonView, darkStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const customStyles = {
  ...darkStyles,
  container: 'rjv-container',
};

class JsonViewer extends React.Component {
  render() {
    const { data, defaultExpand } = this.props;
    if (data === null || data === undefined) return null;

    const shouldExpandNode = defaultExpand === 'all'
      ? () => true
      : defaultExpand === 'root'
        ? (level) => level < 2
        : (level) => level < 1;

    return (
      <div style={{
        background: '#0d1117',
        borderRadius: 6,
        border: '1px solid #2a2a2a',
        padding: '12px',
        fontSize: 13,
        fontFamily: 'monospace',
        overflow: 'auto',
      }}>
        <JsonView
          data={data}
          shouldExpandNode={shouldExpandNode}
          style={customStyles}
        />
      </div>
    );
  }
}

export default JsonViewer;

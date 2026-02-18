import React from 'react';

class PanelResizer extends React.Component {
  constructor(props) {
    super(props);
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }

  handleMouseDown(e) {
    e.preventDefault();
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  handleMouseMove(e) {
    if (this.props.onResize) {
      this.props.onResize(e.clientX);
    }
  }

  handleMouseUp() {
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }

  render() {
    return (
      <div
        onMouseDown={this.handleMouseDown}
        style={{
          width: 6,
          cursor: 'col-resize',
          background: '#1f1f1f',
          flexShrink: 0,
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = '#3b82f6'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = '#1f1f1f'; }}
      />
    );
  }
}

export default PanelResizer;

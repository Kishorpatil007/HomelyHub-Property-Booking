import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          color: 'red',
          padding: '20px',
          fontFamily: 'monospace',
          whiteSpace: 'pre-wrap',
          backgroundColor: '#f0f0f0'
        }}>
          <h1>Error rendering app:</h1>
          <p>{this.state.error?.toString()}</p>
          <p>{this.state.error?.stack}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

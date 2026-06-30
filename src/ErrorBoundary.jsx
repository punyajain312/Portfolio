import { Component } from 'react'

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidCatch(error, info) {
    console.error('CRASH:', error, info)
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{
          position: 'fixed', inset: 0, background: '#020c04',
          color: '#00ff7f', fontFamily: 'monospace', padding: 40,
          display: 'flex', flexDirection: 'column', gap: 16
        }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: '#ff5f56' }}>
            ⚠ Runtime Error
          </div>
          <div style={{ color: '#ff5f56', fontSize: 13 }}>
            {this.state.error.message}
          </div>
          <pre style={{ color: '#4a9a58', fontSize: 11, whiteSpace: 'pre-wrap', maxHeight: '60vh', overflow: 'auto' }}>
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

import * as React from 'react'
import {reportError} from './api'

class ErrorBoundary extends React.Component {
  state = {hasError: false}

  static getDerivedStateFromError() {
    return {hasError: true}
  }

  componentDidCatch(error, info) {
    reportError(error, info)
  }

  tryAgain = () => this.setState({hasError: false})

  render() {
    return this.state.hasError ? (
      <div>
        <div role="alert">There was a problem.</div>{' '}
        <button onClick={this.tryAgain}>Try again?</button>
      </div>
    ) : (
      this.props.children
    )
  }
}

export {ErrorBoundary}

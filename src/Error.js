import React, { Component } from 'react'

export class Error extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  render() {
    if(this.state.hasError) {
      return (
        <main className="error-page">
          <h2>We're sorry. Something went wrong.</h2>
          <p>Try refreshing the page!</p>
        </main>
      )
    }
    return this.props.children
    }
}

export default Error

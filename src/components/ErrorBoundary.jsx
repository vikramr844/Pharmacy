import React, { Component } from 'react';
import ErrorScreen from "../components/screens/ErrorScreen";


class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  render() {
    if (this.state.hasError) {
      return <h1><ErrorScreen/></h1>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

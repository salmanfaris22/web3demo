import React, { Component, ErrorInfo, ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
  state: State = {
    hasError: false,
  };

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.log("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "20px", textAlign: "center" }}>
          <h1>Something went wrong</h1>
          <p>We're sorry for the inconvenience. Please try the following:</p>
          <ul style={{ listStyleType: "none" }}>
            <li>
              <button onClick={() => this.setState({ hasError: false })}>
                Try Again
              </button>
            </li>
            <li>
              <Link to="/">Go to Home</Link>
            </li>
            <li>
              <a href="mailto:support@example.com">Contact Support</a>
            </li>
          </ul>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

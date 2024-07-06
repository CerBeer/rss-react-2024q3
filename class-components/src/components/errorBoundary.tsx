import { Component, ErrorInfo, ReactNode } from "react";
import "./errorBoundary.css";

type ErrorBoundaryState = {
  hasError: boolean;
  errorInfo: string;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorInfo: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true, errorInfo: "" };
  }

  componentDidCatch(_error: Error, info: ErrorInfo) {
    const errorInfo = info.componentStack ?? "";
    if (errorInfo) {
      this.setState({ hasError: true, errorInfo });
    }
  }

  handleClick = () => {
    this.setState({ hasError: false, errorInfo: "" });
  };

  render() {
    const { hasError, errorInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-head">Something went wrong...</div>
          <div className="error-boundary-body">{errorInfo}</div>
          <button type="button" onClick={this.handleClick}>
            Fix this error
          </button>
        </div>
      );
    }

    return <>this.props.children{children}</>;
  }
}

export default ErrorBoundary;

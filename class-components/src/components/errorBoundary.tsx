import { Component, ErrorInfo, ReactNode } from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  errorMessage: string;
  errorInfo: string;
};

type ErrorBoundaryProps = {
  children: ReactNode;
};

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "", errorInfo: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    const errorInfo = info.componentStack ?? "";
    const errorMessage = error.message;
    this.setState({ hasError: true, errorMessage, errorInfo });
  }

  handleClick = () => {
    this.setState({ hasError: false, errorInfo: "" });
  };

  render() {
    const { hasError, errorMessage, errorInfo } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-head">{errorMessage}</div>
          <div className="error-boundary-body">{errorInfo}</div>
          <button type="button" onClick={this.handleClick}>
            Fix this error
          </button>
        </div>
      );
    }

    return <> {children}</>;
  }
}

export default ErrorBoundary;

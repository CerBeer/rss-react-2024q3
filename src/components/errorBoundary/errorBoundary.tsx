import { Component, ReactNode } from "react";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, errorMessage: "" };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidCatch(error: Error) {
    const errorMessage = error.message;
    this.setState({ hasError: true, errorMessage });
  }

  handleClick = () => {
    this.setState({ hasError: false });
  };

  render() {
    const { hasError, errorMessage } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="error-boundary">
          <div className="error-boundary-head">{errorMessage}</div>
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

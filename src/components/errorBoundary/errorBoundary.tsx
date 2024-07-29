import { Component, ReactNode } from "react";
import { Theme, ThemeType } from "../../contexts/theme";

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
  theme: ThemeType;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    const theme = localStorage.getItem("previousTheme") ?? Theme.Light;
    this.state = { hasError: false, errorMessage: "", theme };
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
    const { hasError, errorMessage, theme } = this.state;
    const { children } = this.props;
    if (hasError) {
      return (
        <div className="error-boundary root-theme" data-theme={theme}>
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

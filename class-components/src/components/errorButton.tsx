import { Component } from "react";

type State = {
  error: boolean;
};

type ErrorProps = {
  title?: string;
};

class ErrorButton extends Component<ErrorProps, State> {
  static defaultProps = {
    title: "Throw Error",
  };

  constructor(props: ErrorProps) {
    super(props);
    this.state = { error: false };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState({ error: true });
  };

  render() {
    const { title } = this.props;
    const { error } = this.state;
    if (error) {
      throw new Error("Something went wrong...");
    }

    return (
      <button
        type="button"
        className="button-throw-error"
        onClick={this.handleClick}
      >
        {title}
      </button>
    );
  }
}

export default ErrorButton;

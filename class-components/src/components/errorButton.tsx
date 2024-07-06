import { Component } from "react";

type State = {
  count: number;
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
    this.state = { count: 0 };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick = () => {
    this.setState(({ count }) => ({ count: count + 1 }));
  };

  render() {
    const { title } = this.props;
    const { count } = this.state;
    if (count > 0) {
      throw new Error("Oops, I made a mistake!");
    }

    return (
      <button type="button" onClick={this.handleClick}>
        {title} {count}
      </button>
    );
  }
}

export default ErrorButton;

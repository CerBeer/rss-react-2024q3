import { Component } from "react";

type CounterState = {
  count: number;
};

type CounterProps = {
  title?: string;
};

class Counter extends Component<CounterProps, CounterState> {
  static defaultProps = {
    title: "",
  };

  constructor(props: CounterProps) {
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
    return (
      <button type="button" onClick={this.handleClick}>
        {title} {count}
      </button>
    );
  }
}

export default Counter;

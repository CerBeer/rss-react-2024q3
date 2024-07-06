import { Component } from "react";

type ClockState = {
  date: Date;
};

type ClockProps = {
  title?: string;
};

function FormattedDate(props: ClockState) {
  const { date } = props;
  return <>{date.toLocaleTimeString()}</>;
}

class Clock extends Component<ClockProps, ClockState> {
  timerID: string | number | NodeJS.Timeout | undefined;

  constructor(props: ClockProps) {
    super(props);
    this.state = { date: new Date() };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    const { title } = this.props;
    const { date } = this.state;
    return (
      <div>
        <h2>
          {title} <FormattedDate date={date} />
        </h2>
      </div>
    );
  }
}

export default Clock;

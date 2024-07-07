import { Component, FormEvent } from "react";

type State = {
  request: string;
  lastRequest: string;
};

type Props = {
  handle: (query: string) => void;
};

class App extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    const savedRequest = localStorage.getItem("previousRequest");
    let request = "";
    if (savedRequest) {
      request = JSON.parse(savedRequest);
    }
    this.state = {
      request,
      lastRequest: request,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { request } = this.state;
    const { handle } = this.props;
    handle(request);
  }

  handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let { request } = this.state;
    request = request.trim();
    this.setState({ request });
    const { lastRequest } = this.state;
    if (request === lastRequest) return;
    this.setState({ lastRequest: request });
    localStorage.setItem("previousRequest", JSON.stringify(request));
    const { handle } = this.props;
    handle(request);
  }

  render() {
    const { request } = this.state;
    return (
      <form className="search-query" method="post" onSubmit={this.handleSubmit}>
        <input
          data-testid="search-query-input"
          className="search-query-input"
          name="searchQuery"
          value={request}
          onChange={(e) => this.setState({ request: e.target.value })}
        />
        <button type="submit">Search</button>
      </form>
    );
  }
}

export default App;

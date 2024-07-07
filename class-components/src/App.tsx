import "./App.css";
import { Component } from "react";
import SearchInput from "./components/searchInput";
import Spinner from "./components/spinner";
import ErrorButton from "./components/errorButton";
import Result from "./components/result";
import ErrorBoundary from "./components/errorBoundary";
import { getPeople } from "./api/swapi";
import { People } from "./api/swapiTypes";

type State = {
  nowQuery: boolean;
  people: People;
};

type Props = {
  title?: string;
};

class App extends Component<Props, State> {
  static defaultProps = {
    title: "Search for Star Wars person or character",
  };

  constructor(props: Props) {
    super(props);
    this.state = { nowQuery: false, people: [] };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState = (state: State) => {
    this.setState(state);
  };

  handleSearchClick = (request: string) => {
    this.setState({ nowQuery: true });
    getPeople(this.updateState, request);
  };

  render() {
    const { title } = this.props;
    const { nowQuery, people } = this.state;
    return (
      <ErrorBoundary>
        <ErrorButton />
        <div className="title">
          <h1>{title}</h1>
        </div>
        <SearchInput handle={this.handleSearchClick} />
        {nowQuery ? <Spinner /> : <Result people={people} />}
      </ErrorBoundary>
    );
  }
}

export default App;

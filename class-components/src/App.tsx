import "./App.css";
import { Component } from "react";
import SearchInput from "./components/searchInput";
import Spinner from "./components/spinner";
import ErrorButton from "./components/errorButton";
import Result from "./components/result";
import ErrorBoundary from "./components/errorBoundary";
import { getPeopleList } from "./api/swapi";
import { Peoples } from "./api/swapiTypes";

type State = {
  nowQuery: boolean;
  peopleList: Peoples;
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
    this.state = { nowQuery: false, peopleList: [] };
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  updateState = (state: State) => {
    this.setState(state);
  };

  handleSearchClick = (request: string) => {
    this.setState({ nowQuery: true });
    getPeopleList(request, this.updateState);
  };

  render() {
    const { title } = this.props;
    const { nowQuery, peopleList } = this.state;
    return (
      <ErrorBoundary>
        <ErrorButton />
        <div className="title">
          <h1>{title}</h1>
        </div>
        <SearchInput handle={this.handleSearchClick} />
        {nowQuery ? <Spinner /> : <Result peopleList={peopleList} />}
      </ErrorBoundary>
    );
  }
}

export default App;

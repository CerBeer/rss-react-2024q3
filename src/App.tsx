import "./App.css";
import { useEffect, useState } from "react";
import SearchInput from "./components/searchInput";
import Spinner from "./components/spinner";
import ErrorButton from "./components/errorButton";
import Result from "./components/result";
import ErrorBoundary from "./components/errorBoundary";
import { getPeople } from "./api/swapi";
import { People, Character } from "./api/swapiTypes";

interface State {
  nowQuery: boolean;
  people: People;
}

function App() {
  const [nowQuery, setNowQuery] = useState(false);
  const [people, setPeople] = useState(new Array<Character>());

  function updateState(state: State) {
    setNowQuery(state.nowQuery);
    setPeople(state.people);
  }

  function handleSearchClick(request: string) {
    setNowQuery(true);
    void getPeople(updateState, request);
  }

  useEffect(() => {
    const savedRequest = localStorage.getItem("previousRequest") ?? "";
    setNowQuery(true);
    void getPeople(updateState, savedRequest);
  }, []);

  return (
    <ErrorBoundary>
      <ErrorButton />
      <div className="title">
        <h1>Search for Star Wars person or character</h1>
      </div>
      <SearchInput handle={handleSearchClick} />
      {nowQuery ? <Spinner /> : <Result people={people} />}
    </ErrorBoundary>
  );
}

export default App;

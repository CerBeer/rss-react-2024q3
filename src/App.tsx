import "./App.css";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SearchInput from "./components/searchInput/searchInput";
import Spinner from "./components/spinner/spinner";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import { getPeople } from "./api/swapi";
import { People, Character } from "./api/swapiTypes";
import Result from "./components/result/result";

interface State {
  request: string;
  people: People;
  totalItem: number;
}

function App() {
  const [nowQuery, setNowQuery] = useState(false);
  const [people, setPeople] = useState(new Array<Character>());
  const [totalItem, setTotalItem] = useState(0);
  const [searchParams] = useSearchParams();

  function updateState(state: State) {
    setNowQuery(false);
    setPeople(state.people);
    setTotalItem(state.totalItem);
  }

  useEffect(() => {
    const search = searchParams.get("search");
    setNowQuery(true);
    void getPeople(updateState, search ?? "", "1");
  }, [searchParams]);

  return (
    <ErrorBoundary>
      <div className="title">
        <h1>Search for Star Wars person or character</h1>
      </div>
      <SearchInput />
      {nowQuery ? (
        <Spinner />
      ) : (
        <Result people={people} totalItem={totalItem} />
      )}
    </ErrorBoundary>
  );
}

export default App;

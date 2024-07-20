import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SearchInput from "./components/searchInput/searchInput";
import Spinner from "./components/spinner/spinner";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import { getPeople } from "./api/swapi";
import { People, Character } from "./api/swapiTypes";
import Result from "./components/result/result";
import useLocalStor from "./hooks/useLocalStor";
import { ThemeContext } from "./contexts/theme";

interface State {
  request: string;
  people: People;
  totalItem: number;
}

function App() {
  const [nowQuery, setNowQuery] = useState(false);
  const [people, setPeople] = useState(new Array<Character>());
  const [totalItem, setTotalItem] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = useParams();
  const [savedSearch] = useLocalStor("previousRequest");
  const [theme, setTheme] = useLocalStor("previousTheme");
  const themeValue = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  useEffect(() => {
    let search = searchParams.get("search");
    if (search === null) {
      search = savedSearch;
      setSearchParams({ search });
    }
  });

  function updateState(state: State) {
    setNowQuery(false);
    setPeople(state.people);
    setTotalItem(state.totalItem);
  }

  useEffect(() => {
    let search = searchParams.get("search");
    if (search === null) {
      search = savedSearch;
    }
    setNowQuery(true);
    void getPeople(updateState, search ?? "", page ?? "1");
  }, [searchParams, page, savedSearch]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ErrorBoundary>
        <div className="root-theme" data-theme={theme}>
          <div className="title">
            <h1>Search for Star Wars person or character</h1>
          </div>
          <SearchInput />
          {nowQuery ? (
            <Spinner />
          ) : (
            <Result people={people} totalItem={totalItem} />
          )}
        </div>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}

export default App;

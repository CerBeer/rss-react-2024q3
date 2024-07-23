import "./App.css";
import { useEffect, useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SearchInput from "./components/searchInput/searchInput";
import Spinner from "./components/spinner/spinner";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import Result from "./components/result/result";
import useLocalStor from "./hooks/useLocalStor";
import { ThemeContext } from "./contexts/theme";
import { useGetPeopleQuery } from "./redux/services/swapi";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = useParams();
  const [savedSearch] = useLocalStor("previousRequest");
  const [theme, setTheme] = useLocalStor("previousTheme");
  const themeValue = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);
  const emptyData = { totalItem: 0, people: [] };

  let search = searchParams.get("search");
  if (search === null) {
    search = savedSearch;
  }

  const { data, isFetching } = useGetPeopleQuery({ page, search });

  useEffect(() => {
    setSearchParams({ search });
  }, [search, setSearchParams]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ErrorBoundary>
        <div className="root-theme" data-theme={theme}>
          <div className="title">
            <h1>Search for Star Wars person or character</h1>
          </div>
          <SearchInput />
          {isFetching ? <Spinner /> : <Result data={data ?? emptyData} />}
        </div>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}

export default App;

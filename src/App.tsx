import "./App.css";
import { useMemo } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import SearchInput from "./components/searchInput/searchInput";
import Spinner from "./components/spinner/spinner";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import Result from "./components/result/result";
import useLocalStor from "./hooks/useLocalStor";
import { ThemeContext } from "./contexts/theme";
import { useGetPeopleQueryString } from "./redux/services/swapi";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = useParams();
  const [savedSearch] = useLocalStor("previousRequest");
  const [theme, setTheme] = useLocalStor("previousTheme");
  const themeValue = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  let search = searchParams.get("search");
  if (search === null) {
    search = savedSearch;
    setSearchParams({ search });
  }
  const { data, isFetching } = useGetPeopleQueryString(page, search);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ErrorBoundary>
        <div className="root-theme" data-theme={theme}>
          <div className="title">
            <h1>Search for Star Wars person or character</h1>
          </div>
          <SearchInput />
          {isFetching ? (
            <Spinner />
          ) : (
            <Result people={data!.people} totalItem={data!.totalItem} />
          )}
        </div>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}

export default App;

/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import "./App.css";
import { useEffect, useMemo } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import SearchInput from "./components/searchInput/searchInput";
import Spinner from "./components/spinner/spinner";
import ErrorBoundary from "./components/errorBoundary/errorBoundary";
import Result from "./components/result/result";
import useLocalStor from "./hooks/useLocalStor";
import { ThemeContext, Theme } from "./contexts/theme";
import { useGetPeopleQuery } from "./redux/services/swapi";
import ThemeSwitch from "./components/themeSwitch/themeSwitch";
import Flyout from "./components/flyout/flyout";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { page } = useParams();
  const [savedSearch] = useLocalStor("previousRequest", "");
  const [theme, setTheme] = useLocalStor("previousTheme", Theme.Light);
  const themeValue = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);
  const navigate = useNavigate();

  let search = searchParams.get("search");
  if (search === null) {
    search = savedSearch;
  }

  function closeCard(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if (!target.dataset.noclosecard) {
      navigate(`/page/${page}?search=${search}`);
    }
  }

  const { data, isFetching } = useGetPeopleQuery({ page, search });

  useEffect(() => {
    setSearchParams({ search });
  }, [search, setSearchParams]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ErrorBoundary>
        <div
          className="root-theme"
          data-theme={theme}
          data-testid="root-theme"
          onClick={closeCard}
        >
          <div className="title">
            <h1>Search for Star Wars person or character</h1>
          </div>
          <SearchInput />
          {isFetching ? <Spinner /> : <Result data={data!} />}
          <ThemeSwitch />
          <Flyout />
        </div>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}

export default App;

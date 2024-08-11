/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  Meta,
  NavLink,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useNavigation,
  useNavigate,
} from "@remix-run/react";
import appStylesHref from "./app.css?url";
import { getPeople } from "./api/swapi";
import { useEffect, useState } from "react";
import { QueryParams } from "./api/swapiTypes";
import Item from "./components/item";
import SearchInput from "./components/searchInput";
import Card from "./components/card";
import spinner from "./assets/spinner.gif";
import Pagination from "./components/pagination";
import ThemeSwitch, { Theme } from "./components/themeSwitch";
import store from "./store/store";
import { Provider } from "react-redux";
import Flyout from "./components/flyout";

function getSearchParams(searchParams: URLSearchParams): QueryParams {
  const result = {
    search: searchParams.get("search") ?? "",
    page: searchParams.get("page") ?? "1",
    details: searchParams.get("details") ?? "",
  };
  return result;
}

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const queryParams = getSearchParams(url.searchParams);
  const people = await getPeople(queryParams);
  return json({ people, queryParams });
};

export default function App() {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { people, queryParams } = useLoaderData<typeof loader>();
  const [theme, setTheme] = useState(Theme.Light);

  useEffect(() => {
    const searchField = document.getElementById("q");
    if (searchField instanceof HTMLInputElement) {
      searchField.value = queryParams.search;
    }
  }, [queryParams]);

  const detailsData = people.people.find(
    (character) => character.id === queryParams.details,
  );

  function closeCard(e: React.MouseEvent<HTMLDivElement>) {
    if (!queryParams.details || queryParams.details === "0") return;
    const target = e.target as HTMLElement;
    if (!target.dataset.noclosecard) {
      const url = `?page=${queryParams.page}&search=${queryParams.search}&details=0`;
      navigate(url);
    }
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <div
            className="root-theme"
            data-theme={theme}
            data-testid="root-theme"
          >
            <div className="head-page" onClick={closeCard}>
              <div className="title">
                <h1>Search for Star Wars person or character</h1>
              </div>
              <SearchInput query={queryParams} />
              <div className="search-result" data-testid="search-result">
                <div className="search-result-list">
                  {people.people.length ? (
                    people.people.map((character) => (
                      <Item
                        key={character.renderKey}
                        character={character}
                        query={queryParams}
                      />
                    ))
                  ) : (
                    <div className="search-result-empty">
                      <p>
                        <b>Result is empty</b>
                      </p>
                      <p>
                        <NavLink to={"?page=1&search="}>Home</NavLink>{" "}
                      </p>
                    </div>
                  )}
                </div>
                {detailsData && <Card query={queryParams} data={detailsData} />}
              </div>
              <div
                className="spinner"
                data-hide={navigation.state === "loading" ? "false" : "true"}
                data-testid="spinner"
              >
                <img alt="loading..." src={spinner} />
              </div>
              <Pagination query={queryParams} totalItem={people.totalItem} />
            </div>
            <ThemeSwitch theme={theme} setTheme={setTheme} />
            <Flyout />
          </div>
        </Provider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

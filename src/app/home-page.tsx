"use client";

import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import ThemeSwitch from "../components/themeSwitch/themeSwitch";
import ThemeContext, { Theme } from "../features/theme";
import Result from "../components/result/result";
import SearchInput from "../components/searchInput/searchInput";
import { FetchResult } from "../api/swapiTypes";
import ErrorBoundary from "../components/errorBoundary/errorBoundary";
import { Provider } from "react-redux";
import store from "../store";
import Flyout from "../components/flyout/flyout";

type props = {
  recentPeople: FetchResult;
};
export default function HomePage({ recentPeople }: props) {
  const router = useRouter();
  const { push } = router;

  function closeCard(e: React.MouseEvent<HTMLDivElement>) {
    if (!recentPeople.query.details) return;
    const target = e.target as HTMLElement;
    if (!target.dataset.noclosecard) {
      const url = `?page=${recentPeople.query.page}&search=${recentPeople.query.search}&details=0`;
      push(url);
    }
  }

  const [theme, setTheme] = useState(Theme.Light);
  const themeValue = useMemo(() => ({ theme, setTheme }), [setTheme, theme]);

  return (
    <ThemeContext.Provider value={themeValue}>
      <ErrorBoundary>
        <Provider store={store}>
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
            <Result {...recentPeople} />
            <ThemeSwitch />
            <Flyout />
          </div>
        </Provider>
      </ErrorBoundary>
    </ThemeContext.Provider>
  );
}

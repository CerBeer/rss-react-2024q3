"use client";

import { useRouter } from "next/navigation";
import React from "react";
import ThemeSwitch from "../components/themeSwitch/themeSwitch";
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

  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div onClick={closeCard}>
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
  );
}

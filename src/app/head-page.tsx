"use client";

import {
  ReadonlyURLSearchParams,
  useRouter,
  useSearchParams,
} from "next/navigation";
import SearchInput from "../components/searchInput/searchInput";
import { Provider } from "react-redux";
import ErrorBoundary from "../components/errorBoundary/errorBoundary";
import store from "../store";
import { useContext } from "react";
import Flyout from "../components/flyout/flyout";
import ThemeSwitch from "../components/themeSwitch/themeSwitch";
import spinner from "../assets/spinner.gif";
import Image from "next/image";
import { LoaderContext } from "../features/loader-provider";

export type QueryParams = {
  search: string;
  page: string;
  details: string;
};

function getSearchParams(searchParams: ReadonlyURLSearchParams): QueryParams {
  const result = {
    search: searchParams.get("search") ?? "",
    page: searchParams.get("page") ?? "1",
    details: searchParams.get("details") ?? "",
  };
  return result;
}

export default function HeadPage({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { push } = router;
  const searchParams = useSearchParams();
  const params = getSearchParams(searchParams);

  function closeCard(e: React.MouseEvent<HTMLDivElement>) {
    if (!params.details) return;
    const target = e.target as HTMLElement;
    if (!target.dataset.noclosecard) {
      const url = `?page=${params.page}&search=${params.search}&details=0`;
      push(url);
    }
  }

  // const { spinner } = useContext(LoaderContext);
  // if (setLoading) setLoading(true);
  // console.log(spinner!.current);
  const { spinnerRef } = useContext(LoaderContext);
  if (spinnerRef && spinnerRef.current)
    spinnerRef.current.dataset.hide = "false";
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <div onClick={closeCard} className="head-page">
          <div className="title">
            <h1>Search for Star Wars person or character</h1>
          </div>
          <SearchInput />
          <div
            className="spinner"
            data-hide="true"
            data-testid="spinner"
            ref={spinnerRef}
          >
            <Image
              width={200}
              height={200}
              src={spinner.src}
              alt="loading..."
            />
          </div>{" "}
          {children}
        </div>
        <ThemeSwitch />
        <Flyout />
      </Provider>
    </ErrorBoundary>
  );
}

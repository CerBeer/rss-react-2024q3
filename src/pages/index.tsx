import Head from "next/head";
import SearchInput from "../components/searchInput/searchInput";
import React, { useEffect, useState } from "react";
import { PeopleAnswer, FetchResult } from "../api/swapiTypes";
import { BaseURL } from "../api/swapiConst";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Result from "../components/result/result";
import { useRouter } from "next/router";
import Spinner from "../components/spinner/spinner";

const Theme = {
  Light: "Light",
  Dark: "Dark",
};

export const getServerSideProps = (async (context) => {
  const { search, page, details } = context.query;
  const url = `${BaseURL}?page=${page ?? "1"}&search=${search ?? ""}`;
  const res = await fetch(url);
  const answer: PeopleAnswer = await res.json();
  const repo = {
    query: {
      search: `${search ?? ""}`,
      page: `${page ?? "1"}`,
      details: `${details ?? ""}`,
    },
    people: answer?.results ?? [],
    totalItem: answer?.count ?? 0,
  };
  repo.people.forEach((character) => {
    const currentCharacter = character;
    const urlParts = character.url.split("/");
    currentCharacter.id = urlParts[urlParts.length - 2];
    currentCharacter.renderKey = `p${character.name}`;
  });
  return { props: { repo } };
}) satisfies GetServerSideProps<{ repo: FetchResult }>;

const IndexPage = ({
  repo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [routerChange, setRouterChange] = useState(false);
  const [theme, setTheme] = useState(Theme.Light);

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setRouterChange(true);
      router.events.on("routeChangeComplete", () => {
        setRouterChange(false);
        router.events.off("routeChangeComplete", () => {});
      });
    });
  }, []);

  const { push } = router;

  function closeCard(e: React.MouseEvent<HTMLDivElement>) {
    if (!repo.query.details) return;
    const target = e.target as HTMLElement;
    if (!target.dataset.noclosecard) {
      console.log("closeCard");
      const url = `?page=${repo.query.page}&search=${repo.query.search}`;
      push(url);
    }
  }

  function changeTheme(checked: boolean) {
    if (setTheme) setTheme(checked ? Theme.Dark : Theme.Light);
  }

  return (
    <div
      className="root-theme"
      data-theme={theme}
      data-testid="root-theme"
      onClick={closeCard}
    >
      <Head>
        <title>Star Wars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="title">
        <h1>Search for Star Wars person or character</h1>
      </div>
      <SearchInput />
      {routerChange ? <Spinner /> : <Result {...repo} />}
      <label
        htmlFor="ThemeChange"
        className="theme-change"
        data-noclosecard="true"
      >
        <input
          className="change-input"
          data-noclosecard="true"
          data-testid="theme-change-input"
          id="ThemeChange"
          type="checkbox"
          checked={theme === Theme.Dark}
          onChange={(e) => {
            changeTheme(e.target.checked);
          }}
          hidden
        />
        {theme === Theme.Light ? Theme.Dark : Theme.Light} mode
      </label>
    </div>
  );
};

export default IndexPage;

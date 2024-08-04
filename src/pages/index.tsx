import Head from "next/head";

import SearchInput from "../components/searchInput/searchInput";
import React, { useEffect, useState } from "react";
import { PeopleAnswer, FetchResult } from "../api/swapiTypes";
import { BaseURL } from "../api/swapiConst";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import Result from "../components/result/result";
import { useRouter } from "next/router";
import Spinner from "../components/spinner/spinner";

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

  useEffect(() => {
    router.events.on("routeChangeStart", () => {
      setRouterChange(true);
      router.events.on("routeChangeComplete", () => {
        setRouterChange(false);
        router.events.off("routeChangeComplete", () => {});
      });
    });
  }, []);

  return (
    <div className="root-theme">
      <Head>
        <title>Star Wars</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="title">
        <h1>Search for Star Wars person or character</h1>
      </div>
      <SearchInput />
      {routerChange ? <Spinner /> : <Result {...repo} />}
    </div>
  );
};

export default IndexPage;

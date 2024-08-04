import type { NextPage } from "next";
import Head from "next/head";

import SearchInput from "../components/searchInput/searchInput";
import React from "react";
import { PeopleAnswer, People, Character } from "../api/swapiTypes";
import Item from "../components/item/item";
import Pagination from "../components/pagination/pagination";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { BaseURL } from "../api/const";

function prepareCharacter(character: Character) {
  const currentCharacter = character;
  if (character?.url && character.name) {
    const urlParts = character.url.split("/");
    currentCharacter.id = urlParts[urlParts.length - 2];
    currentCharacter.renderKey = `p${character.name}`;
  }
  return currentCharacter;
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((response: PeopleAnswer) => {
      const result = {
        people: response?.results ?? [],
        totalItem: response?.count ?? 0,
      };
      result.people.forEach((character) => prepareCharacter(character));
      return result;
    });

interface Answer {
  totalItem: number;
  people: People;
}

const IndexPage: NextPage = () => {
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") ?? "1";
  const search = searchParams?.get("search") ?? "";
  const url = `${BaseURL}?page=${page}${search && "&search=" + search}`;

  const { data, error, isLoading } = useSWR<Answer>(url, fetcher);
  if (error) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>Empty data</div>;

  const { people, totalItem } = data;

  if (!people.length)
    return (
      <div className="search-result-empty">
        <p>
          <b>Result is empty</b>
        </p>
        <p>
          <Link href={"?page=1&search="}>Home</Link>
        </p>
      </div>
    );

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
      <div className="search-result" data-testid="search-result">
        <div className="search-result-list">
          {people.map((character) => (
            <Item key={character.renderKey} character={character} />
          ))}
        </div>
      </div>
      <Pagination totalItem={totalItem} />
    </div>
  );
};

export default IndexPage;

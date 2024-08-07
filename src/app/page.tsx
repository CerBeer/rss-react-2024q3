import "../styles/globals.css";
import HomePage from "./home-page";
import { FetchResult, PeopleAnswer } from "../api/swapiTypes";
import { BaseURL } from "../api/swapiConst";

// import { useSearchParams } from "next/navigation";

type QueryParams = {
  search: string;
  page: string;
  details: string;
};

type SearchParams = { searchParams: QueryParams };

async function getPeople(queryParams: QueryParams): Promise<FetchResult> {
  const url = `${BaseURL}?page=${queryParams.page ?? "1"}&search=${queryParams.search ?? ""}`;
  const res = await fetch(url, { cache: "no-store" });
  const answer: PeopleAnswer = await res.json();
  const result = {
    query: queryParams,
    people: answer?.results ?? [],
    totalItem: answer?.count ?? 0,
  };
  result.people.forEach((character) => {
    const currentCharacter = character;
    const urlParts = character.url.split("/");
    currentCharacter.id = urlParts[urlParts.length - 2];
    currentCharacter.renderKey = `p${character.name}`;
  });
  return result;
}

export default async function Page({ searchParams }: SearchParams) {
  console.log(searchParams);
  const queryParams = {
    search: searchParams.search ?? "",
    page: searchParams.page ?? "",
    details: searchParams.details ?? "",
  };

  // Fetch data directly in a Server Component
  const recentPeople: FetchResult = await getPeople(queryParams);
  // Forward fetched data to your Client Component
  return <HomePage recentPeople={recentPeople} />;
}

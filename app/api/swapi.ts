import { swapiAnswer, FetchResult, QueryParams } from "./swapiTypes";
import { SWApi, BaseURL } from "./swapiConst";

export async function getPeople(
  queryParams: QueryParams,
): Promise<FetchResult> {
  const url = `${BaseURL}?page=${queryParams.page ?? "1"}&search=${queryParams.search ?? ""}`;
  const res = await fetch(url, { cache: "no-store" });
  const answer: swapiAnswer = await res.json();
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
    currentCharacter.image = `${SWApi}${currentCharacter.id}`;
    currentCharacter.favorite = false;
  });
  return result;
}

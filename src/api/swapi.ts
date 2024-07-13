import { People, PeopleAnswer, Character } from "./swapiTypes";

interface State {
  nowQuery: boolean;
  people: People;
}

const baseURL = `${import.meta.env.VITE_API_URL_BASE}${import.meta.env.VITE_API_URL_SECTION}`;

function getQueryURL(page: string, format: string, request: string | null) {
  let queryURL = `${baseURL}?${import.meta.env.VITE_API_URL_PAGE}=${page}`;
  queryURL = `${queryURL}&${import.meta.env.VITE_API_URL_FORMAT}=${format}`;
  if (request) queryURL = `${queryURL}&search=${request}`;
  return queryURL;
}

function getQueryCharacterURL(id: string) {
  const queryURL = `${baseURL}${id}/`;
  return queryURL;
}

export async function getPeople(
  setState: (state: State) => void,
  request: string,
  page = "1",
  format = "json",
) {
  const options = {
    method: "GET",
  };
  const queryURL = getQueryURL(page, format, request);
  const resultFetch = await fetch(queryURL, options)
    .then((answer) => answer.json())
    .then((answer: PeopleAnswer) => {
      const result: People = answer.results ?? [];
      return result;
    })
    .catch(() => {
      const result: People = [];
      return result;
    });
  resultFetch.forEach((character) => {
    const currentCharacter = character;
    const urlParts = character.url.split("/");
    currentCharacter.id = urlParts[urlParts.length - 2];
    currentCharacter.renderKey = `p${character.name}`;
  });
  setState({ nowQuery: false, people: resultFetch });
}

export async function getPeopleNew(
  request: string,
  page = "1",
  format = "json",
) {
  const options = {
    method: "GET",
  };
  const queryURL = getQueryURL(page, format, request);
  const resultFetch = await fetch(queryURL, options)
    .then((answer) => answer.json())
    .then((answer: PeopleAnswer) => {
      const result: People = answer.results ?? [];
      return result;
    })
    .catch(() => {
      const result: People = [];
      return result;
    });
  resultFetch.forEach((character) => {
    const currentCharacter = character;
    const urlParts = character.url.split("/");
    currentCharacter.id = urlParts[urlParts.length - 2];
    currentCharacter.renderKey = `p${character.name}`;
  });
  return resultFetch;
}

export async function getCharacter(id: string) {
  const options = {
    method: "GET",
  };
  const queryURL = getQueryCharacterURL(id);
  const resultFetch = await fetch(queryURL, options)
    .then((answer) => answer.json())
    .then((answer: Character) => {
      return answer;
    });
  // .catch(() => {
  //   const result = undefined;
  //   return result;
  // });
  if (resultFetch) resultFetch.id = id;
  return resultFetch;
}

export default getPeople;

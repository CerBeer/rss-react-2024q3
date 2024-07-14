import { People, PeopleAnswer, Character } from "./swapiTypes";

interface State {
  request: string;
  people: People;
  totalItem: number;
}

interface StateCard {
  nowQuery: boolean;
  character?: Character;
}

const baseURL = `${import.meta.env.VITE_API_URL_BASE}${import.meta.env.VITE_API_URL_SECTION}`;

function getQueryURL(page: string, request: string | null) {
  let queryURL = `${baseURL}?${import.meta.env.VITE_API_URL_PAGE}=${page}`;
  queryURL = `${queryURL}`;
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
) {
  const options = {
    method: "GET",
  };
  const queryURL = getQueryURL(page, request);
  const resultFetch = await fetch(queryURL, options)
    .then((answer) => answer.json())
    .then((answer: PeopleAnswer) => {
      const result = {
        request,
        people: answer.results ?? [],
        totalItem: answer.count ?? 0,
      };
      return result;
    })
    .catch(() => {
      const result = {
        request,
        people: [],
        totalItem: 0,
      };
      return result;
    });
  resultFetch.people.forEach((character) => {
    const currentCharacter = character;
    const urlParts = character.url.split("/");
    currentCharacter.id = urlParts[urlParts.length - 2];
    currentCharacter.renderKey = `p${character.name}`;
  });
  setState(resultFetch);
}

export async function getCharacter(
  setState: (state: StateCard) => void,
  id: string,
) {
  const options = {
    method: "GET",
  };
  const queryURL = getQueryCharacterURL(id);
  const resultFetch = await fetch(queryURL, options)
    .then((answer) => answer.json())
    .then((answer: Character) => {
      return answer;
    })
    .catch(() => {
      const result = undefined;
      return result;
    });
  if (resultFetch) resultFetch.id = id;
  setState({ nowQuery: false, character: resultFetch });
}

export default getPeople;

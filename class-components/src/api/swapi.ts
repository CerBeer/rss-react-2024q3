import { People, PeopleAnswer } from "./swapiTypes";

type State = {
  nowQuery: boolean;
  people: People;
};

const baseURL = `${import.meta.env.VITE_API_URL_BASE}${import.meta.env.VITE_API_URL_SECTION}`;

function getQueryURL(page: string, format: string, request: string | null) {
  let queryURL = `${baseURL}?${import.meta.env.VITE_API_URL_PAGE}=${page}`;
  queryURL = `${queryURL}&${import.meta.env.VITE_API_URL_FORMAT}=${format}`;
  if (request) queryURL = `${queryURL}&search=${request}`;
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
  setState({ nowQuery: false, people: resultFetch });
}

export default getPeople;

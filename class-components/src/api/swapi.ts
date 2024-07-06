import { Peoples, PeoplesAnswer } from "./swapiTypes";

type State = {
  nowQuery: boolean;
  peopleList: Peoples;
};

const baseURL = "https://swapi.dev/api/people/?page=1&format=json";

export async function getPeopleList(
  request: string,
  setState: (state: State) => void,
) {
  const options = {
    method: "GET",
  };
  let queryURL = baseURL;
  if (request) queryURL = `${queryURL}&search=${request}`;
  const resultFetch = await fetch(queryURL, options)
    .then((answer) => answer.json())
    .then((answer: PeoplesAnswer) => {
      const result: Peoples = answer.results ?? [];
      return result;
    })
    .catch(() => {
      const result: Peoples = [];
      return result;
    });
  setState({ nowQuery: false, peopleList: resultFetch });
}

export default getPeopleList;

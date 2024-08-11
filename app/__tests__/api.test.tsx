import { afterAll, afterEach, beforeAll, expect, test } from "vitest";

import { getPeople } from "../api/swapi";
import { MockCharacters, mockQuery } from "./test-utils/mockData";
import { http, delay, HttpResponse } from "msw";
import { setupServer } from "msw/node";

const mockCharacter = MockCharacters[0];
const PeopleAnswer = { count: 2, results: MockCharacters };

const handlers = [
  http.get("https://swapi.dev/api/people/", async () => {
    await delay(200);
    return HttpResponse.json(PeopleAnswer);
  }),
  http.get("https://swapi.dev/api/people/11/", async () => {
    await delay(100);
    return HttpResponse.json(mockCharacter);
  }),
];

const server = setupServer(...handlers);

beforeAll(() => {
  server.listen();
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
test("returns", async () => {
  const response = await getPeople(mockQuery);
  expect(response.totalItem).toEqual(2);
});

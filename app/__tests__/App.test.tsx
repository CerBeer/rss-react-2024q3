import { render, screen } from "@testing-library/react";
import {
  describe,
  it,
  afterAll,
  beforeAll,
  afterEach,
  expect,
  vi,
} from "vitest";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { MockCharacters, mockQuery } from "./test-utils/mockData";
import { createRemixStub } from "@remix-run/testing";
import App from "~/root";

const mockCharacter = MockCharacters[0];
const PeopleAnswer = { count: 2, results: MockCharacters };
const fetchResult = {
  query: mockQuery,
  totalItem: 2,
  people: MockCharacters,
};

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

const RemixStub = createRemixStub([
  {
    path: "/",
    Component: () => {
      return <App />;
    },
    loader: () => fetchResult,
  },
]);

describe("App", () => {
  it("renders the page Header", async () => {
    const spy = vi.spyOn(console, "error");
    spy.mockImplementation(() => null);
    render(
      <RemixStub
        hydrationData={{
          loaderData: {
            queryParams: fetchResult.query,
            people: fetchResult.people,
          },
        }}
      />,
    );

    expect(
      await screen.queryByText(/Search for Star Wars person or character/i),
    ).toBeInTheDocument();
  });

  // it("renders the page and includes the Search component", async () => {
  //   const nextApp = document.createElement("div");
  //   document.body.appendChild(nextApp);
  //   render(<RemixStub />);

  //   expect(await screen.findByTestId("search-query-input")).toBeInTheDocument();
  // });
});

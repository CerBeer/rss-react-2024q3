import { render, screen } from "@testing-library/react";
import {
  describe,
  it,
  vi,
  expect,
  afterAll,
  afterEach,
  beforeAll,
} from "vitest";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { MockCharacters } from "./mockData";
import MyApp from "../pages/_app";
import IndexPage from "../pages/index";
import { Router } from "next/router";

const mockCharacter = MockCharacters[0];
const PeopleAnswer = { count: 2, results: MockCharacters };
const mockRepo = {
  query: {
    search: "",
    page: "1",
    details: "",
  },
  people: MockCharacters,
  totalItem: 2,
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
  vi.mock("next/router", () => require("next-router-mock"));
});

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

const mockNavigate = vi.fn();

vi.mock("", async () => {
  const actual = await vi.importActual("");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("App", () => {
  it("renders the page Header", async () => {
    render(
      <MyApp
        pageProps={undefined}
        Component={() => <IndexPage repo={mockRepo} />}
        router={{} as Router}
      />,
    );

    expect(
      await screen.findByText("Search for Star Wars person or character"),
    ).toBeInTheDocument();
  });

  it("renders the page and includes the Search component", async () => {
    render(
      <MyApp
        pageProps={undefined}
        Component={() => <IndexPage repo={mockRepo} />}
        router={{} as Router}
      />,
    );

    expect(await screen.findByTestId("search-query-input")).toBeInTheDocument();
  });
});

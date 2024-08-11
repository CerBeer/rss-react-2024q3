import { render, screen } from "./test-utils/test-utils";
import {
  describe,
  it,
  vi,
  afterAll,
  beforeAll,
  afterEach,
  expect,
} from "vitest";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import { MockCharacters } from "./test-utils/mockData";
import Page from "../app/page";

const searchParams = {
  search: "",
  page: "1",
  details: "",
};

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

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

describe("App", () => {
  it("renders the page Header", async () => {
    const nextApp = document.createElement("div");
    document.body.appendChild(nextApp);
    render(await Page({ searchParams: searchParams }), { container: nextApp });

    expect(
      screen.queryByText(/Search for Star Wars person or character/i),
    ).toBeInTheDocument();
  });

  it("renders the page and includes the Search component", async () => {
    const nextApp = document.createElement("div");
    document.body.appendChild(nextApp);
    render(await Page({ searchParams: searchParams }), { container: nextApp });

    expect(await screen.findByTestId("search-query-input")).toBeInTheDocument();
  });
});

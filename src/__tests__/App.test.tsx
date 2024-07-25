import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  describe,
  it,
  vi,
  expect,
  afterAll,
  afterEach,
  beforeAll,
} from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import store from "../redux/store/store";
import App from "../App";
import { MockCharacters } from "./mockData";
import Card from "../components/card/card";

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

beforeAll(() => server.listen());

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
  it("renders the page Header", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(
      screen.queryByText("Search for Star Wars person or character"),
    ).toBeInTheDocument();
  });

  it("renders the page and includes the Search component", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("search-query-input")).toBeInTheDocument();
  });

  it("Renders the spinner", () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </Provider>,
    );

    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("close Card with button", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/page/1/"]}>
          <Routes>
            <Route path="/page/:page?" element={<App />}>
              <Route path="card/:elementId" element={<Card />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const cardLink = await screen.findByTestId(`card${mockCharacter.id}`);
    expect(cardLink).toBeInTheDocument();
    await userEvent.setup().click(cardLink);
    const closeButton = await screen.findByRole("button", { name: /X/i });
    expect(closeButton).toBeInTheDocument();

    await userEvent.setup().click(closeButton);
    expect(
      screen.queryByRole("button", { name: /X/i }),
    ).not.toBeInTheDocument();
  });

  it("close Card with click around card", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/page/1/"]}>
          <Routes>
            <Route path="/page/:page?" element={<App />}>
              <Route path="card/:elementId" element={<Card />} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const cardLink = await screen.findByTestId(`card${mockCharacter.id}`);
    expect(cardLink).toBeInTheDocument();
    await userEvent.setup().click(cardLink);
    const closeButton = await screen.findByRole("button", { name: /X/i });
    expect(closeButton).toBeInTheDocument();

    const titlePage = await screen.findByTestId("root-theme");
    await userEvent.setup().click(titlePage);
    expect(
      screen.queryByRole("button", { name: /X/i }),
    ).not.toBeInTheDocument();
  });
});

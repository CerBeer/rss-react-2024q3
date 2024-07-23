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
import Card from "../components/card/card";
import store from "../redux/store/store";
import { Character } from "../redux/services/types";

const mockCharacter: Character = {
  id: "1",
  renderKey: "1",
  name: "Test Character",
  birth_year: "now",
  gender: "unknown",
  height: "87",
  mass: "49",
  url: "/id/1",
};

const handlers = [
  http.get("https://swapi.dev/api/people/1/", async () => {
    await delay(150);
    return HttpResponse.json(mockCharacter);
  }),
];

const server = setupServer(...handlers);

// Enable API mocking before tests.
beforeAll(() => server.listen());

// Reset any runtime request handlers we may add during the tests.
afterEach(() => server.resetHandlers());

// Disable API mocking after the tests are done.
afterAll(() => server.close());

const mockNavigate = vi.fn();

vi.mock("", async () => {
  const actual = await vi.importActual("");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Card", () => {
  it("renders spinner while fetching data", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/card/1"]}>
          <Routes>
            <Route path="/card/:elementId" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(await screen.findByTestId("spinner")).toBeInTheDocument();
  });

  it("renders loaded Card", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/card/1"]}>
          <Routes>
            <Route path="/card/:elementId" element={<Card />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByAltText("character")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /X/i })).toBeInTheDocument();
  });

  it("close Card", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/page/1/card/1"]}>
          <Routes>
            <Route path="/page/1/card/:elementId" element={<Card />} />
            <Route path="/page/1/" element={<div> </div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const closeButton = await screen.findByRole("button", { name: /X/i });
    expect(closeButton).toBeInTheDocument();

    await userEvent.setup().click(closeButton);
    expect(screen.queryByText("Test Character")).not.toBeInTheDocument();
  });
});

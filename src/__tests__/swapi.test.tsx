import { render, screen } from "@testing-library/react";
import { describe, it, expect, afterAll, afterEach, beforeAll } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { http, HttpResponse, delay } from "msw";
import { setupServer } from "msw/node";
import store from "../redux/store/store";
import App from "../App";
import Card from "../components/card/card";

const handlers = [
  http.get("https://swapi.dev/api/people/", async () => {
    await delay(100);
    return HttpResponse.json();
  }),
  http.get("https://swapi.dev/api/people/11/", async () => {
    await delay(100);
    return HttpResponse.json();
  }),
];

const server = setupServer(...handlers);

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

describe("swapi", () => {
  it("Show empty search result", async () => {
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

    const emptyMessage = await screen.findByText("Result is empty");
    expect(emptyMessage).toBeInTheDocument();
  });
});

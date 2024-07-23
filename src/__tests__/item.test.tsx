import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Item from "../components/item/item";
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

describe("Item", () => {
  it("renders item", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Item character={mockCharacter} />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.queryByText("Test Character")).toBeInTheDocument();
  });

  it("opens Card", async () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Item character={mockCharacter} />} />
            <Route path="/card/:elementId" element={<div>Opened Card</div>} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    await userEvent.setup().click(screen.getByText("Test Character"));
    expect(screen.getByText("Opened Card")).toBeInTheDocument();
  });
});

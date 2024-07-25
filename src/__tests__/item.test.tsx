import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Item from "../components/item/item";
import { MockCharacters } from "./mockData";

const mockCharacter = MockCharacters[0];

describe("Item", () => {
  it("renders item", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Item character={mockCharacter} />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.queryByText(mockCharacter.name)).toBeInTheDocument();
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

    await userEvent.setup().click(screen.getByText(mockCharacter.name));
    expect(screen.getByText("Opened Card")).toBeInTheDocument();
  });
});

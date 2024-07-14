import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import Item from "../components/item/item";
import { Character } from "../api/swapiTypes";

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
      <BrowserRouter>
        <Item character={mockCharacter} />
      </BrowserRouter>,
    );
    expect(screen.queryByText("Test Character")).toBeInTheDocument();
  });

  it("opens Card", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Item character={mockCharacter} />} />
          <Route path="/card/:elementId" element={<div>Opened Card</div>} />
        </Routes>
      </MemoryRouter>,
    );

    await userEvent.setup().click(screen.getByText("Test Character"));
    expect(screen.getByText("Opened Card")).toBeInTheDocument();
  });
});

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Card from "../components/card/card";
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

const mockFetch = vi.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve(mockCharacter),
  }),
);

const mockNavigate = vi.fn();

vi.mock("", async () => {
  const actual = await vi.importActual("");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Card", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", mockFetch);
  });

  it("renders spinner while fetching data", () => {
    render(
      <MemoryRouter initialEntries={["/card/elementId"]}>
        <Routes>
          <Route path="/card/:elementId" element={<Card />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(screen.getByTestId("spinner")).toBeInTheDocument();
  });

  it("renders loaded Card", async () => {
    render(
      <MemoryRouter initialEntries={["/card/elementId"]}>
        <Routes>
          <Route path="/card/:elementId" element={<Card />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    expect(screen.getByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByAltText("character")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /X/i })).toBeInTheDocument();
  });

  it("close Card", async () => {
    render(
      <MemoryRouter initialEntries={["/page/1/card/elementId"]}>
        <Routes>
          <Route path="/page/1/card/:elementId" element={<Card />} />
          <Route path="/page/1/" element={<div> </div>} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => expect(mockFetch).toHaveBeenCalled());

    const closeButton = await screen.findByRole("button", { name: /X/i });
    expect(closeButton).toBeInTheDocument();

    await userEvent.setup().click(closeButton);
    expect(screen.queryByText("Test Character")).not.toBeInTheDocument();
  });
});

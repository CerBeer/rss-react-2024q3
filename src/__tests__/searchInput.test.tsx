import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SearchInput from "../components/searchInput/searchInput";

describe("SearchInput", () => {
  it("renders SearchInput", () => {
    render(
      <BrowserRouter>
        <SearchInput />
      </BrowserRouter>,
    );
    expect(screen.queryByText("Search")).toBeInTheDocument();
  });

  it("submit Search", async () => {
    render(
      <BrowserRouter>
        <SearchInput />
      </BrowserRouter>,
    );

    const searchInput = screen.getByTestId("search-query-input");
    fireEvent.change(searchInput, { target: { value: "yoda" } });

    await userEvent.setup().click(screen.getByText("Search"));
    expect(screen.getByDisplayValue("yoda")).toBeInTheDocument();
  });
});

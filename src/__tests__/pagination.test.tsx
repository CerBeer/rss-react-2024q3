import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Pagination from "../components/paginations/paginations";

describe("Pagination", () => {
  it("renders Pagination", () => {
    render(
      <BrowserRouter>
        <Pagination totalItem={8} page="1" />
      </BrowserRouter>,
    );
    expect(screen.getByText("prev")).toBeInTheDocument();
    expect(screen.getByText("1 of 1")).toBeInTheDocument();
  });
});

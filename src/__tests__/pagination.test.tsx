import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Pagination from "../components/pagination/pagination";

describe("Pagination", () => {
  it("renders Pagination", () => {
    render(
      <BrowserRouter>
        <Pagination totalItem={8} page="1" />
      </BrowserRouter>,
    );
    expect(screen.getByText("prev")).toBeInTheDocument();
    expect(screen.getByText("1 of 1")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();
  });

  it("renders Pagination 5 pages", () => {
    render(
      <BrowserRouter>
        <Pagination totalItem={45} page="3" />
      </BrowserRouter>,
    );
    expect(screen.getByText("prev")).toBeInTheDocument();
    expect(screen.getByText("3 of 5")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();
  });
});

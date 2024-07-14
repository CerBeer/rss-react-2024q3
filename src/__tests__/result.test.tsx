import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Result from "../components/result/result";
import { People } from "../api/swapiTypes";

const mockPeople: People = [
  {
    id: "1",
    renderKey: "1",
    name: "Test Character",
    birth_year: "now",
    gender: "unknown",
    height: "87",
    mass: "49",
    url: "/id/1",
  },
];

describe("Result", () => {
  it("renders empty Result", () => {
    render(
      <BrowserRouter>
        <Result people={[]} totalItem={0} />
      </BrowserRouter>,
    );
    expect(screen.queryByText("Result is empty")).toBeInTheDocument();
  });

  it("renders test result", () => {
    render(
      <BrowserRouter>
        <Result people={mockPeople} totalItem={1} />
      </BrowserRouter>,
    );

    expect(screen.getByText("Test Character")).toBeInTheDocument();
  });
});

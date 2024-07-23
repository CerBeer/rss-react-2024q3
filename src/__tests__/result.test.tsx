import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import Result from "../components/result/result";
import { People } from "../redux/services/types";

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
    const data = { people: [], totalItem: 0 };
    render(
      <BrowserRouter>
        <Result data={data} />
      </BrowserRouter>,
    );
    expect(screen.queryByText("Result is empty")).toBeInTheDocument();
  });

  it("renders test result", () => {
    const data = { people: mockPeople, totalItem: 1 };
    render(
      <BrowserRouter>
        <Result data={data} />
      </BrowserRouter>,
    );

    expect(screen.getByText("Test Character")).toBeInTheDocument();
  });

  it("close test result", async () => {
    const data = { people: mockPeople, totalItem: 1 };
    render(
      <MemoryRouter initialEntries={["/page/1/card/1/?search="]}>
        <Result data={data} />
      </MemoryRouter>,
    );

    await userEvent.setup().click(screen.getByTestId("search-result"));
    expect(screen.getByText("Test Character")).toBeInTheDocument();
  });
});

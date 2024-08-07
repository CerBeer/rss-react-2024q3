import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeAll } from "vitest";
import Pagination from "../components/pagination/pagination";
import { Router } from "next/router";
import MyApp from "../_old_pages/_app";

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
});

describe("Pagination", () => {
  it("renders Pagination", () => {
    render(
      <MyApp
        pageProps={undefined}
        Component={() => <Pagination totalItem={8} />}
        router={{} as Router}
      />,
    );
    expect(screen.queryByText("prev")).not.toBeInTheDocument();
    expect(screen.queryByText("1 of 1")).toBeInTheDocument();
    expect(screen.queryByText("next")).not.toBeInTheDocument();
  });

  it("renders Pagination 5 pages", async () => {
    render(
      <MyApp
        pageProps={undefined}
        Component={() => <Pagination totalItem={45} />}
        router={{} as Router}
      />,
    );
    expect(screen.getByText("1 of 5")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();
  });
});

import { describe, it, expect, beforeAll, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Theme } from "../features/theme";
import { Router } from "next/router";
import MyApp from "../_old_pages/_app";
import IndexPage from "../_old_pages";
import { MockCharacters } from "./mockData";

const mockRepo = {
  query: {
    search: "",
    page: "1",
    details: "",
  },
  people: MockCharacters,
  totalItem: 2,
};

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
});

describe("Theme switch", () => {
  it("renders the component ThemeSwitch", () => {
    render(
      <MyApp
        pageProps={undefined}
        Component={() => <IndexPage repo={mockRepo} />}
        router={{} as Router}
      />,
    );

    expect(screen.getByText(`${Theme.Dark} mode`)).toBeInTheDocument();
  });

  it("switch to dark theme", async () => {
    render(
      <MyApp
        pageProps={undefined}
        Component={() => <IndexPage repo={mockRepo} />}
        router={{} as Router}
      />,
    );

    await userEvent.setup().click(screen.getByTestId("theme-change-input"));
    expect(screen.getByText(`${Theme.Light} mode`)).toBeInTheDocument();
    await userEvent.setup().click(screen.getByTestId("theme-change-input"));
    expect(screen.getByText(`${Theme.Dark} mode`)).toBeInTheDocument();
  });
});

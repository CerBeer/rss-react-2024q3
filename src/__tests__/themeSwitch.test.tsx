import { describe, it, expect, vi } from "vitest";
import { render, screen } from "./test-utils/test-utils";
import { Theme } from "../features/theme-provider";
import HomePage from "../app/home-page";
import { MockCharacters } from "./test-utils/mockData";
import userEvent from "@testing-library/user-event";

const mockRepo = {
  query: {
    search: "",
    page: "1",
    details: "",
  },
  people: MockCharacters,
  totalItem: 2,
};

vi.mock("next/navigation", async () => {
  const actual = await vi.importActual("next/navigation");
  return {
    ...actual,
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(() => ({
      get: vi.fn(),
    })),
    usePathname: vi.fn(),
  };
});

describe("Theme switch", () => {
  it("renders the component ThemeSwitch", async () => {
    const nextApp = document.createElement("div");
    document.body.appendChild(nextApp);
    render(<HomePage recentPeople={mockRepo} />, { container: nextApp });

    expect(screen.queryByText(`${Theme.Dark} mode`)).toBeInTheDocument();
  });

  it("switch to dark theme", async () => {
    const reactapp = document.createElement("div");
    document.body.appendChild(reactapp);
    render(<HomePage recentPeople={mockRepo} />, { container: reactapp });

    await userEvent.setup().click(screen.getByTestId("theme-change-input"));
    expect(screen.getByText(`${Theme.Light} mode`)).toBeInTheDocument();
    await userEvent.setup().click(screen.getByTestId("theme-change-input"));
    expect(screen.getByText(`${Theme.Dark} mode`)).toBeInTheDocument();
  });
});

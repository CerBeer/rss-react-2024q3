import { render, screen } from "./test-utils/test-utils";
import { describe, it, vi, expect } from "vitest";
import { MockCharacters } from "./test-utils/mockData";
import Result from "../components/result/result";

const mockRepoEmpty = {
  query: {
    search: "",
    page: "1",
    details: "",
  },
  people: [],
  totalItem: 2,
};

const mockRepo = {
  query: {
    search: "",
    page: "1",
    details: "11",
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

describe("Card", () => {
  it("renders empty result", async () => {
    const nextApp = document.createElement("div");
    document.body.appendChild(nextApp);
    render(<Result {...mockRepoEmpty} />, {
      container: nextApp,
    });

    expect(await screen.findByText(/Result is empty/)).toBeInTheDocument();
  });

  it("renders details", async () => {
    const nextApp = document.createElement("div");
    document.body.appendChild(nextApp);
    render(<Result {...mockRepo} />, {
      container: nextApp,
    });

    expect(screen.getByAltText("character")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /X/i })).toBeInTheDocument();
  });
});

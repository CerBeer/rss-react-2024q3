import { render, screen } from "./test-utils/test-utils";
import { describe, it, vi, expect } from "vitest";
import Card from "../components/card/card";
import { MockCharacters } from "./test-utils/mockData";

const mockCharacter = MockCharacters[0];
const mockQuery = {
  search: "",
  page: "1",
  details: "11",
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
  it("renders loaded Card", async () => {
    const nextApp = document.createElement("div");
    document.body.appendChild(nextApp);
    render(<Card data={mockCharacter} query={mockQuery} />, {
      container: nextApp,
    });

    expect(await screen.findByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByAltText("character")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /X/i })).toBeInTheDocument();
  });
});

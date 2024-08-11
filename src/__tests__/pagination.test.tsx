import { render, screen } from "./test-utils/test-utils";
import { describe, it, vi, expect } from "vitest";
import Pagination from "../components/pagination/pagination";

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

describe("Pagination", () => {
  it("renders Pagination", () => {
    const nextApp = document.createElement("div");
    document.body.appendChild(nextApp);
    render(<Pagination totalItem={8} />, { container: nextApp });
    expect(screen.queryByText("prev")).not.toBeInTheDocument();
    expect(screen.queryByText("1 of 1")).toBeInTheDocument();
    expect(screen.queryByText("next")).not.toBeInTheDocument();
  });

  it("renders Pagination 5 pages", async () => {
    const nextApp = document.createElement("div");
    document.body.appendChild(nextApp);
    render(<Pagination totalItem={45} />, { container: nextApp });
    expect(screen.getByText("1 of 5")).toBeInTheDocument();
    expect(screen.getByText("next")).toBeInTheDocument();
  });
});

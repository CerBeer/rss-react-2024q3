import { render, screen } from "@testing-library/react";
import { describe, it, vi, expect, beforeAll } from "vitest";
import Card from "../components/card/card";
import { MockCharacters } from "./mockData";
import MyApp from "../pages/_app";
import { Router } from "next/router";

const mockCharacter = MockCharacters[0];
const mockQuery = {
  search: "",
  page: "1",
  details: "11",
};

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
});

const mockNavigate = vi.fn();

vi.mock("", async () => {
  const actual = await vi.importActual("");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Card", () => {
  it("renders loaded Card", async () => {
    render(
      <MyApp
        pageProps={undefined}
        Component={() => <Card data={mockCharacter} query={mockQuery} />}
        router={{} as Router}
      />,
    );

    expect(await screen.findByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByAltText("character")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /X/i })).toBeInTheDocument();
  });
});

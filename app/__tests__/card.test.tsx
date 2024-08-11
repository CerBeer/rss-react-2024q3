import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Card from "../components/card";
import { MockCharacters } from "./test-utils/mockData";
import { createRemixStub } from "@remix-run/testing";
import { Provider } from "react-redux";
import store from "~/store/store";

const mockCharacter = MockCharacters[0];
const mockQuery = {
  search: "",
  page: "1",
  details: "11",
};

describe("Card", () => {
  it("renders loaded Card", async () => {
    const RemixStub = createRemixStub([
      {
        path: "/",
        Component: () => {
          return (
            <Provider store={store}>
              <Card data={mockCharacter} query={mockQuery} />
            </Provider>
          );
        },
      },
    ]);
    render(<RemixStub />);

    expect(await screen.findByText(mockCharacter.name)).toBeInTheDocument();
    expect(screen.getByAltText("character")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /X/i })).toBeInTheDocument();
  });
});

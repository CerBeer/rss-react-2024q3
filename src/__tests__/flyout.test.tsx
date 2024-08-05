import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../store";
import Checked from "../components/checked/checked";
import Flyout from "../components/flyout/flyout";

const mockCharacters = [
  {
    id: "11",
    renderKey: "11",
    name: "Test Character 1",
    birth_year: "now",
    gender: "unknown",
    height: "17",
    mass: "19",
    url: "/id/11",
  },
  {
    id: "22",
    renderKey: "22",
    name: "Test Character 2",
    birth_year: "tomorrow",
    gender: "same",
    height: "27",
    mass: "29",
    url: "/id/22",
  },
];

describe("Item", () => {
  it("opens Card", async () => {
    render(
      <Provider store={store}>
        <Checked
          character={mockCharacters[0]}
          className="item-checked-change"
          title="ClickIt1"
          idPrefix="item"
        />
        <Checked
          character={mockCharacters[1]}
          className="item-checked-change"
          title="ClickIt2"
          idPrefix="item"
        />
        <Flyout />
      </Provider>,
    );

    await userEvent.setup().click(screen.getByText("ClickIt1"));
    expect(screen.getByText("1 item selected")).toBeInTheDocument();

    await userEvent.setup().click(screen.getByText("Download"));
    expect(screen.getByText("1 item selected")).toBeInTheDocument();

    await userEvent.setup().click(screen.getByText("ClickIt2"));
    expect(screen.getByText("2 items selected")).toBeInTheDocument();

    await userEvent.setup().click(screen.getByText("Unselect all"));
    expect(screen.getByText("0 item selected")).toBeInTheDocument();
  });
});

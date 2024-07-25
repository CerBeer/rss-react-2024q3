import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import { Character } from "../redux/services/types";
import Checked from "../components/checked/checked";

const mockCharacter: Character = {
  id: "1",
  renderKey: "1",
  name: "Test Character",
  birth_year: "now",
  gender: "unknown",
  height: "87",
  mass: "49",
  url: "/id/1",
};

describe("Item", () => {
  it("opens Card", async () => {
    const { container } = render(
      <Provider store={store}>
        <Checked
          character={mockCharacter}
          className="item-checked-change"
          title="ClickIt"
          idPrefix="item"
        />
        <Checked
          character={mockCharacter}
          className="character-checked-change"
          title="Select"
          idPrefix="card"
        />
      </Provider>,
    );

    const select = container.querySelector(`#card${mockCharacter.id}`)!;

    await userEvent.setup().click(screen.getByText("ClickIt"));
    expect((select as HTMLInputElement).checked).toEqual(true);

    await userEvent.setup().click(screen.getByText("ClickIt"));
    expect((select as HTMLInputElement).checked).toEqual(false);
  });
});

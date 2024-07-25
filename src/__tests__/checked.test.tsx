import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import store from "../redux/store/store";
import Checked from "../components/checked/checked";
import { MockCharacters } from "./mockData";

const mockCharacter = MockCharacters[0];

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

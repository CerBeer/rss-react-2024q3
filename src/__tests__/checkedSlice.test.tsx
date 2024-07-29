import { describe, expect, it } from "vitest";
import checkedReducer, {
  addCharacter,
  delCharacter,
  clearChecked,
} from "../redux/store/checkedSlice";
import { MockCharacters } from "./mockData";

const mockCharacters = MockCharacters;

describe("checkedSlice", () => {
  const actionAdd1 = { type: addCharacter.type, payload: mockCharacters[0] };
  const actionAdd2 = { type: addCharacter.type, payload: mockCharacters[1] };
  const actionDel1 = { type: delCharacter.type, payload: mockCharacters[0] };
  const actionDel2 = { type: delCharacter.type, payload: mockCharacters[1] };
  const actionClear = { type: clearChecked.type };
  it("add Character with add action", () => {
    const result = checkedReducer({ checked: [] }, actionAdd1);
    expect(result.checked[0].id).toBe(mockCharacters[0].id);
  });
  it("add same Character in store will be only one", () => {
    let result = checkedReducer({ checked: [] }, actionAdd1);
    result = checkedReducer(result, actionAdd1);
    expect(result.checked.length).toBe(1);
  });
  it("add two Character in store will be two", () => {
    let result = checkedReducer({ checked: [] }, actionAdd1);
    result = checkedReducer(result, actionAdd2);
    expect(result.checked.length).toBe(2);
  });
  it("add Character1 del Character2 in store to be Character1", () => {
    let result = checkedReducer({ checked: [] }, actionAdd1);
    result = checkedReducer(result, actionDel2);
    expect(result.checked.length).toBe(1);
    expect(result.checked[0].id).toBe(mockCharacters[0].id);
  });
  it("add Character1 and Character2 in store to be two Characters", () => {
    let result = checkedReducer({ checked: [] }, actionAdd1);
    result = checkedReducer(result, actionAdd2);
    expect(result.checked.length).toBe(2);
    expect(result.checked[0].id).toBe(mockCharacters[0].id);
    expect(result.checked[1].id).toBe(mockCharacters[1].id);
  });
  it("add Character1 and Character2 and del Character1 in store to be Character2", () => {
    let result = checkedReducer({ checked: [] }, actionAdd1);
    result = checkedReducer(result, actionAdd2);
    result = checkedReducer(result, actionDel1);
    expect(result.checked.length).toBe(1);
    expect(result.checked[0].id).toBe(mockCharacters[1].id);
  });
  it("add Character1 and Character2 and clear Store in store not to be Characters", () => {
    let result = checkedReducer({ checked: [] }, actionAdd1);
    result = checkedReducer(result, actionAdd2);
    result = checkedReducer(result, actionClear);
    expect(result.checked.length).toBe(0);
  });
});

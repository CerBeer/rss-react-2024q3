import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { People, CharacterRecord } from "../api/swapiTypes";

interface CheckedState {
  checked: People;
}

export const checkedInitial: People = [];

const initialState: CheckedState = {
  checked: checkedInitial,
};

const checkedSlice = createSlice({
  name: "checkedSlice",
  initialState,
  reducers: {
    addCharacter(state, action: PayloadAction<CharacterRecord>) {
      const newState = state;
      const notExist = !newState.checked.find(
        (item) => item.id === action.payload.id,
      );
      if (notExist) newState.checked.push(action.payload);
    },
    delCharacter(state, action: PayloadAction<CharacterRecord>) {
      const newState = state;
      newState.checked = newState.checked.filter(
        (item) => item.id !== action.payload.id,
      );
    },
    clearChecked(state) {
      const newState = state;
      newState.checked = [];
    },
  },
});

export const { addCharacter, delCharacter, clearChecked } =
  checkedSlice.actions;

export default checkedSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { People } from "../../api/swapiTypes";

interface PeopleState {
  people: People;
}

export const peopleInitial: People = [];

const initialState: PeopleState = {
  people: peopleInitial,
};

const peopleSlice = createSlice({
  name: "peopleSlice",
  initialState,
  reducers: {
    setPeople(state, action: PayloadAction<People>) {
      const newState = state;
      newState.people = action.payload;
    },
  },
});

export const { setPeople } = peopleSlice.actions;

export default peopleSlice.reducer;

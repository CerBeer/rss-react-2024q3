import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SubmitState {
  id: string;
  isRegular: boolean;
  name: string;
  age: number;
  email: string;
  password: string;
  gender: "M" | "F";
  accept: boolean;
  picture: string;
  country: string[];
}

const initialState: SubmitState[] = [];

const submitsSlice = createSlice({
  name: "SubmitsState",
  initialState,
  reducers: {
    add(state, action: PayloadAction<SubmitState>) {
      const newState = state;
      newState.push(action.payload);
    },
  },
});

export const { add } = submitsSlice.actions;

export default submitsSlice.reducer;

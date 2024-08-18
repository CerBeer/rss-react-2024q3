import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IFormData } from "../../utils/formdata";

export interface SubmitState {
  id: string;
  isRegular: boolean;
  formData: IFormData;
}

const initialState: SubmitState[] = [];

const submitsSlice = createSlice({
  name: "SubmitsState",
  initialState,
  reducers: {
    add(state, action: PayloadAction<SubmitState>) {
      const newState = state;
      const newFormData = action.payload;
      newFormData.id = `${Date.now() / 1000}`;
      newState.unshift(action.payload);
    },
  },
});

export const { add } = submitsSlice.actions;

export default submitsSlice.reducer;

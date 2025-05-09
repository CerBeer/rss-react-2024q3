import { configureStore } from "@reduxjs/toolkit";
import submitsReducer from "./submitsSlice";

const store = configureStore({
  reducer: {
    submitsSlice: submitsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

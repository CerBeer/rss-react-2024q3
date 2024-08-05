import { configureStore } from "@reduxjs/toolkit";

import counterReducer from "./features/counter/counterSlice";
import checkedReducer from "./features/checkedSlice";

export function makeStore() {
  return configureStore({
    reducer: { counter: counterReducer, checkedSlice: checkedReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

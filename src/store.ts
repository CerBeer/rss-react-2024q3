import { configureStore } from "@reduxjs/toolkit";

import checkedReducer from "./features/checkedSlice";

export function makeStore() {
  return configureStore({
    reducer: { checkedSlice: checkedReducer },
  });
}

const store = makeStore();

export type AppState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default store;

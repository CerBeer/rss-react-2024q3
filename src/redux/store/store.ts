import { configureStore } from "@reduxjs/toolkit";
import { swApi } from "../services/swapi";
import checkedReducer from "./checkedSlice";

const store = configureStore({
  reducer: {
    [swApi.reducerPath]: swApi.reducer,
    checkedSlice: checkedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import { swApi } from "../services/swapi";
// import peopleReducer from "./peopleSlice";

const store = configureStore({
  reducer: {
    [swApi.reducerPath]: swApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(swApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

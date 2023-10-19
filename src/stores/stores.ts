import { configureStore } from "@reduxjs/toolkit";
import tokenListReducer from "../features/token/tokenSlice";

export const store = configureStore({
  reducer: {
    tokens: tokenListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
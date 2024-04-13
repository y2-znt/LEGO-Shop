import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./features/cartSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
  },
  devTools: true,
});

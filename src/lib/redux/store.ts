import { configureStore } from "@reduxjs/toolkit";
import cartSliceReducer from "./features/cartSlice";
import favSliceReducer from "./features/favSlice";

export const store = configureStore({
  reducer: {
    cart: cartSliceReducer,
    favorite: favSliceReducer,
  },
  devTools: true,
});

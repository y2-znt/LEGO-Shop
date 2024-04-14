import { createSlice } from "@reduxjs/toolkit";

type CartType = {
  cartItems: any[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
};

// Initialize cartItems based on localStorage or an empty array if not available
const initialCartItems =
  // Check if "cartItems" key exists in localStorage
  // If yes, retrieve and parse its value
  // If not found, initialize cartItems with an empty array
  typeof window !== "undefined" && localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems")!)
    : [];

const initialState: CartType = {
  cartItems: initialCartItems,
  cartTotalQuantity: 0,
  cartTotalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);
      if (existingItem) {
        existingItem.cartQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }
      // Stock data in LocalStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;

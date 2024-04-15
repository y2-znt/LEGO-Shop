import { createSlice } from "@reduxjs/toolkit";

type CartType = {
  cartItems: any[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
  notificationCount: number;
};

// Initialize cartItems based on the value stored in localStorage, or initialize with an empty array if "cartItems" key is not found in localStorage
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
  notificationCount: 0,
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
        state.notificationCount++;
      }
      // Stock data in LocalStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      // Remove the cart item with the ID matching the action payload
      state.cartItems = state.cartItems.filter((cartItem: any) => {
        if (cartItem.id === action.payload.id) {
          state.notificationCount -= 1; // Decrement notification count
          return false; // Exclude the item from the filtered array
        }
        return true; // Include other items in the filtered array
      });

      // Update the LocalStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === itemId
      );

      if (itemIndex !== -1) {
        // Get the item object from the cartItems array
        const item = state.cartItems[itemIndex];
        if (item.cartQuantity > 0) {
          item.cartQuantity -= 1;
        } else {
          // If the quantity is 1 or less, remove the item from the cart
          state.cartItems.splice(itemIndex, 1);
        }
      }
    },
    increaseCart: (state, action) => {
      const itemId = action.payload.id;
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === itemId
      );

      if (itemIndex !== -1) {
        // Get the item object from the cartItems array
        const item = state.cartItems[itemIndex];
        if (item.cartQuantity > 0) {
          item.cartQuantity += 1;
        }
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.notificationCount = 0;
      // Update the LocalStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  increaseCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

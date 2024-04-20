import { createSlice } from "@reduxjs/toolkit";
import { Bounce, toast } from "react-toastify";

type CartType = {
  cartItems: any[];
  cartTotalQuantity: number;
  cartTotalAmount: number;
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
        toast.success("Product added to cart", {
          position: "top-left",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }
      state.cartTotalQuantity += 1;

      // Stock data in LocalStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      const itemIndex = state.cartItems.findIndex(
        (cartItem) => cartItem.id === id
      );

      if (itemIndex !== -1) {
        state.cartItems[itemIndex];
        state.cartItems.splice(itemIndex, 1);
      }

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
        if (item.cartQuantity > 1) {
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
      // Update the LocalStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    getTotals: (state) => {
      // reduce method to calculate total
      const { total, quantity } = state.cartItems.reduce(
        // Update the accumulator properties: total and quantity
        (acc, { price, cartQuantity }) => ({
          total: acc.total + price * cartQuantity,
          quantity: acc.quantity + cartQuantity,
        }),
        // Initial values for the accumulator
        { total: 0, quantity: 0 }
      );

      // Update the state values
      state.cartTotalQuantity = quantity;
      state.cartTotalAmount = total;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  decreaseCart,
  increaseCart,
  clearCart,
  getTotals,
} = cartSlice.actions;

export default cartSlice.reducer;

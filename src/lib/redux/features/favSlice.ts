import { createSlice } from "@reduxjs/toolkit";

type favType = {
  favItems: any[];
  favQuantity: number;
};

const initialFavItems =
  typeof window !== "undefined" && localStorage.getItem("favItems")
    ? JSON.parse(localStorage.getItem("favItems")!)
    : [];

const initialState: favType = {
  favItems: initialFavItems,
  favQuantity: 0,
};

const favSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFav: (state, action) => {
      const { id } = action.payload;
      const existingItem = state.favItems.find((item) => item.id === id);
      if (!existingItem) {
        state.favItems.push({ ...action.payload, cartQuantity: 1 });
      }
      // Update the LocalStorage
      localStorage.setItem("favItems", JSON.stringify(state.favItems));
    },
  },
});

export const { addToFav } = favSlice.actions;

export default favSlice.reducer;

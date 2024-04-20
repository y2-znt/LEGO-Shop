import { createSlice } from "@reduxjs/toolkit";

type favType = {
  favItems: any[];
  favQuantity: number;
};

const initialState: favType = {
  favItems: [],
  favQuantity: 0,
};

const favSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFav: (state, action) => {
      const { id } = action.payload;
      state.favItems.find((item) => item.id === id);
      state.favItems.push({ ...action.payload, cartQuantity: 1 });
    },
  },
});

export const { addToFav } = favSlice.actions;

export default favSlice.reducer;

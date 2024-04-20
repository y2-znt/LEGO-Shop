import { createSlice } from "@reduxjs/toolkit";

type favType = {
  favItems: any[];
};

const initialState: favType = {
  favItems: [],
};

const favSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFav: (state, action) => {
      state.favItems.push(action.payload);
    },
  },
});

export const { addToFav } = favSlice.actions;

export default favSlice.reducer;

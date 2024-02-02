import { createSlice } from "@reduxjs/toolkit";
// import CitiesService from "../services/CitiesService";

const initialState = {
  book: [],
};

export const bookSlice = createSlice({
  name: "book",
  initialState,
  reducers: {
    setBook(state, action) {
      state.book = action.payload;
    },
  },
});

export const { setBook } = bookSlice.actions;


export default bookSlice.reducer;

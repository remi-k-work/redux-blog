// redux stuff
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  keyword: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    // The user has typed a search phrase
    keywordEntered(state, action) {
      // Destructure the payload
      const keyword = action.payload;

      state.keyword = keyword;
    },
  },
});

// Action creators are generated for each case reducer function
export const { keywordEntered } = searchSlice.actions;

export default searchSlice.reducer;

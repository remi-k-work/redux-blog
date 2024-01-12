// redux stuff
import { createSlice } from "@reduxjs/toolkit";

// users logic & slice
import { fetchUsers } from "./usersThunks";

const initialState = [];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { postAdded } = usersSlice.actions;

export default usersSlice.reducer;

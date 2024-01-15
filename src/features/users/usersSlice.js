// redux stuff
import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

// users logic & slice
import { fetchUsers } from "./usersThunks";

export const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // Destructure the payload
      const loadedUsers = action.payload;

      usersAdapter.setAll(state, loadedUsers);
    });
  },
});

// Action creators are generated for each case reducer function
export const {} = usersSlice.actions;

export default usersSlice.reducer;

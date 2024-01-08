// redux stuff
import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [
  { id: "0", name: "Tianna Jenkins" },
  { id: "1", name: "Kevin Grant" },
  { id: "2", name: "Madison Price" },
];

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
});

// Action creators are generated for each case reducer function
export const { postAdded } = usersSlice.actions;

// Selectors
export const selectAllUsers = (store) => store.users;

export default usersSlice.reducer;

// redux stuff
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// other libraries
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

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

// Selectors
export const selectAllUsers = (state) => state.users;

// Find the specific user by its id
export const selectUserById = (state, userId) => state.users.find((user) => user.id === userId);

export default usersSlice.reducer;

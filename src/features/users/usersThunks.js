// redux stuff
import { createAsyncThunk } from "@reduxjs/toolkit";

// other libraries
import axios from "axios";

const USERS_URL = "https://jsonplaceholder.typicode.com/users";

// Get all of the users from an outside source
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await axios.get(USERS_URL);
  return response.data;
});

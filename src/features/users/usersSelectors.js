// users logic & slice
import { usersAdapter } from "./usersSlice";

export const {
  // Select all users
  selectAll: selectAllUsers,

  // Find the specific user by its id
  selectById: selectUserById,

  // Return the users ids array
  selectIds: selectUsersIds,

  // Determine the total number of users we have
  selectTotal: getNumberOfUsers,

  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors((state) => state.users);

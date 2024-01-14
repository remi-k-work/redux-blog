// Select all users
export const selectAllUsers = (state) => state.users;

// Find the specific user by its id
export const selectUserById = (state, userId) => state.users.find((user) => user.id === userId);

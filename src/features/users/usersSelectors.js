// Select all users (either from the store or a slice)
export const selectAllUsers = (state) => (state.users ? state.users : state);

// Find the specific user by its id
export const selectUserById = (state, userId) => (state.users ? state.users.find((user) => user.id === userId) : state.find((user) => user.id === userId));

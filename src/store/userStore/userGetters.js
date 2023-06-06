export default {
  getActiveUser(state) {
    return state.activeUser;
  },
  getUsers(state) {
    return state.users;
  },
  getToken(state) {
    return state.currentToken;
  },
};

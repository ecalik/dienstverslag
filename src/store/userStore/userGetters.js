export default {
  getActiveUser(state) {
    return state.activeUser;
  },
  getUsers(state) {
    return state.users;
  },
  getLoginError(state) {
    return state.loginError;
  },

  getServerTimeout(state) {
    return state.serverTimeout;
  },

  getIsLoading(state) {
    return state.isLoading;
  },
};

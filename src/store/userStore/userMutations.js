export default {
  setActiveUser(state, token) {
    state.activeUser.id = token._id;
    state.activeUser.firstName = token.firstName;
    state.activeUser.lastName = token.lastName;
    state.activeUser.email = token.email;
    state.activeUser.role = token.role;
    state.activeUser.shift = token.shift;
    state.activeUser.isLoggedIn = token.isLoggedIn;
  },

  setUsers(state, payload) {
    state.users = [...payload];
  },

  toggleLoginError(state) {
    state.loginError = !state.loginError;
  },

  toggleServerTimeout(state) {
    state.serverTimeout = !state.serverTimeout;
  },

  toggleIsLoading(state) {
    state.isLoading = !state.isLoading;
  },
};

// id: "123",
//       firstName: "Erhan",
//       lastName: "Calik",
//       email: "ecalik@gmail.com",
//       role: "admin",
//       shift: "dd",
//       isLoggedIn: false,

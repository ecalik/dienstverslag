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
  setToken(state, payload) {
    console.log(payload);
    state.currentToken = payload;
  },
  setUsers(state, payload) {
    state.users = [...payload];
  },
};

// id: "123",
//       firstName: "Erhan",
//       lastName: "Calik",
//       email: "ecalik@gmail.com",
//       role: "admin",
//       shift: "dd",
//       isLoggedIn: false,

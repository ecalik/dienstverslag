import userActions from "./userActions";
import userGetters from "./userGetters";
import userMutations from "./userMutations";

export default {
  namespaced: true,
  state: {
    currentToken: null,
    activeUser: {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      shift: "",
      isLoggedIn: false,
    },
    users: [],
  },
  getters: userGetters,
  mutations: userMutations,
  actions: userActions,
};

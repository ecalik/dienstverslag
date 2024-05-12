import userActions from "./userActions";
import userGetters from "./userGetters";
import userMutations from "./userMutations";

export default {
  namespaced: true,
  state: {
    loginError: false,
    serverTimeout: false,
    isLoading: false,
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

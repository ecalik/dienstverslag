import reportActions from "./reportActions";
import reportGetters from "./reportGetters";
import reportMutations from "./reportMutations";

export default {
  namespaced: true,
  state: {
    reports: [],
  },
  getters: reportGetters,
  mutations: reportMutations,
  actions: reportActions,
};

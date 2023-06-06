import { createStore } from "vuex";

import reportModule from "./reportModule/reportStore";
import userModule from "./userStore/userStore";

export default createStore({
  modules: {
    reportModule,
    userModule,
  },
});

import { reactive } from "vue";
import { io } from "socket.io-client";
import store from "./store/index";

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
});

// "undefined" means the URL will be computed from the `window.location` object
const URL =
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:3000";

export const socket = io(URL, { transports: ["websocket"] });

socket.on("connect", () => {
  state.connected = true;
});

socket.on("disconnect", () => {
  state.connected = false;
});

socket.on("report", (res) => {
  if (res.action === "archiveOc") {
    store.dispatch("reportModule/getReports");
  }
});

socket.on("report", (res) => {
  if (res.action === "postReport") {
    store.dispatch("reportModule/getReports");
  }
});

socket.on("report", (res) => {
  if (res.action === "deleteReport") {
    store.dispatch("reportModule/getReports");
  }
});

socket.on("user", (res) => {
  if (res.action === "updatePw") {
    store.dispatch("userModule/getUsers");
  }
});

socket.on("user", (res) => {
  if (res.action === "signUp") {
    store.dispatch("userModule/getUsers");
  }
});
socket.on("user", (res) => {
  if (res.action === "deleteUser") {
    store.dispatch("userModule/getUsers");
  }
});

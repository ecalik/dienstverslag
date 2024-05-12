import router from "@/router";
import { socket } from "@/socket";

function parseJwt(token) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export default {
  getUsers(context) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/user/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "omit",
    })
      .then((res) => res.json())
      .then((users) => {
        //console.log(reports);
        //console.log(context.rootGetters["userModule/getActiveUser"].token);
        context.commit("setUsers", users);
      })
      .catch((err) => {
        //console.log(context.rootGetters["userModule/getToken"]);
        console.log(err);
      });
  },

  toggleLoginError({ commit }) {
    commit("toggleLoginError");
  },

  toggleServerTimeout({ commit }) {
    commit("toggleServerTimeout");
  },

  toggleIsLoading({ commit }) {
    commit("toggleIsLoading");
  },

  userSignin({ commit, dispatch }, payload) {
    dispatch("toggleIsLoading");
    fetch("http://localhost:3000/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      credentials: "omit",
    })
      .then((res) => {
        if (res.status === 401) {
          dispatch("toggleLoginError");
          dispatch("toggleIsLoading");
          return;
        } else if (res.status === 500) {
          dispatch("toggleServerTimeout");
          dispatch("toggleIsLoading");
          return;
        }
        res.json().then((result) => {
          console.log(result);
          socket.connect();
          const { token } = result;
          const tokenClaims = parseJwt(token);
          //console.log(tokenObject);
          tokenClaims.isLoggedIn = true;
          localStorage.setItem("tokenClaims", JSON.stringify(tokenClaims));
          localStorage.setItem("token", token);
          commit("setActiveUser", tokenClaims);
          dispatch("reportModule/getReports", {}, { root: true });
          dispatch("toggleIsLoading");
          router.replace("/");
          if (tokenClaims.role === "admin") {
            dispatch("getUsers");
          }
        });
      })
      .catch((err) => console.log(err));
  },

  addUser(_, payload) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/user/signup", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
      credentials: "omit",
    })
      .then((res) => {
        console.log(res);
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  updatePw(_, payload) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/user/updatePw/" + payload._id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ password: payload.newPw }),
      credentials: "omit",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },
  deleteUser(_, payload) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/user/deleteUser/" + payload, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      credentials: "omit",
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  autoLogin({ commit, dispatch }) {
    const rawToken = localStorage.getItem("tokenClaims");
    const token = JSON.parse(rawToken);
    //console.log(token);
    if (!token || Date.now() >= token.exp * 1000) {
      // console.log(
      //   "Token expired " + Date.now() + "/br" + token.exp * 1000 + !!token
      // );
      return dispatch("logOut");
    }
    socket.connect();
    token.isLoggedIn = true;
    dispatch("reportModule/getReports", {}, { root: true });
    if (token.role === "admin") {
      dispatch("getUsers");
    }
    commit("setActiveUser", token);
  },
  logOut(context) {
    let user = {
      id: "",
      firstName: "",
      lastName: "",
      email: "",
      role: "",
      shift: "",
      isLoggedIn: false,
    };
    localStorage.removeItem("tokenClaims");
    localStorage.removeItem("token");
    context.commit("setActiveUser", user);
    socket.disconnect();
  },
};

// activeUser: {
//   id: "",
//   firstName: "",
//   lastName: "",
//   email: "",
//   role: "",
//   shift: "",
//   isLoggedIn: false,

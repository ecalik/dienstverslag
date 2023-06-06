//import socket from "../../../socket";

import router from "@/router";

export default {
  submitReport(_, payload) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/report/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then(() => {
        router.replace("/");
      })
      .catch((err) => {
        console.log(err);
      });
  },

  deleteReport(_, payload) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/report/deleteReport/" + payload, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  },

  getReports(context) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/report/post", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((reports) => {
        //console.log(reports);
        //console.log(context.rootGetters["userModule/getActiveUser"].token);
        context.commit("setReports", reports);
      })
      .catch((err) => {
        //console.log(context.rootGetters["userModule/getToken"]);
        console.log(err);
      });
  },
  archiveReport(_, payload) {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/report/post/" + payload.reportId, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({ userId: payload.userId }),
    }).catch((err) => {
      console.log(err);
    });
  },
};

import jwt_decode from "jwt-decode";
import { login } from "@/api/user.js";
import { findById } from "../../api/user";

const userStore = {
  namespaced: true,
  state: {
    isLogin: false,
    isLoginError: false,
    userInfo: null,
  },
  getters: {
    checkUserInfo: function (state) {
      return state.userInfo;
    },
  },
  mutations: {
    SET_IS_LOGIN: (state, isLogin) => {
      console.log("로그인 되었음.");
      state.isLogin = isLogin;
      console.log(state.isLogin);
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_USER_INFO: (state, userInfo) => {
      console.log("정보", userInfo);
      state.isLogin = true;
      state.userInfo = userInfo;
    },
  },
  actions: {
    // actions에는 비동기 처리.
    async userConfirm({ commit }, user) {
      await login(
        user,
        (response) => {
          if (response.data.message === "success") {
            // success로 넘어왔다면
            let token = response.data["access-token"];
            commit("SET_IS_LOGIN", true); // state 값을 바꿈.
            commit("SET_IS_LOGIN_ERROR", false);
            sessionStorage.setItem("access-token", token);
          } else {
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
          }
        },
        () => {}
      );
    },
    getUserInfo({ commit }, token) {
      let decode_token = jwt_decode(token);
      findById(
        decode_token.user_id,
        (response) => {
          console.log("info 들어옴");
          if (response.data.message === "success") {
            console.log(response);
            commit("SET_USER_INFO", response.data.userInfo);
          } else {
            console.log("유저 정보 없음!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default userStore;

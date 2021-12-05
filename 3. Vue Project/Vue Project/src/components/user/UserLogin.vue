<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-col>
        <img src="../../assets/logo.png" alt="" />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-card class="text-center mt-3" style="max-width: 100rem" align="left">
          <b-form class="text-left">
            <b-alert show variant="danger" v-if="isLoginError"
              >아이디 또는 비밀번호를 확인하세요.</b-alert
            >
            <b-form-group label-for="user_id">
              <b-form-input
                id="user_id"
                v-model="user.user_id"
                required
                placeholder="아이디"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-form-group label-for="user_password">
              <b-form-input
                type="password"
                id="user_password"
                v-model="user.user_password"
                required
                placeholder="비밀번호"
                @keyup.enter="confirm"
              ></b-form-input>
            </b-form-group>
            <b-button
              block
              type="button"
              variant="success"
              class="m-1"
              @click="confirm"
              >로그인</b-button
            >
          </b-form>
        </b-card>
        <br />
        <b-link @click="movePage" style="color: grey">회원가입</b-link>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

const userStore = "userStore"; // 네임스페이스 이름을 넣어줌. -> userStore이름으로 사용하기 위해.

export default {
  name: "UserLogin",
  data() {
    return {
      user: {
        user_id: null,
        user_password: null,
      },
    };
  },
  computed: {
    ...mapState(userStore, ["isLogin", "isLoginError"]),
  },
  methods: {
    ...mapActions(userStore, ["userConfirm", "getUserInfo"]),
    async confirm() {
      await this.userConfirm(this.user);
      let token = sessionStorage.getItem("access-token");
      console.log(token);
      if (this.isLogin) {
        console.log("isLogin들어옴", this.isLogin);
        await this.getUserInfo(token);
        this.$router.push({ name: "Home" });
      }
    },
    movePage() {
      this.$router.push({ name: "SignUp" });
    },
  },
};
</script>

<style></style>

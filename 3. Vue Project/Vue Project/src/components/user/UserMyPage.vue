<template>
  <b-container class="mt-4" v-if="userInfo">
    <b-row>
      <b-col></b-col>
      <b-col cols="8">
        <b-jumbotron>
          <template #header>My Page</template>

          <template #lead> 내 정보 확인페이지입니다. </template>

          <hr class="my-4" />

          <b-container class="mt-4">
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">아이디</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.user_id }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이름</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.user_name
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">주소</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.user_address
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">이메일</b-col
              ><b-col cols="4" align-self="start">{{ userInfo.email }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
            <b-row>
              <b-col cols="2"></b-col>
              <b-col cols="2" align-self="end">가입일</b-col
              ><b-col cols="4" align-self="start">{{
                userInfo.joindate
              }}</b-col>
              <b-col cols="2"></b-col>
            </b-row>
          </b-container>
          <hr class="my-4" />

          <b-button variant="outline-primary" @click="updateUser" class="mr-1"
            >정보수정</b-button
          >
          <b-button variant="outline-danger" @click="removeUser"
            >회원탈퇴</b-button
          >
        </b-jumbotron>
      </b-col>
      <b-col></b-col>
    </b-row>
  </b-container>
</template>

<script>
import { deleteUser } from "@/api/user";
import { mapState, mapMutations } from "vuex";

const userStore = "userStore";

export default {
  name: "UserMyPage",
  components: {},
  data() {
    return {
      user_id: "",
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo", "isLogin"]),
  },
  created() {
    this.user_id = this.userInfo.user_id;
  },
  methods: {
    ...mapMutations(userStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    removeUser() {
      console.log(this.user_id);

      if (confirm("정말로 회원 탈퇴를 하시겠습니까?")) {
        console.log("삭제 확인중");
        deleteUser(this.user_id, () => {
          console.log("찐? 삭제 ㄱ?");
          this.SET_IS_LOGIN(false);
          this.SET_USER_INFO(null);
          sessionStorage.removeItem("access-token");
          if (this.$route.path != "/") this.$router.push({ name: "Home" });
        });
      }
    },

    updateUser() {
      console.log(this.user_id);
      this.$router.push({ name: "UserUpdate" });
    },
  },
};
</script>

<style></style>

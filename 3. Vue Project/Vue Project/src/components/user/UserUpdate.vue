<template>
  <b-container class="bv-example-row mt-3">
    <div class="container text-center mt-3">
      <div class="col-lg-8 mx-auto">
        <b-carousel
          id="carousel-1"
          :interval="4000"
          fade
          indicators
          background="#ababab"
          img-width="1024"
          img-height="240"
          style="text-shadow: 1px 1px 2px #333"
        >
          <!-- Slide with blank fluid image to maintain slide aspect ratio -->
          <b-carousel-slide
            caption=" 회원정보 수정"
            img-blank
            img-alt="Blank image"
          >
          </b-carousel-slide>
        </b-carousel>
        <br />
        <div class="form-group">
          <label for="user_id">아이디</label>
          <input
            type="text"
            id="user_id"
            v-model="user_id"
            name="user_id"
            class="form-control bd-control"
            placeholder="아이디"
            ref="user_id"
            disabled
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="user_name">이름</label>
          <input
            type="text"
            id="user_name"
            v-model="user_name"
            name="user_name"
            class="form-control bd-control"
            placeholder="이름"
            ref="user_name"
            disabled
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="user_password">비밀번호</label>
          <input
            type="password"
            id="user_password"
            v-model="user_password"
            name="user_password"
            class="form-control bd-control2"
            ref="user_password"
            placeholder="비밀번호"
            required
          />
        </div>
        <div class="form-group">
          <label for="user_address">주소</label>
          <input
            type="text"
            id="user_address"
            name="user_address"
            v-model="user_address"
            class="form-control col"
            placeholder="주소"
            ref="user_address"
            required
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="user_phone">전화번호</label>
          <input
            type="tel"
            id="user_phone"
            v-model="user_phone"
            name="user_phone"
            class="form-control col"
            placeholder="전화번호(010-xxx-xxxx)"
            ref="user_phone"
            required
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="emailid">이메일</label><br />
          <div id="email" class="custom-control-inline">
            <input
              type="text"
              class="form-control"
              id="emailid"
              v-model="emailid"
              name="emailid"
              placeholder="이메일아이디입력..."
              size="25"
              ref="emailid"
            />
            @
            <select
              class="form-control"
              id="emaildomain"
              @change="SelectKey"
              v-model="emaildomain"
              name="emaildomain"
              ref="emaildomain"
            >
              <option value="ssafy.com">싸피</option>
              <option value="naver.com">네이버</option>
              <option value="kakao.com">카카오</option>
              <option value="google.com">구글</option>
            </select>
          </div>
        </div>
        <div class="form-group text-center">
          <button
            @click="updateUser"
            type="button"
            id="registerBtn"
            class="btn btn-outline-primary"
          >
            변경
          </button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { updateUser } from "@/api/user";
import { mapState, mapActions } from "vuex";
const userStore = "userStore";

//import axios from "axios";
export default {
  name: "UserJoin",
  data() {
    return {
      user_id: "",
      user_name: "",
      user_password: "",
      user_address: "",
      user_phone: "",
      emailid: "",
      emaildomain: "",
      email: "",
    };
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    this.user_id = this.userInfo.user_id;
    this.user_name = this.userInfo.user_name;
    this.user_password = this.userInfo.user_password;
    this.user_address = this.userInfo.user_address;
    this.emailid = this.userInfo.emailid;
    this.user_phone = this.userInfo.user_phone;
    this.emaildomain = this.userInfo.emaildomain;
    console.log(this.userInfo);
  },
  methods: {
    ...mapActions(userStore, ["getUserInfo"]),
    SelectKey() {
      console.log(this.emaildomain);
    },
    updateUser() {
      this.email = this.emailid + "@" + this.emaildomain;
      console.log(this.userInfo);
      updateUser(
        {
          user_id: this.userInfo.user_id,
          user_name: this.user_name,
          user_password: this.user_password,
          user_address: this.user_address,
          user_phone: this.user_phone,
          email: this.email,
        },
        ({ data }) => {
          let message = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            message = "수정이 완료되었습니다.";
          }
          let token = sessionStorage.getItem("access-token");
          this.getUserInfo(token);
          alert(message);
          this.$router.push({ name: "MyPage" }); // 등록하고 로그인 페이지로 이동.
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};
</script>
<style></style>

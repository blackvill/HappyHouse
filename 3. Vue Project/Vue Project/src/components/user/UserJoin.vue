<template>
  <b-container class="bv-example-row mt-3">
    <div class="container text-left mt-3">
      <div class="col-lg-8 mx-auto">
        <img src="../../assets/logo.png" alt="" />

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
            required
            autofocus
          />
        </div>
        <div class="form-group">
          <label for="user_id">아이디</label>
          <input
            type="text"
            id="user_id"
            v-model="user_id"
            name="user_id"
            class="form-control bd-control2"
            placeholder="아이디"
            ref="user_id"
            required
            autofocus
          />
          <div id="idresult" class="mt-1"></div>
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
          <label for="user_password2">비밀번호재입력</label>
          <input
            type="password"
            id="user_password2"
            v-model="user_password2"
            name="user_password2"
            class="form-control bd-control3"
            ref="user_password2"
            placeholder="비밀번호 확인"
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
          <label for="user_contact">전화번호</label>
          <input
            type="tel"
            id="user_contact"
            v-model="user_contact"
            name="user_contact"
            class="form-control col"
            placeholder="전화번호(010-xxx-xxxx)"
            ref="user_contact"
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
          <b-button
            @click="registUser"
            type="button"
            id="registerBtn"
            class="btn btn-primary"
            block
          >
            회원가입
          </b-button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { registUser } from "@/api/user";
//import axios from "axios";
export default {
  name: "UserJoin",
  data() {
    return {
      user_id: "",
      user_name: "",
      user_password: "",
      user_password2: "",
      user_address: "",
      user_contact: "",
      emailid: "",
      emaildomain: "",
      email: "",
    };
  },
  methods: {
    SelectKey() {
      console.log(this.emaildomain);
    },
    registUser() {
      let error = true;
      let msg = "";

      !this.user_name &&
        ((msg = "이름을 입력해 주세요"),
        (error = false),
        this.$refs.user_name.focus());
      error &&
        !this.user_id &&
        ((msg = "id를 입력해 주세요"),
        (error = false),
        this.$refs.user_id.focus());
      error &&
        !this.user_password &&
        ((msg = "비밀번호를 입력해 주세요"),
        (error = false),
        this.$refs.user_password.focus());
      error &&
        this.user_password != this.user_password2 &&
        ((msg = "비밀번호 다시 확인해 주세요"),
        (error = false),
        this.$refs.user_password2.focus());
      error &&
        !this.user_address &&
        ((msg = "주소를 입력해 주세요"),
        (error = false),
        this.$refs.user_address.focus());
      error &&
        !this.user_contact &&
        ((msg = "전화번호를 입력해 주세요"),
        (error = false),
        this.$refs.user_contact.focus());

      this.email = this.emailid + "@" + this.emaildomain;
      console.log(this.email);

      if (!error) {
        alert(msg);
      } else {
        registUser(
          //localStorage에 저장
          // axios
          //   .post("http://localhost:9002/join", {
          //     user_id: this.user_id,
          //     user_name: this.user_name,
          //     user_password: this.user_password,
          //     user_address: this.user_address,
          //     user_contact: this.user_contact,
          //     email: this.email,
          //   })
          //   .then((response) => {
          //     if (response.data == "success") {
          //       alert("등록 성공!!!");
          //       this.$router.push({ name: "SignIn" }); // 등록하고 리스트(목록)페이지로
          //     } else {
          //       alert("등록 실패!!!");
          //     }
          //   })
          //   .catch((error) => {
          //     alert(error);
          //   })
          {
            user_id: this.user_id,
            user_name: this.user_name,
            user_password: this.user_password,
            user_address: this.user_address,
            user_contact: this.user_contact,
            email: this.email,
          },
          ({ data }) => {
            let message = "등록 처리시 문제가 발생했습니다.";
            if (data === "success") {
              message = "등록이 완료되었습니다.";
            }
            alert(message);
            this.$router.push({ name: "SignIn" }); // 등록하고 로그인 페이지로 이동.
          },
          (error) => {
            console.log(error);
          }
        );
      }
    },
  },
};
</script>
<style></style>

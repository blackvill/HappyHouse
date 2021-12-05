<template>
  <b-container class="bv-example-row mt-3">
    <div class="container text-center mt-3">
      <div class="col-lg-8 mx-auto">
        <h2 class="p-3 mb-3 shadow bg-light">
          <mark class="orange">회원 정보 수정</mark>
        </h2>

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
          <button
            @click="updateMember"
            type="button"
            id="registerBtn"
            class="btn btn-outline-primary"
          >
            변경
          </button>
          <button type="reset" class="btn btn-outline-danger">초기화</button>
        </div>
      </div>
    </div>
  </b-container>
</template>

<script>
import { updateUser } from "@/api/member";
import { mapState, mapActions } from "vuex";
const memberStore = "memberStore";

//import axios from "axios";
export default {
  name: "MemberJoin",
  data() {
    return {
      user_id: "",
      user_name: "",
      user_password: "",
      user_address: "",
      user_contact: "",
      emailid: "",
      emaildomain: "",
      email: "",
    };
  },
  computed: {
    ...mapState(memberStore, ["userInfo"]),
  },
  methods: {
    ...mapActions(memberStore, ["getUserInfo"]),
    SelectKey() {
      console.log(this.emaildomain);
    },
    updateMember() {
      let error = true;
      let msg = "";

      !this.user_name &&
        ((msg = "이름을 입력해 주세요"),
        (error = false),
        this.$refs.user_name.focus());
      error &&
        !this.user_password &&
        ((msg = "비밀번호를 입력해 주세요"),
        (error = false),
        this.$refs.user_password.focus());
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

      console.log(this.userInfo.user_id);

      if (!error) {
        alert(msg);
      } else {
        console.log(this.userInfo.user_id);
        updateUser(
          {
            user_id: this.userInfo.user_id,
            user_name: this.user_name,
            user_password: this.user_password,
            user_address: this.user_address,
            user_contact: this.user_contact,
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
      }
    },
  },
};
</script>
<style></style>

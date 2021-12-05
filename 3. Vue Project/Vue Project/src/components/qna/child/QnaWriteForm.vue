<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group
          id="user-group"
          label="작성자:"
          label-for="user"
          description=""
        >
          <b-form-input
            id="user"
            :disabled="true"
            v-model="user"
            type="text"
            required
            placeholder="작성자 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="title-group"
          label="제목:"
          label-for="title"
          description="제목을 입력하세요."
        >
          <b-form-input
            id="title"
            v-model="qna.title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용:" label-for="content">
          <b-form-textarea
            id="content"
            v-model="qna.content"
            placeholder="내용 입력..."
            rows="10"
            max-rows="15"
          ></b-form-textarea>
        </b-form-group>

        <b-button
          type="submit"
          variant="outline-primary"
          class="m-1"
          v-if="this.type === 'register'"
          >Qna 작성</b-button
        >
        <b-button type="submit" variant="outline-primary" class="m-1" v-else
          >Qna 수정</b-button
        >
        <b-button type="reset" variant="outline-danger" class="m-1"
          >초기화</b-button
        >
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writeQna, getQna, modifyQna } from "@/api/qna";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "QnaWriteForm",
  data() {
    return {
      qna: {
        no: 0,
        user: "",
        title: "",
        content: "",
      },
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    this.user = this.userInfo.user_id;
    if (this.type === "modify") {
      getQna(
        this.$route.params.no,
        ({ data }) => {
          // this.article.articleno = data.article.articleno;
          // this.article.userid = data.article.userid;
          // this.article.subject = data.article.subject;
          // this.article.content = data.article.content;
          this.qna = data;
          this.qna.content = data.content.split("<br>").join("\n");
        },
        (error) => {
          console.log(error);
        }
      );
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.qna.title &&
        ((msg = "제목 입력해주세요"), (err = false), this.$refs.title.focus());
      err &&
        !this.qna.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registQna() : this.updateQna();
    },
    onReset(event) {
      event.preventDefault();
      this.qna.no = 0;
      this.qna.title = "";
      this.qna.content = "";
      this.$router.push({ name: "QnaList" });
    },
    registQna() {
      writeQna(
        {
          user: this.user,
          title: this.qna.title,
          content: this.qna.content.split("\n").join("<br>"),
        },
        ({ data }) => {
          let msg = "등록 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "등록이 완료되었습니다.";
          }
          alert(msg);
          this.moveList();
        },
        (error) => {
          console.log(error);
        }
      );
    },
    updateQna() {
      modifyQna(
        {
          no: this.qna.no,
          user: this.qna.user,
          title: this.qna.title,
          content: this.qna.content.split("\n").join("<br>"),
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "QnaList" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "QnaList" });
    },
  },
};
</script>

<style></style>

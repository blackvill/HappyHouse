<template>
  <b-row class="mb-1">
    <b-col>
      <b-jumbotron header="" lead="">
        <p class="text-left">작성자 : {{ qna.user }}</p>
        <br />

        <p class="text-left">{{ qna.title }}</p>
        <hr class="my-4" />
        <p>{{ qna.content }}</p>
      </b-jumbotron>
    </b-col>
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="content-group" label="내용" label-for="content">
          <b-form-textarea
            id="content"
            v-model="qnareply.content"
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
          >Qna 답변 작성</b-button
        >
        <b-button type="submit" variant="outline-primary" class="m-1" v-else
          >Qna 답변 수정</b-button
        >
        <b-button type="reset" variant="outline-danger" class="m-1"
          >초기화</b-button
        >
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writeQnaReply, getQna } from "@/api/qna";

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
      qnareply: {
        no: 0,
        user: "admin",
        title: "",
        content: "",
      },
      isUser: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    getQna(
      this.$route.params.no,
      ({ data }) => {
        this.qna = data;
        console.log(this.qna);
      },
      (error) => {
        console.log(error);
      }
    );
    this.qnareply.no = this.qna.no;
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";
      !this.qna.content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registQna() : this.updateQna();
    },
    onReset(event) {
      event.preventDefault();
      this.qnareply.content = "";
      this.$router.push({ name: "QnaList" });
    },
    registQna() {
      writeQnaReply(
        {
          writer: this.qnareply.user,
          no: this.qna.no,
          content: this.qnareply.content,
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
    moveList() {
      this.$router.push({ name: "QnaList" });
    },
  },
};
</script>

<style></style>

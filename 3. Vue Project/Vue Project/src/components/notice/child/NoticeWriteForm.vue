<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="subject-group" label="제목" label-for="notice_title">
          <b-form-input
            id="notice_title"
            v-model="notice.notice_title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group
          id="content-group"
          label="내용"
          label-for="notice_content"
        >
          <b-form-textarea
            id="notice_content"
            v-model="notice.notice_content"
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
          >글작성</b-button
        >
        <b-button type="submit" variant="outline-primary" class="m-1" v-else
          >글수정</b-button
        >
        <b-button type="reset" variant="outline-danger" class="m-1"
          >초기화</b-button
        >
      </b-form>
    </b-col>
  </b-row>
</template>

<script>
import { writeNotice, getNotice, modifyNotice } from "@/api/notice";

export default {
  name: "NoticeWriteForm",
  data() {
    return {
      notice: {
        notice_no: 0,
        notice_title: "",
        notice_content: "",
      },
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  created() {
    if (this.type === "modify") {
      getNotice(
        this.$route.params.notice_no,
        ({ data }) => {
          this.notice = data;
          this.notice.notice_content = data.notice_content
            .split("<br>")
            .join("\n");
        },
        (error) => {
          console.log(error);
        }
      );
      this.isUserid = true;
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();

      let err = true;
      let msg = "";

      !this.notice.notice_title &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.notice_title.focus());
      err &&
        !this.notice.notice_content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.notice_content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registNotice() : this.updateNotice();
    },
    onReset(event) {
      event.preventDefault();
      this.notice.notice_no = 0;
      this.notice.notice_title = "";
      this.notice.notice_content = "";
      this.$router.push({ name: "NoticeList" });
    },
    registNotice() {
      writeNotice(
        {
          notice_title: this.notice.notice_title,
          notice_content: this.notice.notice_content.split("\n").join("<br>"),
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
    updateNotice() {
      modifyNotice(
        {
          notice_no: this.notice.notice_no,
          notice_title: this.notice.notice_title,
          notice_content: this.notice.notice_content.split("\n").join("<br>"),
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "NoticeList" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "NoticeList" });
    },
  },
};
</script>

<style></style>

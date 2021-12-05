<template>
  <b-row class="mb-1">
    <b-col style="text-align: left">
      <b-form @submit="onSubmit" @reset="onReset">
        <b-form-group id="userid-group" label="작성자" label-for="userid">
          <b-form-input
            id="user_id"
            :disabled="isUserid"
            v-model="user_id"
            type="text"
            required
            placeholder="작성자 입력..."
            readonly
          ></b-form-input>
        </b-form-group>

        <b-form-group id="subject-group" label="제목" label-for="board_title">
          <b-form-input
            id="board_title"
            v-model="board.board_title"
            type="text"
            required
            placeholder="제목 입력..."
          ></b-form-input>
        </b-form-group>

        <b-form-group id="content-group" label="내용" label-for="board_content">
          <b-form-textarea
            id="board_content"
            v-model="board.board_content"
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
import { writeBoard, getBoard, modifyBoard } from "@/api/board";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
  name: "BoardWriteForm",
  data() {
    return {
      board: {
        board_no: 0,
        user_id: "",
        board_title: "",
        board_content: "",
      },
      isUserid: false,
    };
  },
  props: {
    type: { type: String },
  },
  computed: {
    ...mapState(userStore, ["userInfo"]),
  },
  created() {
    this.user_id = this.userInfo.user_id;

    if (this.type === "modify") {
      getBoard(
        this.$route.params.board_no,
        ({ data }) => {
          this.board = data;
          this.board.board_content = data.board_content
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

      !this.board.board_title &&
        ((msg = "제목 입력해주세요"),
        (err = false),
        this.$refs.board_title.focus());
      err &&
        !this.board.board_content &&
        ((msg = "내용 입력해주세요"),
        (err = false),
        this.$refs.board_content.focus());

      if (!err) alert(msg);
      else this.type === "register" ? this.registBoard() : this.updateBoard();
    },
    onReset(event) {
      event.preventDefault();
      this.board.board_no = 0;
      this.board.board_title = "";
      this.board.board_content = "";
      this.$router.push({ name: "BoardList" });
    },
    registBoard() {
      writeBoard(
        {
          user_id: this.user_id,
          board_title: this.board.board_title,
          board_content: this.board.board_content.split("\n").join("<br>"),
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
    updateBoard() {
      modifyBoard(
        {
          board_no: this.board.board_no,
          user_id: this.board.user_id,
          board_title: this.board.board_title,
          board_content: this.board.board_content.split("\n").join("<br>"),
        },
        ({ data }) => {
          let msg = "수정 처리시 문제가 발생했습니다.";
          if (data === "success") {
            msg = "수정이 완료되었습니다.";
          }
          alert(msg);
          // 현재 route를 /list로 변경.
          this.$router.push({ name: "BoardList" });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    moveList() {
      this.$router.push({ name: "BoardList" });
    },
  },
};
</script>

<style></style>

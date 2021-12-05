<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-secondary" @click="moveWrite()"
          >글쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="boards.length">
        <b-table
          :items="boards"
          :fields="fields"
          striped
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template #cell(show_details)="row">
            <b-button
              size="sm"
              @click="[toggleDetails(row), listReplys(row.item.board_no)]"
              class="mr-2"
            >
              내용 {{ row.detailsShowing ? "닫기" : "보기" }}
            </b-button>

            <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          </template>

          <template #row-details="row">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>작성자 :</b></b-col>
                <b-col class="text-sm-left">{{ row.item.user_id }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>내용 :</b></b-col>
                <b-col
                  class="text-sm-left"
                  v-html="row.item.board_content"
                ></b-col>
              </b-row>
              <b-col
                class="text-center"
                v-if="user_id == 'admin' || user_id == row.item.user_id"
              >
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="moveModifyBoard(row.item.board_no)"
                  >수정</b-button
                >

                <!-- <input type="text" v-model="num" value="{{row.item.no }}" /> -->
                <b-button
                  variant="outline-danger"
                  size="sm"
                  @click="removeBoard(row.item.board_no)"
                  >삭제</b-button
                >
              </b-col>
              <hr class="my-4" />

              <b-table
                striped
                hover
                :items="replys"
                :fields="replyfields"
              ></b-table>
              <b-table-simple hover responsive>
                <b-tr>
                  <td>작성자</td>
                  <td>
                    <input
                      type="text"
                      class="form-control"
                      id="user_id"
                      name="user_id"
                      v-model="user_id"
                      ref="user_id"
                    />
                  </td>
                </b-tr>
                <b-tr>
                  <td>내용</td>
                  <td>
                    <textarea
                      id="content"
                      class="form-control"
                      name="comment"
                      cols="35"
                      rows="5"
                      v-model="comment"
                      ref="comment"
                    ></textarea>
                  </td>
                </b-tr>
                <b-button
                  class="btn btn-primary center"
                  @click="writeReply(row.item.board_no)"
                  >등록</b-button
                ></b-table-simple
              >
            </b-card>
          </template>
        </b-table>
      </b-col>
      <!-- <b-col v-else class="text-center">도서 목록이 없습니다.</b-col> -->
    </b-row>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      aria-controls="my-table"
      align="center"
    ></b-pagination>
  </b-container>
</template>

<script>
import { mapState } from "vuex";
import { listBoard, deleteBoard } from "@/api/board.js";
import { listReply } from "@/api/reply";
import http from "@/util/http-common.js";

const userStore = "userStore";
export default {
  name: "BoardList",
  components: {
    //BoardListRow,
  },
  data() {
    return {
      replyfields: [
        { key: "comment", label: "내용" },
        { key: "user_id", label: "작성자" },
      ],
      fields: [
        { key: "board_title", label: "제목" },
        { key: "user_id", label: "작성자" },
        { key: "show_details", label: "자세히" },
      ],
      boards: [],
      word: "",
      perPage: 5,
      currentPage: 1,
      replys: [],
      user_id: "",
      comment: "",
    };
  },
  created() {
    if (this.userInfo != null) {
      this.user_id = this.userInfo.user_id;
    }
    listBoard(
      (response) => {
        this.boards = response.data;
        console.log(this.boards);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    listReplys(no) {
      listReply(no, (response) => {
        this.replys = response.data;
        console.log(this.replys);
      });
    },
    writeReply(no) {
      let error = true;
      let msg = "";
      !this.user_id &&
        ((msg = "답변 작성자를 입력해 주세요"),
        (error = false),
        this.$refs.user_id.focus());
      error &&
        !this.comment &&
        ((msg = "질문 내용을 입력해 주세요"),
        (error = false),
        this.$refs.comment.focus());

      if (!error) {
        alert(msg);
      } else {
        //localStorage에 저장
        http
          .post("reply/", {
            user_id: this.user_id,
            comment: this.comment.split("\n").join("<br>"),
            board_no: no,
          })
          .then((response) => {
            if (response.data == "success") {
              alert("등록 성공!!!");
              this.$router.go(this.$router.currentRoute);
            } else {
              alert("등록 실패!!!");
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    },
    moveModifyBoard(no) {
      this.$router.replace({
        name: "BoardUpdate",
        params: { board_no: no },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    toggleDetails(row) {
      if (this.userInfo == null) {
        alert("로그인하세요");
        this.$router.push({ name: "SignIn" });
      } else {
        this.user_id = this.userInfo.user_id;
      }
      if (row.detailsShowing) {
        row.toggleDetails();
      } else {
        this.boards.forEach((item) => {
          this.$set(item, "_showDetails", false);
        });
        this.$nextTick(() => {
          row.toggleDetails();
          this.reply = [];
          this.answer = "";
        });
      }
    },
    removeBoard(no) {
      console.log(no);
      if (confirm("삭제하시겠습니까?")) {
        deleteBoard(no, () => {
          this.$router.go(this.$router.currentRoute);
        });
      }
    },
    moveWrite() {
      this.$router.push({ name: "BoardWrite" });
    },
  },
  computed: {
    rows() {
      return this.boards.length;
    },
    ...mapState(userStore, ["userInfo"]),
  },
};
</script>

<style scope>
.tdClass {
  width: 50px;
  text-align: center;
}
.tdSubject {
  width: 300px;
  text-align: left;
}
</style>

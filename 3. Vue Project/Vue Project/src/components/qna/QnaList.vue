<template>
  <b-container class="bv-example-row mt-3">
    <b-row class="mb-1">
      <b-col class="text-right">
        <b-button variant="outline-secondary" @click="moveWrite()"
          >Qna 쓰기</b-button
        >
      </b-col>
    </b-row>
    <b-row>
      <b-col v-if="qnas.length">
        <b-table
          :items="qnas"
          :fields="fields"
          striped
          responsive="sm"
          :per-page="perPage"
          :current-page="currentPage"
        >
          <template #cell(show_details)="row">
            <b-button size="sm" @click="toggleDetails(row)" class="mr-2">
              내용 {{ row.detailsShowing ? "닫기" : "보기" }}
            </b-button>

            <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
          </template>

          <template #row-details="row">
            <b-card>
              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>작성자 :</b></b-col>
                <b-col class="text-sm-left">{{ row.item.user }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>내용 :</b></b-col>
                <b-col class="text-sm-left" v-html="row.item.content"></b-col>
              </b-row>
              <b-col class="text-center" v-if="userInfo.user_id != 'admin'">
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="moveModifyQna(row.item.no)"
                  >수정</b-button
                >

                <!-- <input type="text" v-model="num" value="{{row.item.no }}" /> -->
                <b-button
                  variant="outline-danger"
                  size="sm"
                  @click="removeQna(row.item.no)"
                  >삭제</b-button
                >
                <hr class="my-4" />
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="getqnarepliy(row.item.no)"
                  >답변 확인</b-button
                >
              </b-col>

              <b-col class="text-center" v-else>
                <b-button
                  variant="outline-info"
                  size="sm"
                  @click="moveReplyWrite(row.item.no)"
                  >답하기</b-button
                >
              </b-col>
              <b-col v-if="reply.length">
                <b-table
                  striped
                  hover
                  :items="reply"
                  :fields="replyfields"
                ></b-table>
              </b-col>
              <b-col v-else> {{ answer }} </b-col>
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
import { listQnaReply, listQna, deleteQna } from "@/api/qna.js";

const userStore = "userStore";
export default {
  name: "QnaList",
  components: {
    //QnaListRow,
  },
  data() {
    return {
      replyfields: [
        { key: "writer", label: "작성자" },
        { key: "content", label: "내용" },
      ],
      fields: [
        { key: "title", label: "제목" },
        { key: "user", label: "작성자" },
        { key: "show_details", label: "자세히" },
      ],
      qnas: [],
      searchQnas: [],
      perPage: 5,
      currentPage: 1,
      reply: [],
      answer: "",
    };
  },
  created() {
    // let param = {
    //   start: this.currentPage,
    //   spp: this.perPage,
    //   key: null,
    //   word: null,
    // };
    listQna(
      // param,
      (response) => {
        this.qnas = response.data;
        if (this.userInfo.user_id != "admin") {
          this.qnas.forEach((element) => {
            if (element.user == this.userInfo.user_id) {
              this.searchQnas.push(element);
            }
          });
          this.qnas = this.searchQnas;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    toggleDetails(row) {
      if (row.detailsShowing) {
        row.toggleDetails();
      } else {
        this.qnas.forEach((item) => {
          this.$set(item, "_showDetails", false);
        });
        this.$nextTick(() => {
          row.toggleDetails();
          this.reply = [];
          this.answer = "";
        });
      }
    },
    moveWrite() {
      this.$router.push({ name: "QnaWrite" });
    },
    moveReplyWrite(no) {
      this.$router.push({ name: "QnaReplyWrite", params: { no: no } });
    },
    removeQna(no) {
      if (confirm("삭제하시겠습니까?")) {
        deleteQna(no, () => {
          this.$router.go(this.$router.currentRoute);
        });
      }
    },
    moveModifyQna(no) {
      this.$router.replace({
        name: "QnaUpdate",
        params: { no: no },
      });
      //   this.$router.push({ path: `/board/modify/${this.article.articleno}` });
    },
    getqnarepliy(no) {
      console.log(no);
      listQnaReply(
        no,
        (response) => {
          this.reply = response.data;
          console.log(this.reply);
        },
        (error) => {
          console.log("삭제시 에러발생!!", error);
        }
      );
      if (this.reply.length == 0) {
        this.answer = "답변이 등록되지 않았습니다.";
        console.log(this.answer);
      }
    },
  },
  computed: {
    rows() {
      return this.qnas.length;
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

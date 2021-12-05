<template>
  <b-container class="bv-example-row mt-3">
    <b-row>
      <b-carousel
        id="carousel-1"
        :interval="4000"
        fade
        indicators
        background="#ababab"
        img-width="1200"
        img-height="240"
        style="text-shadow: 1px 1px 2px #333"
      >
        <!-- Slide with blank fluid image to maintain slide aspect ratio -->
        <b-carousel-slide caption=" 유저목록" img-blank img-alt="Blank image">
        </b-carousel-slide>
      </b-carousel>
    </b-row>
    <b-row>
      <b-col v-if="user.length">
        <b-table
          :items="user"
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
                <b-col class="text-sm-left">{{ row.item.user_id }}</b-col>
              </b-row>

              <b-row class="mb-2">
                <b-col sm="2" class="text-sm-right"><b>내용 :</b></b-col>
                <b-col class="text-sm-left" v-html="row.item.user_name"></b-col>
              </b-row>
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
import { userList } from "@/api/user";
// import { mapState, mapMutations } from "vuex";

// const memberStore = "memberStore";

export default {
  name: "UserList",
  components: {},
  data() {
    return {
      user: [],
      fields: [
        { key: "user_id", label: "아이디" },
        { key: "user_name", label: "유저 이름" },
        { key: "user_address", label: "주소" },
        { key: "user_phone", label: "연락처" },
        { key: "email", label: "e-mail" },
        { key: "joindate", label: "가입일" },
      ],
      perPage: 5,
      currentPage: 1,
    };
  },
  computed: {
    // ...mapState(memberStore, ["member"]),
    rows() {
      return this.user.length;
    },
  },
  created() {
    // this.user = userList();
    // console.log(this.user);
    // console.log(userList());

    userList(
      // param,
      (response) => {
        this.user = response.data;
        console.log(this.user);
      },
      (error) => {
        console.log(error);
      }
    );
  },
  methods: {
    // ...mapMutations(memberStore, ["SET_USER_INFO"]),
  },
};
</script>

<style></style>

<template>
  <div>
    <b-row align-v="center">
      <b-col
        ><router-link :to="{ name: 'Map' }" class="link"
          ><b-card
            overlay
            img-src="https://picsum.photos/900/600/?image=3"
            img-alt="Card Image"
            text-variant="white"
            title="다양한 아파트 및 매매 정보를 검색해보세요"
          >
          </b-card></router-link
      ></b-col>
      <b-col cols="6">
        <b-carousel
          id="carousel-1"
          :interval="4000"
          fade
          indicators
          background="#ababab"
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333"
        >
          <!-- Text slides with image -->
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=52">
            <h4>쉽고 편리한</h4>
            <h4>Happy House 검색 시스템</h4>
            <h6>간편한 검색으로 정보를 얻을 수 있습니다.</h6>
          </b-carousel-slide>

          <!-- Slides with custom text
          <b-carousel-slide img-src="https://picsum.photos/1024/480/?image=54">
            <h1></h1>
          </b-carousel-slide> -->
        </b-carousel>
      </b-col>
      <b-col
        ><div class="notice-div">
          <h2>공지사항</h2>
          <router-link :to="{ name: 'Notice' }" class="link">
            <b-table
              :items="notices"
              :fields="fields"
              caption-top
              :per-page="perPage"
              :current-page="currentPage"
            ></b-table
          ></router-link></div
      ></b-col>
    </b-row>
  </div>
</template>

<script>
import { listNotice } from "@/api/notice.js";
export default {
  name: "Main",
  props: {
    msg: String,
  },
  data() {
    return {
      notices: [],
      perPage: 5,
      currentPage: 1,
      fields: [
        { key: "notice_no", label: "No" },
        { key: "notice_title", label: "제목" },
      ],
    };
  },
  created() {
    listNotice(
      (response) => {
        this.notices = response.data;
      },
      (error) => {
        console.log(error);
      }
    );
  },
};
</script>

<style scoped>
.underline-steelblue {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(72, 190, 233, 0.3) 30%
  );
}
.notice-div {
  padding: 20px;
}
</style>

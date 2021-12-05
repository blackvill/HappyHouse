<template>
  <div>
    <b-navbar toggleable="lg" type="light" variant="light">
      <b-navbar-brand href="#">
        <router-link to="/">
          <img
            src="@/assets/logo.png"
            class="d-inline-block align-middle"
            width="120px"
            alt="Kitten"
          />
        </router-link>
      </b-navbar-brand>
    </b-navbar>
    <b-navbar class="nav" toggleable="lg" type="dark" variant="dark">
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#"
            ><router-link :to="{ name: 'Map' }" class="link"
              ><i class="fa fa-map" aria-hidden="true"></i> 매물</router-link
            ></b-nav-item
          >
          <!-- <b-nav-item href="#"
            ><router-link :to="{ name: 'Map2' }" class="link"
              ><b-icon icon="house-fill" font-scale="1"></b-icon> 아파트
              검색</router-link
            ></b-nav-item
          > -->
          <b-nav-item href="#"
            ><router-link :to="{ name: 'House' }" class="link"
              ><i class="fa fa-map-marker" aria-hidden="true"></i> 지역
              검색</router-link
            ></b-nav-item
          >

          <b-nav-item href="#"
            ><router-link :to="{ name: 'Notice' }" class="link"
              ><i class="fa fa-bell" aria-hidden="true"></i> 공지
              사항</router-link
            ></b-nav-item
          >

          <b-nav-item href="#"
            ><router-link :to="{ name: 'Board' }" class="link"
              ><i class="fa fa-comments" aria-hidden="true"></i>
              게시판</router-link
            ></b-nav-item
          >
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto" v-if="userInfo">
          <b-nav-item class="align-self-center"
            >{{ userInfo.user_name }}({{ userInfo.user_id }})님
            환영합니다.</b-nav-item
          >
          <b-nav-item
            class="align-self-center"
            v-if="userInfo.user_id != 'admin'"
            ><router-link
              :to="{ name: 'MyPage' }"
              class="link align-self-center"
              >MyPage</router-link
            ></b-nav-item
          >
          <b-nav-item
            class="align-self-center"
            v-if="userInfo.user_id == 'admin'"
            ><router-link
              :to="{ name: 'UserList' }"
              class="link align-self-center"
              >UserList</router-link
            ></b-nav-item
          >
          <b-nav-item class="align-self-center"
            ><router-link :to="{ name: 'Qna' }" class="link align-self-center">
              QNA</router-link
            ></b-nav-item
          >
          <b-nav-item
            class="link align-self-center"
            @click.prevent="onClickLogout"
            >로그아웃</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto" v-else>
          <b-nav-item-dropdown right>
            <template #button-content>
              <b-icon icon="people" font-scale="2"></b-icon>
            </template>
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'SignUp' }" class="link"
                ><b-icon icon="person-circle"></b-icon> 회원가입</router-link
              ></b-dropdown-item
            >
            <b-dropdown-item href="#"
              ><router-link :to="{ name: 'SignIn' }" class="link"
                ><b-icon icon="key"></b-icon> 로그인</router-link
              ></b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <b-carousel
      id="carousel-fade"
      style="text-shadow: 0px 0px 2px #000"
      fade
      indicators
      img-width="1024"
      img-height="120"
    >
      <b-carousel-slide
        caption="Happy House"
        img-src="https://picsum.photos/1024/120/?image=10"
      ></b-carousel-slide>
    </b-carousel>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const userStore = "userStore";

export default {
  name: "NaviBar",
  computed: {
    ...mapState(userStore, ["isLogin", "userInfo"]),
  },
  created() {
    console.log(this.userInfo);
  },
  methods: {
    ...mapMutations(userStore, ["SET_IS_LOGIN", "SET_USER_INFO"]),
    onClickLogout() {
      this.SET_IS_LOGIN(false);
      this.SET_USER_INFO(null);
      sessionStorage.removeItem("access-token");
      if (this.$route.path != "/") this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style></style>

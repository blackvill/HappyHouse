import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Home.vue";
// import Map from "@/views/MapView.vue";
// import Map2 from "@/views/MapView2.vue";
import Map from "@/views/Map.vue";

import User from "@/views/User.vue";
import UserLogin from "@/components/user/UserLogin.vue";
import UserList from "@/components/user/UserList.vue";
import UserJoin from "@/components/user/UserJoin.vue";
import UserUpdate from "@/components/user/UserUpdate.vue";
import UserMyPage from "@/components/user/UserMyPage.vue";

import Notice from "@/views/Notice.vue";
import NoticeList from "@/components/notice/NoticeList.vue";
import NoticeWrite from "@/components/notice/NoticeWrite.vue";
import NoticeUpdate from "@/components/notice/NoticeUpdate.vue";

import Board from "@/views/Board.vue";
import BoardList from "@/components/board/BoardList.vue";
import BoardWrite from "@/components/board/BoardWrite.vue";
import BoardUpdate from "@/components/board/BoardUpdate.vue";

import Qna from "@/views/Qna.vue";
import QnaList from "@/components/qna/QnaList.vue";
import QnaWrite from "@/components/qna/QnaWrite.vue";
import QnaUpdate from "@/components/qna/QnaUpdate.vue";
import QnaReplyWrite from "@/components/qna/QnaReplyWrite.vue";

import House from "@/views/House.vue";

import store from "@/store/index.js";

Vue.use(VueRouter);

// https://router.vuejs.org/kr/guide/advanced/navigation-guards.html
const onlyAuthUser = async (to, from, next) => {
    // console.log(store);
    const checkUserInfo = store.getters["userStore/checkUserInfo"];
    const getUserInfo = store._actions["userStore/getUserInfo"];
    let token = sessionStorage.getItem("access-token");
    if (checkUserInfo == null && token) {
        await getUserInfo(token);
    }
    if (checkUserInfo === null) {
        alert("로그인이 필요한 페이지입니다..");
        // next({ name: "SignIn" });
        router.push({ name: "SignIn" });
    } else {
        console.log("로그인 했다.");
        next();
    }
};

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home,
    },
    {
        path: "/map",
        name: "Map",
        component: Map,
    },
    {
        path: "/user",
        name: "User",
        component: User,
        children: [
            {
                path: "singin",
                name: "SignIn",
                component: UserLogin,
            },
            {
                path: "list",
                name: "UserList",
                component: UserList,
            },
            {
                path: "singup",
                name: "SignUp",
                component: UserJoin,
            },
            {
                path: "update",
                name: "UserUpdate",
                component: UserUpdate,
            },
            {
                path: "mypage",
                name: "MyPage",
                beforeEnter: onlyAuthUser,
                component: UserMyPage,
            },
        ],
    },

    {
        path: "/notice",
        name: "Notice",
        component: Notice,
        redirect: "/notice/list",
        children: [
            {
                path: "list",
                name: "NoticeList",
                component: NoticeList,
            },
            {
                path: "write",
                name: "NoticeWrite",
                beforeEnter: onlyAuthUser,
                component: NoticeWrite,
            },

            {
                path: "update/:notice_no",
                name: "NoticeUpdate",
                beforeEnter: onlyAuthUser,
                component: NoticeUpdate,
            },
        ],
    },

    {
        path: "/board",
        name: "Board",
        component: Board,
        redirect: "/board/list",
        children: [
            {
                path: "list",
                name: "BoardList",
                component: BoardList,
            },
            {
                path: "write",
                name: "BoardWrite",
                beforeEnter: onlyAuthUser,
                component: BoardWrite,
            },
            {
                path: "update/:board_no",
                name: "BoardUpdate",
                beforeEnter: onlyAuthUser,
                component: BoardUpdate,
            },
        ],
    },
    {
        path: "/house",
        name: "House",
        component: House,
    },
    {
        path: "*",
        redirect: "/",
    },
    {
        path: "/qna",
        name: "Qna",
        component: Qna,
        redirect: "/qna/list",
        children: [
            {
                path: "list",
                name: "QnaList",
                component: QnaList,
            },
            {
                path: "write",
                name: "QnaWrite",
                beforeEnter: onlyAuthUser,
                component: QnaWrite,
            },
            {
                path: "replywrite/:no",
                name: "QnaReplyWrite",
                beforeEnter: onlyAuthUser,
                component: QnaReplyWrite,
            },
            {
                path: "update/:no",
                name: "QnaUpdate",
                beforeEnter: onlyAuthUser,
                component: QnaUpdate,
            },
        ],
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;

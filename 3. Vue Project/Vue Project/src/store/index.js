import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

import userStore from "@/store/modules/userStore.js";
import boardStore from "@/store/modules/boardStore.js";
import houseStore from "@/store/modules/houseStore.js";
import qnaStore from "@/store/modules/qnaStore.js";
import replyStore from "@/store/modules/replyStore.js";
import noticeStore from "@/store/modules/noticeStore.js";

import mapstore from "@/store/modules/mapstore.js";

const store = new Vuex.Store({
    modules: {
        // store, getter, mutations가 예전과 달리 여기에 없다.
        userStore,
        boardStore,
        houseStore,
        qnaStore,
        replyStore, // 자유게시판 응답 저장소
        noticeStore,

        mapstore,
    },
    plugins: [
        createPersistedState({
            // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
            storage: sessionStorage,
        }),
    ],
});

export default store;

<template>
    <b-container class="bv-example-row mt-3">
        <b-row>
            <b-col> </b-col>
        </b-row>
        <b-row class="mb-1">
            <b-col class="text-right">
                <b-button
                    variant="outline-secondary"
                    @click="moveWrite()"
                    v-show="user_id == 'admin'"
                    >글 쓰기</b-button
                >
            </b-col>
        </b-row>
        <b-row>
            <b-col v-if="notices.length">
                <!--aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-->

                <b-table
                    :items="notices"
                    :fields="fields"
                    striped
                    responsive="sm"
                    :per-page="perPage"
                    :current-page="currentPage"
                >
                    <template #cell(show_details)="row">
                        <b-button
                            size="sm"
                            @click="toggleDetails(row)"
                            class="mr-2"
                        >
                            내용 {{ row.detailsShowing ? "닫기" : "보기" }}
                        </b-button>

                        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                    </template>
                    <template #row-details="row">
                        <b-card>
                            <b-row class="mb-2">
                                <b-col sm="2" class="text-sm-right"
                                    ><b>내용 :</b></b-col
                                >
                                <b-col
                                    class="text-sm-left"
                                    v-html="row.item.notice_content"
                                >
                                </b-col>
                            </b-row>

                            <b-row class="mb-2">
                                <b-col sm="2" class="text-sm-right"
                                    ><b>작성일 :</b></b-col
                                >
                                <b-col class="text-sm-left">{{
                                    row.item.write_date
                                }}</b-col>
                            </b-row>
                            <b-col
                                class="text-center"
                                v-if="user_id == 'admin'"
                            >
                                <b-button
                                    variant="outline-info"
                                    size="sm"
                                    @click="
                                        moveModifyNotice(row.item.notice_no)
                                    "
                                    >수정</b-button
                                >

                                <!-- <input type="text" v-model="num" value="{{row.item.no }}" /> -->
                                <b-button
                                    variant="outline-danger"
                                    size="sm"
                                    @click="removeNotice(row.item.notice_no)"
                                    >삭제</b-button
                                >
                            </b-col>
                        </b-card>
                    </template>
                </b-table>
                <!--aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-->
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
//import noticeListRow from "@/components/notice/child/NoticeListRow";
import { listNotice, deleteNotice } from "@/api/notice.js";
import { mapState } from "vuex";

const userStore = "userStore";

export default {
    name: "NoticeList",
    components: {
        //noticeListRow,
    },
    data() {
        return {
            notices: [],
            word: "",
            perPage: 5,
            currentPage: 1,
            fields: [
                { key: "notice_no", label: "No" },
                { key: "notice_title", label: "제목" },
                // { key: "view_count", label: "조회수" },
                { key: "show_details", label: "자세히" },
            ],
            user_id: "",
        };
    },
    computed: {
        rows() {
            return this.notices.length;
        },
        ...mapState(userStore, ["userInfo"]),
    },
    created() {
        if (this.userInfo != null) {
            this.user_id = this.userInfo.user_id;
        }
        listNotice(
            (response) => {
                this.notices = response.data;
                console.log(this.notices);
            },
            (error) => {
                console.log(error);
            }
        );
    },
    methods: {
        moveModifyNotice(no) {
            this.$router.replace({
                name: "NoticeUpdate",
                params: { notice_no: no },
            });
        },
        removeNotice(no) {
            if (confirm("삭제하시겠습니까?")) {
                deleteNotice(no, () => {
                    this.$router.go(this.$router.currentRoute);
                });
            }
        },
        moveWrite() {
            this.$router.push({ name: "NoticeWrite" });
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
                this.notices.forEach((item) => {
                    this.$set(item, "_showDetails", false);
                });
                this.$nextTick(() => {
                    row.toggleDetails();
                    this.reply = [];
                    this.answer = "";
                });
            }
        },
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

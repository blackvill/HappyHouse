<template>
    <b-container
        id="search-box"
        class="m-2 p-1 position-absolute border border-light rounded shadow"
    >
        <b-row align-v="center" class="pl-3 py-1">
            <div @click="main" class="mouseover-cursor pr-3">
                <span class="pl-2">
                    <b-button variant="default" pill class="p-0 mr-1"
                        ><b-icon-building
                            variant="primary"
                            scale="1"
                        ></b-icon-building
                    ></b-button> </span
                ><span class="font-weight-bold text-primary">HappyHouse</span>
            </div>
        </b-row>
        <b-row class="p-1 mx-auto">
            <span class="flex-fill"
                ><b-form-input
                    id="search-input"
                    type="search"
                    class="form-control form-control"
                    placeholder="검색하고 싶은 장소를 입력하세요"
                    @keyup="searchQuery"
                    @keyup.enter="searchEnter"
                    v-model="query"
                    @focus="inputFocus"
                ></b-form-input
            ></span>
            <span
                ><b-button
                    id="search-apt"
                    variant="primary"
                    @click="searchEnter"
                >
                    검색
                </b-button></span
            >
        </b-row>
        <b-container id="search-result" class="p-1" v-show="resultVisible">
            <b-list-group>
                <b-list-group-item v-if="resultSearch == ''">
                    <b-row class="px-2 pb-1" align-h="center"
                        ><b-icon-emoji-expressionless></b-icon-emoji-expressionless
                    ></b-row>
                    <b-row
                        class="px-2"
                        style="font-size: 12px"
                        align-h="center"
                    >
                        검색 결과가 없습니다.
                    </b-row>
                </b-list-group-item>
                <b-list-group-item
                    v-show="resultSearch"
                    v-for="(item, index) in resultSearch.data"
                    :key="index"
                    button
                    @click="resultClick(item)"
                >
                    <b-row class="px-2">{{ item.place_name }}</b-row>
                    <b-row class="px-2" style="color: grey; font-size: 12px">{{
                        item.address_name
                    }}</b-row>
                </b-list-group-item>
            </b-list-group>
        </b-container>
    </b-container>
</template>

<script>
export default {
    props: {
        resultSearch: Object,
        resultVisible: Boolean,
    },
    data() {
        return {
            query: "",
            rangeDeal: 20,
            rangeInfra: 0,
        };
    },
    // watch: {
    //   rangeDeal: function() {
    //     this.modifyFilter(this.rangeDeal, this.rangeInfra);
    //   },
    //   rangeInfra: function() {
    //     this.modifyFilter(this.rangeDeal, this.rangeInfra);
    //   },
    // },
    methods: {
        searchQuery() {
            if (this.query == "") {
                this.resultSearch = "";
            }
            this.$emit("result-visible", true);
            this.$emit("search-query", this.query);
        },
        resultClick(position) {
            console.log("click!!!");
            this.query = position.place_name;
            this.$emit("result-click", {
                lat: position.y,
                lng: position.x,
            });
        },
        searchEnter() {
            if (this.resultSearch == "") return;
            this.$emit("result-click", {
                lat: this.resultSearch.data[0].y,
                lng: this.resultSearch.data[0].x,
            });
        },
        inputFocus() {
            this.$emit("result-visible", true);
            this.query = "";
        },
        inputBlur() {
            this.$emit("result-visible", false);
        },
        initRange() {
            this.rangeDeal = 20;
            this.rangeInfra = 0;
            this.modifyFilter();
        },
        modifyFilter() {
            this.$emit("modify-filter", {
                deal: this.rangeDeal,
                infra: this.rangeInfra,
            });
        },
        main() {
            window.location.href = "/main";
        },
    },
};
</script>

<style scoped>
#search-box {
    z-index: 1000;
    max-width: 370px;
    background: white;
}
#search-result {
    max-height: 300px;
    overflow: auto;
}
.mouseover-cursor {
    cursor: pointer;
}
</style>

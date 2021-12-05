<template>
  <b-container v-if="house" class="bv-example-row">
    <b-row></b-row>
    <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
      <template #header
        ><b-row>
          <b-col
            ><h3>{{ house.아파트 }}</h3></b-col
          >
        </b-row></template
      >

      <template #lead>
        <hr class="my-4" />
        <b-row>
          <b-col> 일련번호 </b-col>
          <b-col> {{ house.일련번호 }} </b-col>
        </b-row>
        <b-row>
          <b-col> 아파트 이름 </b-col>
          <b-col>{{ house.아파트 }} </b-col>
        </b-row>
        <b-row>
          <b-col> 법정동</b-col>
          <b-col>{{ house.법정동 }} </b-col>
        </b-row>
        <b-row>
          <b-col> 층수 </b-col>
          <b-col>{{ house.층 }}층 </b-col>
        </b-row>
        <b-row>
          <b-col> 거래금액 </b-col>
          <b-col>
            {{ (parseInt(house.거래금액.replace(",", "")) * 10000) | price }}원
          </b-col>
        </b-row>
      </template>
      <hr class="my-4" />
    </b-jumbotron>
  </b-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

const houseStore = "houseStore";

export default {
  name: "HouseDetail",
  computed: {
    ...mapState(houseStore, ["house"]),
    ...mapMutations(houseStore, ["CLEAR_DETAIL_LIST"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  created() {
    this.CLEAR_DETAIL_LIST;
  },
  filters: {
    price(value) {
      if (!value) return value;
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
  },
};
</script>

<style></style>

<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-carousel
      id="carousel-1"
      :interval="4000"
      fade
      indicators
      background="#ababab"
      img-width="1024"
      img-height="240"
      style="text-shadow: 1px 1px 2px #333"
    >
      <!-- Slide with blank fluid image to maintain slide aspect ratio -->
      <b-carousel-slide caption="게시판" img-blank img-alt="Blank image">
      </b-carousel-slide>
    </b-carousel>
    <router-view></router-view>
  </b-container>
</template>
<script>
export default {
  name: "Board",
};
</script>
<style scoped>
.underline-hotpink {
  display: inline-block;
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 0) 70%,
    rgba(231, 27, 139, 0.3) 30%
  );
}
</style>

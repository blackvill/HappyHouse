<template>
  <b-container class="bv-example-row mt-3">
    <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
      <template #header
        ><b-row>
          <b-col><h3>공지사항 작성</h3></b-col>
        </b-row></template
      >

      <template #lead> <notice-write-form type="register" /></template>
    </b-jumbotron>
  </b-container>
</template>

<script>
import NoticeWriteForm from "./child/NoticeWriteForm.vue";

export default {
  name: "NoticeWrite",
  components: {
    NoticeWriteForm,
  },
};
</script>

<style></style>

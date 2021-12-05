<template>
  <b-container class="bv-example-row mt-3">
    <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
      <template #header
        ><b-row>
          <b-col><h3>Qna 작성</h3></b-col>
        </b-row>
      </template>

      <template #lead> <qna-write-form type="register" /></template>
    </b-jumbotron>
  </b-container>
</template>

<script>
import QnaWriteForm from "./child/QnaWriteForm.vue";

export default {
  name: "QnaWrite",
  components: {
    QnaWriteForm,
  },
};
</script>

<style></style>

<template>
  <b-container class="bv-example-row mt-3">
    <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
      <template #header
        ><b-row>
          <b-col><h3>Qna 수정</h3></b-col>
        </b-row>
      </template>

      <template #lead> <qna-write-form type="modify" /></template>
    </b-jumbotron>
  </b-container>
</template>

<script>
import QnaWriteForm from "./child/QnaWriteForm.vue";

export default {
  name: "QnaUpdate",
  components: {
    QnaWriteForm,
  },
};
</script>

<style></style>

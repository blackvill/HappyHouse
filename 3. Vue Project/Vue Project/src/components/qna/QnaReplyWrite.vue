<template>
  <b-container class="bv-example-row mt-3">
    <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
      <template #header
        ><b-row>
          <b-col><h3>답변 작성</h3></b-col>
        </b-row>
        <hr class="my-4" />
      </template>

      <template #lead> <qna-reply-write-form type="register" /></template>
    </b-jumbotron>
  </b-container>
</template>

<script>
import QnaReplyWriteForm from "./child/QnaReplyWriteForm.vue";

export default {
  name: "QnaReplyWrite",
  components: {
    QnaReplyWriteForm,
  },
};
</script>

<style></style>

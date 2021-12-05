<template>
  <b-container class="bv-example-row mt-3">
    <b-jumbotron bg-variant="muted" text-variant="dark" border-variant="dark">
      <template #header
        ><b-row>
          <b-col><h3>글 수정</h3></b-col>
        </b-row></template
      >

      <template #lead> <board-write-form type="modify" /></template>
    </b-jumbotron>
  </b-container>
</template>

<script>
import BoardWriteForm from "./child/BoardWriteForm.vue";

export default {
  name: "BoardUpdate",
  components: {
    BoardWriteForm,
  },
};
</script>

<style></style>

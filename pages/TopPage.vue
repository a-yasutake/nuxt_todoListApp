<template>
  <div id="TopPage">
    <div class="main">
      <h1>TodoListアプリ</h1>
      <SaveList />
      <InputForm />
      <ViewTodoList />
      <ViewComleteList />
    </div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import InputForm from "~/components/InputForm.vue";
import ViewTodoList from "../components/ViewTodoList.vue";
import ViewComleteList from "../components/ViewCompleteList.vue";
import SaveList from "../components/SaveList.vue";

@Component({
  components: { InputForm, ViewTodoList, ViewComleteList, SaveList }
})
export default class TopPage extends Vue {}
</script>
<style>
.main {
  margin-left: 10%;
}

table {
  width: 800px; /* 幅指定 */
}

th {
  width: 100px; /* 幅指定 */
}
tr {
  height: 20px;
}

caption {
  font-size: 30px;
}
table.todo-table th {
  background-color: #ffff66;
}
table.complete-table th {
  background-color: #dddddd;
}
</style>

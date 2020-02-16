<template lang="html">
  <div>
    <table class="complete-table">
      <caption>
        完了リスト
      </caption>
      <thead>
        <tr>
          <th>期限</th>
          <th>優先度</th>
          <th>Todo</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="todo in completedTodos" v-bind:key="todo.id">
          <td>{{ todo.deadline }}</td>
          <td>{{ priorityTypes[todo.priority] }}</td>
          <td>{{ todo.text }}</td>
          <td><button @click="moveUnComplete(todo.id)">戻す</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RootState } from "~/store";
import { Todo } from "../store/index";
import Property from "../properties/Property";

@Component({})
export default class ViewCompleteList extends Vue {
  private allTodoList: Todo[] = (this.$store.state as RootState).todos;
  private completedList: Todo[] = this.completedTodos;
  private priorityTypes = Property.priorityTypes;

  // 完了の一覧取得
  private get completedTodos() {
    return this.allTodoList.filter(t => t.isComplete === true);
  }

  // 未完了一覧へ移動
  private moveUnComplete(todoId: string): void {
    this.$store.commit("CHANGE_TODO_UNCOMPLETE", todoId);
    this.completedList.filter(t => t.id === todoId);
  }
}
</script>

<style></style>

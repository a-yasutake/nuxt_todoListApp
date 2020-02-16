<template lang="html">
  <div>
    <table class="todo-table">
      <caption>
        Todoリスト
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
        <tr v-for="todo in uncompletedTodos" v-bind:key="todo.id">
          <td>{{ todo.deadline }}</td>
          <td>{{ priorityTypes[todo.priority] }}</td>
          <td>{{ todo.text }}</td>
          <td>
            <button @click="moveComplete(todo.id)">完了</button>
            <button @click="deleteTodo(todo.id)">削除</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RootState } from "~/store";
import { Todo } from "../store/index";
import Property from "@/properties/Property";

@Component({})
export default class ViewTodoList extends Vue {
  private allTodoList: Todo[] = (this.$store.state as RootState).todos;
  private uncompletedList: Todo[] = this.uncompletedTodos;
  private priorityTypes = Property.priorityTypes;

  private async created() {
    // DBよりデータ取得
    await this.$store.dispatch("getTodos");
  }

  // 未完了の一覧取得
  private get uncompletedTodos() {
    return this.allTodoList.filter(t => t.isComplete === false);
  }

  // 完了一覧へ移動
  private moveComplete(todoId: string): void {
    this.$store.commit("CHANGE_TODO_COMPLETE", todoId);
    this.uncompletedList.filter(t => t.id === todoId);
  }

  // 一覧より削除
  private deleteTodo(todoId: string): void {
    this.$store.commit("DELETE_TODO", todoId);
    this.uncompletedList.filter(t => t.id === todoId);
  }
}
</script>

<style></style>

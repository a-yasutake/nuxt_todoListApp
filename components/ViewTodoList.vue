<template lang="html">
  <div class="l-todo-list-area">
    <table class="todo-list-table">
      <caption class="table-title">
        TodoList
      </caption>
      <thead>
        <tr class="th-todo">
          <th class="column-date">期限</th>
          <th class="column-priority">
            優先度
          </th>
          <th class="column-todo-text">Todo</th>
          <th class="column-button-area"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="tr-todo"
          v-for="todo in uncompletedTodos"
          v-bind:key="todo.id"
        >
          <td class="column-date">{{ todo.deadline }}</td>
          <td class="column-priority">{{ priorityTypes[todo.priority] }}</td>
          <td class="column-todo-text">{{ todo.text }}</td>
          <td class="column-button-area">
            <button
              class="button complete-button"
              @click="moveComplete(todo.id)"
            >
              Complete
            </button>
            <button class="button delete-button" @click="deleteTodo(todo.id)">
              Delete
            </button>
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
  private allTodoList: Todo[] = (this.$store.state as RootState).todoList;
  private uncompletedList: Todo[] = this.uncompletedTodos;
  private priorityTypes = Property.priorityTypes;

  private async created() {
    // DBよりデータ取得
    await this.$store.dispatch("getTodos");
  }

  // 未完了の一覧取得
  private get uncompletedTodos() {
    return this.allTodoList.filter((t) => t.isComplete === false);
  }

  // 完了一覧へ移動
  private moveComplete(todoId: string): void {
    this.$store.commit("CHANGE_TODO_COMPLETE_FLG", todoId);
    this.uncompletedList.filter((t) => t.id === todoId);
  }

  // 一覧より削除
  private deleteTodo(todoId: string): void {
    this.$store.commit("DELETE_TODO", todoId);
    this.uncompletedList.filter((t) => t.id === todoId);
  }
}
</script>

<style></style>

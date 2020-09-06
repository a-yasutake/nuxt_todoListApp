<template lang="html">
  <div class="l_complete-list-area">
    <table class="complete-list-table">
      <caption class="table-title">
        CompleteList
      </caption>
      <thead>
        <tr class="th-complete">
          <th data-name="column-date">期限</th>
          <th data-name="column-priority">優先度</th>
          <th data-name="column-todo-text">Todo</th>
          <th data-name="column-button-area"></th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="tr-complete"
          v-for="todo in completedTodos"
          v-bind:key="todo.id"
        >
          <td data-name="column-date">{{ todo.deadline }}</td>
          <td data-name="column-priority">
            {{ priorityTypes[todo.priority] }}
          </td>
          <td data-name="column-todo-text">{{ todo.text }}</td>
          <td data-name="column-button-area">
            <button
              class="button back-todo-button"
              @click="moveUnComplete(todo.id)"
            >
              Back
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
import Property from "../properties/Property";

@Component({})
export default class ViewCompleteList extends Vue {
  private allTodoList: Todo[] = (this.$store.state as RootState).todoList;
  private completedList: Todo[] = this.completedTodos;
  private priorityTypes = Property.priorityTypes;

  // 完了の一覧取得
  private get completedTodos() {
    return this.allTodoList.filter((t) => t.isComplete === true);
  }

  // 未完了一覧へ移動
  private moveUnComplete(todoId: string): void {
    this.$store.commit("CHANGE_TODO_COMPLETE_FLG", todoId);
    this.completedList.filter((t) => t.id === todoId);
  }
}
</script>

<style></style>

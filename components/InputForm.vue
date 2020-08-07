<template lang="html">
  <div class="l-iuput-area">
    <form class="input-todo-form">
      <p class="input-date-area input-column">
        <input class="input-date" type="date" v-model="inputDate" />
      </p>
      <p class="input-priority-area input-column">
        <select class="input-priority" v-model="priority">
          <option value="" hidden>優先度</option>
          <option value="0"> 高 </option>
          <option value="1"> 中 </option>
          <option value="2"> 低 </option>
        </select>
      </p>
      <p class="input-text-area input-column">
        <input
          class="input-text"
          type="text"
          v-model="inputText"
          maxlength="50"
        />
      </p>
      <p class="input-button-area input-column">
        <button class="button add-button" type="button" @click="addTodo">
          ADD
        </button>
        <input class="button clear-button" type="reset" value="RESET" />
      </p>
    </form>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RootState } from "~/store";
import { Todo, actions } from "../store/index";

@Component({})
export default class InputForm extends Vue {
  protected inputDate: string = "";
  protected inputText: string = "";
  protected priority: string = "";

  private addTodo(): void {
    // validate
    // todo:vue-validateを実装予定
    if (!this.priority || !this.inputText) {
      window.alert("入力してください");
      return;
    }

    const id = new Date().getMilliseconds().toString();

    const todo: Todo = {
      id: id,
      deadline: this.inputDate,
      priority: this.priority,
      text: this.inputText,
      isComplete: false,
    };
    this.$store.commit("ADD_TODO", todo);
    this.inputText = "";
  }
}
</script>

<style></style>

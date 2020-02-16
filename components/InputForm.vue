<template lang="html">
  <div>
    <form>
      <p class="inline-block">
        <input type="date" v-model="inputDate" />
      </p>
      <p class="inline-block">
        <select v-model="priority">
          <option value="" hidden>優先度</option>
          <option value="1"> 高 </option>
          <option value="2"> 中 </option>
          <option value="3"> 低 </option>
        </select>
      </p>
      <p class="inline-block">
        <input type="text" v-model="inputText" size="40" />
      </p>
      <p class="inline-block">
        <button type="button" @click="addTodo">追加</button>
      </p>
      <p class="inline-block">
        <input type="reset" value="リセット" />
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
      isComplete: false
    };
    this.$store.commit("ADD_TODO", todo);
    this.inputText = "";
  }
}
</script>

<style>
.inline-block {
  display: inline-block; /* インラインブロック要素にする */
  height: 30px; /* 高さ指定 */
}
</style>

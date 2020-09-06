<template lang="html">
  <div class="l_save-area">
    <button class=" button save-button" @click="save">SAVE</button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RootState } from "~/store";
import { Todo } from "../store/index";

@Component({})
export default class SaveList extends Vue {
  // 保存ボタン押下の処理
  private save() {
    if (!confirm("保存しますよろしいですか？")) return;
    // this.$store.dispatch("getTodos", true);
    alert("保存機能は停止中です");
  }
}
</script>

<style></style>

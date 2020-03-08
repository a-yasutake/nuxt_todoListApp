<template lang="html">
  <div class="save-btn-area">
    <button id="saveBtn" @click="save">保存</button>
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
    this.$store.dispatch("getTodos", true);
  }
}
</script>

<style>
#saveBtn {
  color: whitesmoke;
  background-color: rgb(236, 72, 22);
  display: block;
  margin: 0 0 0 auto;
  margin-bottom: 10px;
  width: 180px;
}
#saveBtn:hover {
  color: whitesmoke;
  background-color: rgb(214, 29, 29);
}
.save-btn-area {
  width: 820px;
}
</style>

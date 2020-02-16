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
  private allTodoList: Todo[] = (this.$store.state as RootState).todos;

  // 保存ボタン押下の処理
  private async save() {
    if (!confirm("保存しますよろしいですか？")) return;
    await this.getBackupDb();
    await this.deleteTodoDb();
    await this.addTodoDb();
    // バックアップデータクリア
    this.$store.commit("DELETE_ALL_BACKUP_TODO");
  }

  // バックアップとしてDBデータ取得
  private getBackupDb(): void {
    this.$store.dispatch("getTodos", true).then(
      value => {
        console.log("バックアップデータ取得成功");
      },
      reason => {
        console.log("バックアップデータ取得失敗");
        alert("保存に失敗しました（エラー箇所：バックアップデータ取得）");
      }
    );
  }

  // 現在のDBデータを削除する
  private deleteTodoDb(): void {
    this.$store.dispatch("deleteTodos").then(
      value => {
        console.log("DBデータ削除成功");
      },
      reason => {
        console.log("DBデータ削除失敗");
        alert("保存に失敗しました（エラー箇所：DBデータ削除）");
      }
    );
  }

  //　画面上のTODOをDBへ登録する
  private addTodoDb() {
    this.$store.dispatch("fetchTodos").then(
      value => {
        console.log("DBデータ登録成功");
        alert("保存に成功しました");
      },
      reason => {
        console.log("DBデータ登録失敗");
        alert("保存に失敗しました（エラー箇所：DBデータ登録）");
      }
    );
  }
}
</script>

<style>
#saveBtn {
  color: whitesmoke;
  background-color: rgb(236, 72, 22);
  width: 180px;
}
#saveBtn:hover {
  color: whitesmoke;
  background-color: rgb(214, 29, 29);
}
.save-btn-area {
  width: 800px;
}
</style>

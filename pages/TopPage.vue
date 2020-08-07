<template>
  <div id="TopPage" class="l-main">
    <h1 class="title main-title">TodoListApp</h1>
    <SaveList />
    <InputForm />
    <ViewTodoList />
    <ViewComleteList />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "nuxt-property-decorator";
import InputForm from "~/components/InputForm.vue";
import ViewTodoList from "../components/ViewTodoList.vue";
import ViewComleteList from "../components/ViewCompleteList.vue";
import SaveList from "../components/SaveList.vue";
import Property from "../properties/Property";

@Component({
  components: { InputForm, ViewTodoList, ViewComleteList, SaveList },
})
export default class TopPage extends Vue {}
</script>
<style>
/*共通 */
body {
  font-family: "Trebuchet MS", "Tahoma", "Verdana", "Segoe UI Symbol",
    "Segoe UI Black", "Arial Black", "メイリオ", Meiryo, "Meiryo UI", YuGothic,
    "Yu Gothic", sans-serif;
}
.l-main {
  width: 980px;
  margin: 0 auto;
  background-color: #fffffe;
}
.button {
  font-weight: bold;
  color: #272343;
  outline: 0;
  display: inline-block;
  padding: 0.5em 1em;
  text-decoration: none;
  border-bottom: solid 4px #627295;
  border-radius: 3px;
}
.button:active {
  /*ボタンを押したとき*/
  -webkit-transform: translateY(4px);
  transform: translateY(4px); /*下に動く*/
}
.main-title {
  /*線の種類（実線） 太さ 色*/
  border-bottom: solid 3px #272343;
  /* background-color: #bae8e8; */
  padding-left: 10px;
  padding-top: 5px;
  font-size: 35px;
  margin-top: 10px;
}
/*保存エリア */
.l-save-area {
  text-align: right;
  padding-right: 30px;
}
.save-button {
  width: 200px;
  border: solid 4px;
  background-color: white;
  border-color: #c9211e;
  margin-top: 20px;
}
/*入力エリア */
.l-iuput-area {
  width: 980px;
  height: 100px;
  text-align: center;
  margin-top: 20px;
}
.input-todo-form {
  height: 90px;
}
.input-column {
  height: 50px;
  display: inline-block;
  margin-right: 3px;
}
.input-date-area {
  width: 130px;
}
.input-date {
  width: 100%;
  height: 30px;
}
.input-priority-area {
  width: 100px;
}
.input-priority {
  height: 35px;
  width: 100%;
}
.input-text-area {
  width: 350px;
}
.input-text {
  width: 100%;
  height: 30px;
}
.input-button-area {
  width: 300px;
}
.add-button {
  width: 130px;
  border: solid 3px;
  border-color: #272343;
  background-color: #ffd803;
}
.clear-button {
  width: 130px;
  border: solid 3px;
  border-color: #272343;
  background-color: #dbdbdb;
}
/*TodoListエリア */
.l-todo-list-area {
}
.todo-list-table {
  margin: 0 auto;
  width: 900px;
  table-layout: fixed;
}
.th-todo {
  font-weight: bold;
  background-color: #bae8e8;
  height: 30px;
}
.tr-todo {
  height: 50px;
}
.complete-button {
  background-color: #ffd803;
  border: solid 2px;
  border-color: #272343;
}
.delete-button {
  background-color: #dbdbdb;
  border: solid 2px;
  border-color: #272343;
}
/*（共通）TodoListエリア・Completeエリア */
th,
td {
  vertical-align: middle;
  /*word-break: break-all;*/
  overflow-wrap: break-word;
}
.table-title {
  color: #272343;
  font-weight: bold;
  font-size: 25px;
  margin-bottom: 5px;
}
.column-date {
  width: 150px;
  text-align: center;
}
.column-priority {
  width: 100px;
  text-align: center;
}
.column-todo-text {
  width: 400px;
  padding-right: 50px;
}
.column-button-area {
  width: 200px;
}
/*CompleteListエリア */
.l-complete-list-area {
  margin-top: 50px;
}
.complete-list-table {
  margin: 0 auto;
  width: 900px;
  table-layout: fixed;
}

.th-complete {
  font-weight: bold;
  background-color: #272343;
  height: 30px;
  color: #fffffe;
}
.tr-complete {
  height: 50px;
  background-color: #dbdbdb;
}
.back-todo-button {
  width: 130px;
  border: solid 4px;
  background-color: white;
  border-color: #272343;
}
</style>

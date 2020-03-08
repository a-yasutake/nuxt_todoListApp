import { GetterTree, ActionTree, MutationTree } from "vuex";
// axios引き込み
const axios = require("axios");
let url = "https://XXXXXX.firebaseio.com/todos"; //XXXXXX ⇒firebaseプロジェクトIDに置き換える

export interface Todo {
  // 一意になるかんじのID
  id: string;
  // 期限
  deadline: string;
  // 優先度（0⇒高、1⇒中、2⇒低）
  priority: string;
  // やること
  text: string;
  // 完了フラグ
  isComplete: boolean;
}

export const state = () => ({
  todos: [] as Todo[],
  backupTodos: [] as Todo[]
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  todoList: state => state.todos
};

export const mutations: MutationTree<RootState> = {
  ADD_TODO: (state, todo: Todo) => {
    return state.todos.push(todo);
  },
  ADD_BACKUP_TODO: (state, todo: Todo) => {
    return state.backupTodos.push(todo);
  },
  CHANGE_TODO_COMPLETE: (state, id: string) => {
    const index = state.todos.findIndex(t => t.id === id);
    state.todos[index].isComplete = true;
  },
  CHANGE_TODO_UNCOMPLETE: (state, id: string) => {
    const index = state.todos.findIndex(t => t.id === id);
    state.todos[index].isComplete = false;
  },
  DELETE_TODO: (state, id: string) => {
    const index = state.todos.findIndex(t => t.id === id);
    state.todos.splice(index, 1);
  },
  DELETE_ALL_TODO: state => {
    state.todos = [];
  },
  DELETE_ALL_BACKUP_TODO: state => {
    state.backupTodos = [];
  }
};

// firebaseの操作
export const actions: ActionTree<RootState, RootState> = {
  // データ取得
  getTodos({ commit }, isBackup: boolean = false) {
    // todo初期化
    // commit("DELETE_ALL_TODO");
    axios.get(url + ".json").then((res: { [x: string]: {} }) => {
      // 取得データ変換
      const toJson = JSON.stringify(res.data);
      const toArry = JSON.parse(toJson);
      // 取得データを格納
      for (var i in toArry) {
        const todo: Todo = {
          id: i,
          deadline: toArry[i].deadline,
          priority: toArry[i].priority,
          text: toArry[i].text,
          isComplete: toArry[i].isComplete
        };
        if (isBackup) {
          commit("ADD_BACKUP_TODO", todo);
        } else {
          commit("ADD_TODO", todo);
        }
      }
      if (isBackup) this.dispatch("deleteTodos");
    });
  },
  // データ登録
  fetchTodos({ commit }) {
    // 取得データを格納
    const todos = (this.state as RootState).todos;
    for (var i in todos) {
      let addUrl = url + "/" + todos[i].id + ".json";
      let data = {
        deadline: todos[i].deadline,
        priority: todos[i].priority,
        text: todos[i].text,
        isComplete: todos[i].isComplete
      };
      axios.put(addUrl, data);
    }
    alert("保存に成功しました。");
    commit("DELETE_ALL_BACKUP_TODO");
  },
  // データ削除
  deleteTodos({ commit }) {
    // firebaseのデータはbackupTodosとイコールの為
    // backupTodosに存在するIDを削除する
    const todos = (this.state as RootState).backupTodos;
    for (var i in todos) {
      let deleteUrl = url + "/" + todos[i].id + ".json";
      console.log(i, "url", deleteUrl);
      axios.delete(deleteUrl);
    }
    this.dispatch("fetchTodos");
  }
};

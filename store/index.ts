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
  todoList: [] as Todo[],
  backupTodoList: [] as Todo[],
});

export type RootState = ReturnType<typeof state>;

export const getters: GetterTree<RootState, RootState> = {
  todoList: (state) => state.todoList,
};

export const mutations: MutationTree<RootState> = {
  ADD_TODO: (state, todo: Todo) => {
    return state.todoList.push(todo);
  },
  ADD_BACKUP_TODO: (state, todo: Todo) => {
    return state.backupTodoList.push(todo);
  },
  CHANGE_TODO_COMPLETE_FLG: (state, id: string) => {
    const index = state.todoList.findIndex((t) => t.id === id);
    state.todoList[index].isComplete = !state.todoList[index].isComplete;
  },
  DELETE_TODO: (state, id: string) => {
    const index = state.todoList.findIndex((t) => t.id === id);
    state.todoList.splice(index, 1);
  },
  DELETE_ALL_TODO: (state) => {
    state.todoList = [];
  },
  DELETE_ALL_BACKUP_TODO: (state) => {
    state.backupTodoList = [];
  },
  SORT_LIST_PRIORITY: (state, isAsc: boolean) => {
    state.todoList.sort(function(a, b) {
      const val1 = isAsc ? a.priority : b.priority;
      const val2 = isAsc ? b.priority : a.priority;

      return Number(val1) - Number(val2);
    });
  },
  SORT_LIST_DATE: (state, isAsc: boolean) => {
    state.todoList.sort(function(a, b) {
      const val1 = isAsc ? a.deadline : b.deadline;
      const val2 = isAsc ? b.deadline : a.deadline;
      return val1 > val2 ? 1 : -1;
    });
  },
};

// firebaseの操作
export const actions: ActionTree<RootState, RootState> = {
  // データ取得
  getTodos({ commit }, isBackup: boolean = false) {
    // todo初期化
    // commit("DELETE_ALL_TODO");
    // axios.get(url + ".json").then((res: { [x: string]: {} }) => {
    const toArry = [
      {
        id: "116",
        deadline: "2020-09-01",
        isComplete: false,
        priority: "0",
        text: "さんぷる１",
      },
      {
        id: "420",
        deadline: "2020-09-01",
        isComplete: false,
        priority: "1",
        text: "さんぷる２",
      },
      {
        id: "402",
        deadline: "2020-09-01",
        isComplete: false,
        priority: "2",
        text: "さんぷる３",
      },
      {
        id: "713",
        deadline: "2020-09-09",
        isComplete: false,
        priority: "0",
        text: "さんぷる４",
      },
      {
        id: "794",
        deadline: "2020-09-10",
        isComplete: false,
        priority: "1",
        text: "さんぷる５",
      },
      {
        id: "928",
        deadline: "2020-09-02",
        isComplete: false,
        priority: "2",
        text: "さんぷる６",
      },
    ];
    // 取得データを格納
    for (var i in toArry) {
      const todo: Todo = {
        id: i,
        deadline: toArry[i].deadline,
        priority: toArry[i].priority,
        text: toArry[i].text,
        isComplete: toArry[i].isComplete,
      };
      commit("ADD_TODO", todo);
    }
    // // 取得データ変換
    // const toJson = JSON.stringify(res.data);
    // const toArry = JSON.parse(toJson);
    // // 取得データを格納
    // for (var i in toArry) {
    //   const todo: Todo = {
    //     id: i,
    //     deadline: toArry[i].deadline,
    //     priority: toArry[i].priority,
    //     text: toArry[i].text,
    //     isComplete: toArry[i].isComplete,
    //   };
    //   if (isBackup) {
    //     commit("ADD_BACKUP_TODO", todo);
    //   } else {
    //     commit("ADD_TODO", todo);
    //   }
    // }
    // if (isBackup) this.dispatch("deleteTodoList");
    // });
  },
  // データ登録
  fetchTodos({ commit }) {
    // 取得データを格納
    const todos = (this.state as RootState).todoList;
    for (var i in todos) {
      let addUrl = url + "/" + todos[i].id + ".json";
      let data = {
        deadline: todos[i].deadline,
        priority: todos[i].priority,
        text: todos[i].text,
        isComplete: todos[i].isComplete,
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
    const todos = (this.state as RootState).backupTodoList;
    for (var i in todos) {
      let deleteUrl = url + "/" + todos[i].id + ".json";
      console.log(i, "url", deleteUrl);
      axios.delete(deleteUrl);
    }
    this.dispatch("fetchTodos");
  },
};

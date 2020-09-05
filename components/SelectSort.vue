<template>
  <div class="l-sort-area">
    <select class="select-sort" @change="sortList(sortType)" v-model="sortType">
      <option value="" hidden>並べ替え</option>
      <option value="1">並べ替え：優先度が高い順番</option>
      <option value="2">並べ替え：優先度が低い順番</option>
      <option value="3">並べ替え：期限が短い順番</option>
      <option value="4">並べ替え：期限が長い順番</option>
    </select>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { RootState } from "~/store";
import { Todo } from "../store/index";
import { SortTypes } from "@/properties/SortTypes";

@Component({})
export default class SelectSort extends Vue {
  protected sortType: string = "";

  // ソート
  private sortList(sortType: string) {
    const isAsc =
      sortType === String(SortTypes.PRIORITY_ASC) ||
      sortType === String(SortTypes.DATE_ASC);

    const isPriority =
      sortType === String(SortTypes.PRIORITY_ASC) ||
      sortType === String(SortTypes.PRIORITY_DESC);

    const mutationType = isPriority ? "SORT_LIST_PRIORITY" : "SORT_LIST_DATE";
    this.$store.commit(mutationType, isAsc);
  }
}
</script>

<style></style>

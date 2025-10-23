<script setup lang="ts">
/**
 * Ensure the v-model is never undefined by providing a default.
 * This silences "'model' is possibly 'undefined'" and keeps the template simple.
 */
const model = defineModel<{ query: string; status: 'all' | 'todo' | 'doing' | 'done'; priority: 'all' | 'low' | 'medium' | 'high' }>({
  default: { query: '', status: 'all', priority: 'all' }
})
</script>

<template>
  <div class="u-grid u-grid-gap" style="grid-template-columns: 1fr 180px 180px;">
    <input class="input" v-model="model.query" placeholder="Search tasks…" />
    <select class="input" v-model="model.status">
      <option value="all">All status</option>
      <option value="todo">To-do</option>
      <option value="doing">In progress</option>
      <option value="done">Completed</option>
    </select>
    <select class="input" v-model="model.priority">
      <option value="all">All priority</option>
      <option value="low">low</option>
      <option value="medium">medium</option>
      <option value="high">high</option>
    </select>
  </div>
</template>

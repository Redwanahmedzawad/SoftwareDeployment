<template>
  <main class="app">
    <header class="app-header">
      <h1>Verisys — Task Board</h1>
      <form class="new" @submit.prevent="onAdd">
        <input v-model.trim="newTitle" placeholder="Add a task..." required />
        <button type="submit">Add</button>
      </form>
    </header>
    <KanbanBoard
      :tasks="tasks"
      @update="onUpdate"
      @delete="onDelete"
      class="app__board"
    />
  </main>
</template>
<script setup lang="ts">
import { ref, onMounted } from "vue";
import KanbanBoard from "./components/KanbanBoard.vue";
import type { TaskItem } from "./types";
import {
  listTasks,
  createTask,
  updateTask,
  deleteTask,
} from "./services/tasks";

const tasks = ref<TaskItem[]>([]);
const newTitle = ref("");

async function refresh() {
  tasks.value = await listTasks();
}

async function onAdd() {
  await createTask({ title: newTitle.value, status: "todo" });
  newTitle.value = "";
  await refresh();
}

async function onUpdate(task: TaskItem) {
  await updateTask(task);
  await refresh();
}

async function onDelete(id: number) {
  await deleteTask(id);
  await refresh();
}

onMounted(refresh);
</script>

<style scoped>
.app {
  max-width: 1100px;
  margin: 2rem auto;
  padding: 0 1rem;
}
.app__header {
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}
h1 {
  margin: 0;
  font-size: 1.5rem;
}
.new {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
.new input {
  padding: 0.5rem 0.6rem;
  min-width: 260px;
}
.new button {
  padding: 0.5rem 0.8rem;
  cursor: pointer;
}
.app__board {
  margin-top: 1rem;
}
</style>

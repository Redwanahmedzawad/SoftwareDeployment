<template>
  <section class="board">
    <div class="col" v-for="col in columns" :key="col.key">
      <header class="col__header">
        <h2>{{ col.title }}</h2>
        <small>{{ filtered(col.key).length }}</small>
      </header>

      <ul class="col__list">
        <li v-for="t in filtered(col.key)" :key="t.id" class="card">
          <div class="card__title" :title="t.title">{{ t.title }}</div>

          <div class="card__actions">
            <button
              v-if="col.key !== 'todo'"
              @click="moveLeft(t)"
              title="Move left"
            >
              ◀
            </button>
            <button
              v-if="col.key !== 'done'"
              @click="moveRight(t)"
              title="Move right"
            >
              ▶
            </button>
            <select
              v-model="t.status"
              @change="emitUpdate(t)"
              title="Set status"
            >
              <option value="todo">To-Do</option>
              <option value="doing">Doing</option>
              <option value="done">Done</option>
            </select>
            <button class="danger" @click="emitDelete(t.id)" title="Delete">
              🗑
            </button>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TaskItem, Status } from "../types";

const props = defineProps<{ tasks: TaskItem[] }>();
const emit = defineEmits<{
  (e: "update", task: TaskItem): void;
  (e: "delete", id: number): void;
}>();

const columns = [
  { key: "todo" as Status, title: "To-Do" },
  { key: "doing" as Status, title: "Doing" },
  { key: "done" as Status, title: "Done" },
];

const byStatus = computed<Record<Status, TaskItem[]>>(() => ({
  todo: props.tasks.filter((t) => t.status === "todo"),
  doing: props.tasks.filter((t) => t.status === "doing"),
  done: props.tasks.filter((t) => t.status === "done"),
}));

function filtered(s: Status) {
  return byStatus.value[s];
}

function emitUpdate(task: TaskItem) {
  emit("update", { ...task });
}

function emitDelete(id: number) {
  emit("delete", id);
}

function moveLeft(t: TaskItem) {
  const order: Status[] = ["todo", "doing", "done"];
  const i = order.indexOf(t.status);
  if (i > 0) {
    t.status = order[i - 1];
    emitUpdate(t);
  }
}

function moveRight(t: TaskItem) {
  const order: Status[] = ["todo", "doing", "done"];
  const i = order.indexOf(t.status);
  if (i < order.length - 1) {
    t.status = order[i + 1];
    emitUpdate(t);
  }
}
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}
.col {
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 0.75rem;
  padding: 0.75rem;
}
.col__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}
.col__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 0.5rem;
}
.card {
  background: white;
  border: 1px solid #e6e6e6;
  border-radius: 0.6rem;
  padding: 0.6rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}
.card__title {
  font-weight: 600;
  margin-bottom: 0.4rem;
  word-break: break-word;
}
.card__actions {
  display: flex;
  gap: 0.4rem;
  align-items: center;
  flex-wrap: wrap;
}
.card__actions button,
.card__actions select {
  padding: 0.35rem 0.5rem;
  border-radius: 0.4rem;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
}
.card__actions .danger {
  border-color: #ef4444;
  color: #b91c1c;
}
.card__actions button:hover {
  background: #f3f4f6;
}
@media (max-width: 900px) {
  .board {
    grid-template-columns: 1fr;
  }
}
</style>

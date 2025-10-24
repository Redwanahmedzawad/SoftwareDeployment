<template>
  <section class="board">
    <div class="col" v-for="col in columns" :key="col.key" :data-status="col.key">
      <header class="col__header">
        <h2>{{ col.title }}</h2>
        <small>{{ filtered(col.key).length }}</small>
      </header>

      <ul class="col__list">
        <li v-for="t in filtered(col.key)" :key="t.id" class="card">
          <div v-if="editingTaskId === t.id" class="card__edit">
            <input
              v-model="editingTitle"
              @keydown.enter="saveEdit(t)"
              @keydown.esc="cancelEdit"
              class="edit-input"
              ref="editInput"
              autofocus
            />
            <div class="edit-actions">
              <button @click="saveEdit(t)" class="save-btn" title="Save">
                ✓
              </button>
              <button @click="cancelEdit" class="cancel-btn" title="Cancel">
                ✕
              </button>
            </div>
          </div>

          <div v-else class="card__content">
            <div class="card__title-row">
              <div class="card__title" :title="t.title">{{ t.title }}</div>
              <button @click="startEdit(t)" class="edit-btn" title="Edit task">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                </svg>
              </button>
            </div>

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
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref, nextTick } from "vue";
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

const editingTaskId = ref<number | null>(null);
const editingTitle = ref("");
const editInput = ref<HTMLInputElement | null>(null);

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

function startEdit(task: TaskItem) {
  editingTaskId.value = task.id;
  editingTitle.value = task.title;
  nextTick(() => {
    if (editInput.value) {
      editInput.value.focus();
      editInput.value.select();
    }
  });
}

function saveEdit(task: TaskItem) {
  if (editingTitle.value.trim()) {
    const updatedTask = { ...task, title: editingTitle.value.trim() };
    emitUpdate(updatedTask);
  }
  cancelEdit();
}

function cancelEdit() {
  editingTaskId.value = null;
  editingTitle.value = "";
}
</script>

<style scoped>
.board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
}

.col {
  background: white;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  min-height: 200px;
  position: relative;
}

/* To-Do Column - Blue */
.col[data-status="todo"] {
  background: linear-gradient(to bottom, #eff6ff 0%, #ffffff 100%);
  border-top: 3px solid #3b82f6;
}

.col[data-status="todo"] .col__header h2 {
  color: #1e40af;
}

.col[data-status="todo"] .col__header small {
  background: #dbeafe;
  color: #1e40af;
}

/* Doing Column - Orange/Amber */
.col[data-status="doing"] {
  background: linear-gradient(to bottom, #fffbeb 0%, #ffffff 100%);
  border-top: 3px solid #f59e0b;
}

.col[data-status="doing"] .col__header h2 {
  color: #b45309;
}

.col[data-status="doing"] .col__header small {
  background: #fef3c7;
  color: #b45309;
}

/* Done Column - Green */
.col[data-status="done"] {
  background: linear-gradient(to bottom, #f0fdf4 0%, #ffffff 100%);
  border-top: 3px solid #10b981;
}

.col[data-status="done"] .col__header h2 {
  color: #047857;
}

.col[data-status="done"] .col__header small {
  background: #d1fae5;
  color: #047857;
}

.col__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #f1f5f9;
}

.col__header h2 {
  font-size: 1.125rem;
  font-weight: 600;
}

.col__header small {
  padding: 0.25rem 0.625rem;
  border-radius: 9999px;
  font-size: 0.75rem;
  font-weight: 600;
}

.col__list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}

.card {
  background: #fefefe;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.75rem;
  padding: 1rem;
  transition: all 0.2s ease;
}

.card:hover {
  border-color: #cbd5e1;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transform: translateY(-2px);
}

.card__content {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card__title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.card__title {
  font-weight: 600;
  font-size: 0.9375rem;
  color: #1e293b;
  word-break: break-word;
  line-height: 1.5;
  flex: 1;
}

.edit-btn {
  padding: 0.25rem;
  border: none;
  background: transparent;
  color: #64748b;
  cursor: pointer;
  border-radius: 0.375rem;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: none;
}

.edit-btn:hover {
  background: #f1f5f9;
  color: #4f46e5;
  transform: none;
  box-shadow: none;
}

.edit-btn svg {
  display: block;
}

.card__edit {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.edit-input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  border: 1.5px solid #4f46e5;
  border-radius: 0.5rem;
  font-size: 0.9375rem;
  font-weight: 600;
  color: #1e293b;
  background: white;
  transition: all 0.2s ease;
  font-family: inherit;
  line-height: 1.5;
}

.edit-input:focus {
  outline: none;
  border-color: #4338ca;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
}

.edit-actions {
  display: flex;
  gap: 0.5rem;
}

.save-btn,
.cancel-btn {
  flex: 1;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.save-btn {
  background: #10b981;
  color: white;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.save-btn:hover {
  background: #059669;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transform: translateY(-1px);
}

.cancel-btn {
  background: #f1f5f9;
  color: #64748b;
  box-shadow: none;
}

.cancel-btn:hover {
  background: #e2e8f0;
  color: #475569;
  box-shadow: none;
  transform: none;
}

.card__actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  flex-wrap: wrap;
}

.card__actions button {
  padding: 0.375rem 0.625rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  font-weight: 500;
  box-shadow: none;
}

.card__actions button:hover {
  background: #e2e8f0;
  border-color: #cbd5e1;
  color: #1e293b;
  transform: none;
  box-shadow: none;
}

.card__actions button:active {
  transform: scale(0.95);
}

.card__actions select {
  padding: 0.375rem 0.625rem;
  border-radius: 0.375rem;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  color: #475569;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.card__actions select:hover {
  background: white;
  border-color: #cbd5e1;
}

.card__actions select:focus {
  outline: none;
  border-color: #4f46e5;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.card__actions .danger {
  border-color: #fecaca;
  background: #fef2f2;
  color: #dc2626;
}

.card__actions .danger:hover {
  background: #fee2e2;
  border-color: #fca5a5;
  color: #b91c1c;
}

@media (max-width: 900px) {
  .board {
    grid-template-columns: 1fr;
    gap: 1.25rem;
  }
  
  .col {
    min-height: auto;
  }
}
</style>

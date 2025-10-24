<template>
  <main class="app">
    <header class="app-header">
      <h1>Task Buddy</h1>
      <form class="new" @submit.prevent="onAdd">
        <input v-model.trim="newTitle" placeholder="Add a task..." required />
        <button type="submit">Add</button>
      </form>
    </header>
    
    <div class="filters">
      <div class="search-box">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search tasks..." 
          class="search-input"
        />
      </div>
      
      <div class="filter-box">
        <label for="status-filter">Filter:</label>
        <select id="status-filter" v-model="statusFilter" class="filter-select">
          <option value="all">All Tasks</option>
          <option value="todo">To-Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
      </div>
      
      <div class="results-count" v-if="searchQuery || statusFilter !== 'all'">
        {{ filteredTasks.length }} {{ filteredTasks.length === 1 ? 'task' : 'tasks' }} found
      </div>
    </div>

    <div class="stats-bar">
      <div class="stat-card stat-total">
        <div class="stat-icon">📊</div>
        <div class="stat-info">
          <div class="stat-label">Total Tasks</div>
          <div class="stat-value">{{ taskStats.total }}</div>
        </div>
      </div>

      <div class="stat-card stat-todo">
        <div class="stat-icon">📝</div>
        <div class="stat-info">
          <div class="stat-label">To-Do</div>
          <div class="stat-value">{{ taskStats.todoCount }}</div>
        </div>
      </div>

      <div class="stat-card stat-doing">
        <div class="stat-icon">⚡</div>
        <div class="stat-info">
          <div class="stat-label">In Progress</div>
          <div class="stat-value">{{ taskStats.doingCount }}</div>
        </div>
      </div>

      <div class="stat-card stat-done">
        <div class="stat-icon">✅</div>
        <div class="stat-info">
          <div class="stat-label">Completed</div>
          <div class="stat-value">{{ taskStats.doneCount }}</div>
        </div>
      </div>

      <div class="stat-card stat-completion">
        <div class="stat-icon">📈</div>
        <div class="stat-info">
          <div class="stat-label">Completion Rate</div>
          <div class="stat-value">{{ taskStats.completionRate }}%</div>
        </div>
      </div>
    </div>

    <KanbanBoard
      :tasks="filteredTasks"
      @update="onUpdate"
      @delete="onDelete"
      class="app__board"
    />
  </main>
</template>
<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
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
const searchQuery = ref("");
const statusFilter = ref<"all" | "todo" | "doing" | "done">("all");

const filteredTasks = computed(() => {
  let result = tasks.value;

  // Filter by status
  if (statusFilter.value !== "all") {
    result = result.filter((task) => task.status === statusFilter.value);
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter((task) =>
      task.title.toLowerCase().includes(query)
    );
  }

  return result;
});

const taskStats = computed(() => {
  const total = tasks.value.length;
  const todoCount = tasks.value.filter((t) => t.status === "todo").length;
  const doingCount = tasks.value.filter((t) => t.status === "doing").length;
  const doneCount = tasks.value.filter((t) => t.status === "done").length;
  const completionRate = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  return {
    total,
    todoCount,
    doingCount,
    doneCount,
    completionRate,
  };
});

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
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

.app-header {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem 2rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 2rem;
  align-items: center;
  flex-wrap: wrap;
}

h1 {
  margin: 0;
  color: #1e293b;
  flex-shrink: 0;
}

.new {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  flex: 1;
  min-width: 300px;
}

.new input {
  flex: 1;
  padding: 0.625rem 1rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: #f8fafc;
  color: #1e293b;
  transition: all 0.2s ease;
}

.new input:hover {
  border-color: #cbd5e1;
  background: white;
}

.new input:focus {
  border-color: #4f46e5;
  background: white;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.new input::placeholder {
  color: #94a3b8;
}

.new button {
  padding: 0.625rem 1.5rem;
  white-space: nowrap;
  font-weight: 600;
}

.filters {
  background: white;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: flex;
  gap: 1rem;
  align-items: center;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 250px;
  position: relative;
  display: flex;
  align-items: center;
}

.search-box svg {
  position: absolute;
  left: 0.875rem;
  color: #94a3b8;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.625rem 1rem 0.625rem 2.5rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: #f8fafc;
  color: #1e293b;
  transition: all 0.2s ease;
}

.search-input:hover {
  border-color: #cbd5e1;
  background: white;
}

.search-input:focus {
  border-color: #4f46e5;
  background: white;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.search-input::placeholder {
  color: #94a3b8;
}

.filter-box {
  display: flex;
  align-items: center;
  gap: 0.625rem;
}

.filter-box label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #64748b;
  white-space: nowrap;
}

.filter-select {
  padding: 0.625rem 2rem 0.625rem 0.875rem;
  border: 1.5px solid #e2e8f0;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  background: #f8fafc;
  color: #1e293b;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2364748b' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.625rem center;
}

.filter-select:hover {
  border-color: #cbd5e1;
  background-color: white;
}

.filter-select:focus {
  border-color: #4f46e5;
  background-color: white;
  outline: none;
  box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
}

.results-count {
  font-size: 0.875rem;
  color: #64748b;
  font-weight: 500;
  padding: 0.375rem 0.875rem;
  background: #f1f5f9;
  border-radius: 9999px;
  white-space: nowrap;
}

.stats-bar {
  background: white;
  border-radius: 1rem;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.5rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 1rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  border-radius: 0.75rem;
  transition: all 0.2s ease;
  border: 1.5px solid transparent;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.stat-total {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border-color: #cbd5e1;
}

.stat-todo {
  background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
  border-color: #93c5fd;
}

.stat-doing {
  background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%);
  border-color: #fcd34d;
}

.stat-done {
  background: linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%);
  border-color: #6ee7b7;
}

.stat-completion {
  background: linear-gradient(135deg, #faf5ff 0%, #f3e8ff 100%);
  border-color: #d8b4fe;
}

.stat-icon {
  font-size: 1.75rem;
  line-height: 1;
  flex-shrink: 0;
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.stat-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  line-height: 1;
}

.app__board {
  margin-top: 0;
}

@media (max-width: 768px) {
  .app-header {
    padding: 1.25rem 1.5rem;
    gap: 1.5rem;
  }
  
  .new {
    min-width: 100%;
  }

  .filters {
    padding: 1rem;
  }

  .search-box {
    min-width: 100%;
  }

  .filter-box {
    flex: 1;
  }

  .filter-select {
    flex: 1;
  }

  .stats-bar {
    padding: 1rem;
    grid-template-columns: 1fr;
    gap: 0.75rem;
  }

  .stat-card {
    padding: 0.75rem 0.875rem;
  }
}
</style>

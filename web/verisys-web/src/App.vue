<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import Toolbar from './components/Toolbar.vue'
import TaskForm from './components/TaskForm.vue'
import TaskFilters from './components/TaskFilters.vue'
import TaskStats from './components/TaskStats.vue'
import KanbanBoard from './components/KanbanBoard.vue'
import EditTaskModal from './components/EditTaskModal.vue'
import { Toaster, toast } from 'vue-sonner'

import { getTasks, createTask, updateTask, deleteTask, type Status, type Priority, type Task as ServiceTask } from './services/tasks'
type Task = ServiceTask

const form = ref<InstanceType<typeof TaskForm> | null>(null)

const tasks = ref<Task[]>([])
const filters = ref({ query: '', status: 'all' as 'all'|Status, priority: 'all' as 'all'|Priority })

// EDIT state
const editOpen = ref(false)
const editingTask = ref<Task|null>(null)
function beginEdit(t: Task) { editingTask.value = t; editOpen.value = true }
async function saveEdit(fields: Partial<Pick<Task, 'title' | 'status' | 'priority'>>) {
  if (!editingTask.value) return
  const t = editingTask.value
  const snapshot = { ...t }

  // merge changes locally first (optimistic)
  Object.assign(t, fields)

  try {
    // ✅ send priority as well
    await updateTask(t.id, {
      title: t.title,
      status: t.status,
      priority: t.priority,   // <-- include this
    })
    toast.success('Changes saved')
  } catch (e: any) {
    // rollback on error & show real message
    Object.assign(t, snapshot)
    toast.error(e?.message || 'Save failed')
    console.error(e)
  } finally {
    editOpen.value = false
  }
}


onMounted(async () => {
  try {
    tasks.value = await getTasks()
  } catch (e) {
    toast.error('Failed to load tasks'); console.error(e)
  }
})

function applyFilters(source: Task[]) {
  return source.filter(t => {
    if (filters.value.status !== 'all' && t.status !== filters.value.status) return false
    if (filters.value.priority !== 'all' && (t.priority ?? 'medium') !== filters.value.priority) return false
    if (filters.value.query && !t.title.toLowerCase().includes(filters.value.query.toLowerCase())) return false
    return true
  })
}

const todo  = computed(()=> applyFilters(tasks.value.filter(t=>t.status==='todo')))
const doing = computed(()=> applyFilters(tasks.value.filter(t=>t.status==='doing')))
const done  = computed(()=> applyFilters(tasks.value.filter(t=>t.status==='done')))

async function handleAdd(payload: { title:string; status:Status; priority:Priority }) {
  const optimistic: Task = { id: Date.now(), ...payload }
  tasks.value.unshift(optimistic)
  try {
    const created = await createTask({ title: payload.title, status: payload.status })
    const idx = tasks.value.findIndex(t=>t.id===optimistic.id)
    if (idx >= 0) tasks.value[idx].id = created.id
    toast.success('Task created')
  } catch (e) {
    tasks.value = tasks.value.filter(t=>t.id!==optimistic.id)
    toast.error('Create failed'); console.error(e)
  }
}

async function handleToggle(t: Task) {
  const prev = t.status
  t.status = t.status==='done' ? 'todo' : 'done'
  try {
    await updateTask(t.id, { title: t.title, status: t.status })
    toast.success('Task updated')
  } catch (e) {
    t.status = prev
    toast.error('Update failed'); console.error(e)
  }
}

async function handleDelete(t: Task) {
  const snapshot = tasks.value.slice()
  tasks.value = tasks.value.filter(x=>x.id!==t.id)
  try {
    await deleteTask(t.id)
    toast.success('Task deleted')
  } catch (e) {
    tasks.value = snapshot
    toast.error('Delete failed'); console.error(e)
  }
}
</script>

<template>
  <main style="max-width:1100px; margin: 2rem auto; padding: 0 1rem;">
    <Toolbar @add="form?.focus()" />
    <TaskForm ref="form" @submit="handleAdd" />

    <div style="height:1rem"></div>
    <TaskFilters v-model="filters" />

    <div style="height:1rem"></div>
    <TaskStats :total="tasks.length" :done="tasks.filter(t=>t.status==='done').length" />

    <div style="height:1rem"></div>
    <KanbanBoard
      :todo="todo" :doing="doing" :done="done"
      @toggle="handleToggle"
      @delete="handleDelete"
      @edit="beginEdit"
    />

    <!-- Edit modal -->
    <EditTaskModal v-model:open="editOpen" :task="editingTask" @save="saveEdit" />

    <Toaster richColors position="top-right" />
  </main>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue'
import Button from './ui/Button.vue'

const emit = defineEmits<{
  (e: 'submit', payload: {
    title: string
    status: 'todo' | 'doing' | 'done'
    priority: 'low' | 'medium' | 'high'
  }): void
}>()

const title = ref('')
const status = ref<'todo' | 'doing' | 'done'>('todo')
const priority = ref<'low' | 'medium' | 'high'>('medium')

const titleEl = ref<HTMLInputElement | null>(null)
function focus() { titleEl.value?.focus() }
defineExpose({ focus })

function onSubmit() {
  if (!title.value.trim()) return
  emit('submit', {
    title: title.value.trim(),
    status: status.value,
    priority: priority.value,
  })
  title.value = ''
  nextTick(() => titleEl.value?.focus())
}
</script>

<template>
  <form class="u-grid u-grid-gap" @submit.prevent="onSubmit">
    <input ref="titleEl" class="input" v-model="title" placeholder="Task title" />
    <div class="u-flex u-gap-3">
      <select class="input" v-model="status">
        <option value="todo">To-do</option>
        <option value="doing">In progress</option>
        <option value="done">Completed</option>
      </select>
      <select class="input" v-model="priority">
        <option>low</option>
        <option>medium</option>
        <option>high</option>
      </select>
      <Button type="submit">Add</Button>
    </div>
  </form>
</template>

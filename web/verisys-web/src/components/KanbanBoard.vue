<script setup lang="ts">
import TaskCard from './TaskCard.vue'
export type Status = 'todo'|'doing'|'done'
export type Priority = 'low'|'medium'|'high'
export interface Task { id:number; title:string; status:Status; priority?:Priority }

const props = defineProps<{ todo: Task[]; doing: Task[]; done: Task[] }>()
const emit = defineEmits<{
  (e:'toggle', t:Task):void;
  (e:'delete', t:Task):void;
  (e:'edit', t:Task):void;        // ⬅️ simplified: send the task only
}>()
</script>

<template>
  <div class="u-grid u-grid-gap" style="grid-template-columns: repeat(3, minmax(0,1fr));">
    <section>
      <h3 class="u-text-muted" style="margin-bottom:.5rem;">To-do</h3>
      <div class="u-grid u-grid-auto u-grid-gap">
        <TaskCard v-for="t in props.todo" :key="t.id"
          :title="t.title" :status="t.status" :priority="t.priority ?? 'medium'"
          @toggle="emit('toggle', t)"
          @delete="emit('delete', t)"
          @edit="emit('edit', t)" />    <!-- ⬅️ pass the task -->
      </div>
    </section>

    <section>
      <h3 class="u-text-muted" style="margin-bottom:.5rem;">In progress</h3>
      <div class="u-grid u-grid-auto u-grid-gap">
        <TaskCard v-for="t in props.doing" :key="t.id"
          :title="t.title" :status="t.status" :priority="t.priority ?? 'medium'"
          @toggle="emit('toggle', t)"
          @delete="emit('delete', t)"
          @edit="emit('edit', t)" />
      </div>
    </section>

    <section>
      <h3 class="u-text-muted" style="margin-bottom:.5rem;">Completed</h3>
      <div class="u-grid u-grid-auto u-grid-gap">
        <TaskCard v-for="t in props.done" :key="t.id"
          :title="t.title" :status="t.status" :priority="t.priority ?? 'medium'"
          @toggle="emit('toggle', t)"
          @delete="emit('delete', t)"
          @edit="emit('edit', t)" />
      </div>
    </section>
  </div>
</template>

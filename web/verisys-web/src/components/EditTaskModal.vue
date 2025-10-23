<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import Button from './ui/Button.vue'

type Status = 'todo'|'doing'|'done'
type Priority = 'low'|'medium'|'high'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ task: { id:number; title:string; status:Status; priority?:Priority } | null }>()

const title = ref('')
const status = ref<Status>('todo')
const priority = ref<Priority>('medium')
const titleEl = ref<HTMLInputElement|null>(null)

watch(() => props.task, (t) => {
  if (!t) return
  title.value = t.title
  status.value = t.status
  priority.value = t.priority ?? 'medium'
  if (open.value) nextTick(() => titleEl.value?.focus())
}, { immediate: true })

const canSave = computed(() => title.value.trim().length > 0)

const emit = defineEmits<{ (e:'save', fields:{ title:string; status:Status; priority:Priority }): void }>()
function onSave() {
  if (!canSave.value) return
  emit('save', { title: title.value.trim(), status: status.value, priority: priority.value })
  open.value = false
}
function onClose(){ open.value = false }
</script>

<template>
  <teleport to="body">
    <div v-if="open" style="position:fixed; inset:0; display:grid; place-items:center; background:rgba(0,0,0,.35); z-index:50;">
      <div class="card" style="width:min(520px, 92vw); padding:1rem;">
        <h3 style="font-weight:700; font-size:1.1rem; margin-bottom:.75rem;">Edit Task</h3>

        <div class="u-grid u-grid-gap">
          <input ref="titleEl" class="input" v-model="title" placeholder="Task title" />
          <div class="u-flex u-gap-3">
            <select class="input" v-model="status">
              <option value="todo">To-do</option>
              <option value="doing">In progress</option>
              <option value="done">Completed</option>
            </select>
            <select class="input" v-model="priority">
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
          </div>
        </div>

        <div class="u-flex u-gap-3" style="justify-content:flex-end; margin-top:1rem;">
          <Button variant="ghost" @click="onClose">Cancel</Button>
          <Button :disabled="!canSave" @click="onSave">Save changes</Button>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import Card from './ui/Card.vue';
import Badge from './ui/Badge.vue';
import Button from './ui/Button.vue';
import { CheckCircle2, Pencil, Trash2 } from 'lucide-vue-next';
const emit = defineEmits<{ (e:'edit'):void; (e:'delete'):void; (e:'toggle'):void }>();
const props = defineProps<{ title: string; status: 'todo'|'doing'|'done'; priority: 'low'|'medium'|'high' }>();
function tone(){
  if(props.status==='done') return 'success';
  if(props.status==='doing') return 'warn';
  return 'default';
}
</script>
<template>
  <Card>
    <div style="padding: .9rem; display:grid; grid-template-columns:1fr auto; gap:.5rem; align-items:start;">
      <div>
        <div style="font-weight:600;">{{ props.title }}</div>
        <div class="u-flex u-gap-2" style="margin-top:.5rem;">
          <Badge :tone="tone()">{{ props.status }}</Badge>
          <Badge>{{ props.priority }}</Badge>
        </div>
      </div>
      <div class="u-flex u-gap-2">
        <button class="btn btn-ghost" @click="emit('toggle')" title="Toggle done"><CheckCircle2 :size="18"/></button>
        <button class="btn btn-ghost" @click="emit('edit')" title="Edit"><Pencil :size="18"/></button>
        <button class="btn btn-ghost" @click="emit('delete')" title="Delete"><Trash2 :size="18"/></button>
      </div>
    </div>
  </Card>
</template>

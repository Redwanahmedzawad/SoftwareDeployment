<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ total: number; done: number }>()
const pct = computed(() => (props.total ? Math.round((props.done / props.total) * 100) : 0))
</script>

<template>
  <div class="card" style="padding:1rem;">
    <div class="u-flex u-gap-3" style="justify-content:space-between; align-items:center;">
      <div>
        <div class="u-text-muted" style="font-size:.85rem;">Progress</div>
        <div style="font-weight:700; font-size:1.25rem;">{{ pct }}%</div>
      </div>
      <div>{{ props.done }} / {{ props.total }} done</div>
    </div>
    <div style="margin-top:.75rem;">
      <div class="progress"><span :style="{ '--value': pct + '%' }"></span></div>
    </div>
  </div>
</template>

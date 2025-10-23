<script setup lang="ts">
const props = withDefaults(defineProps<{ tone?: 'success'|'warn'|'danger'|'default' }>(), { tone: 'default' });
</script>
<template>
  <span :class="['badge', props.tone==='success'&&'badge-success', props.tone==='warn'&&'badge-warn', props.tone==='danger'&&'badge-danger']"><slot /></span>
</template>

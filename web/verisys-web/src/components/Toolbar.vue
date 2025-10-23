<script setup lang="ts">
import ThemeToggle from './ThemeToggle.vue';
import Button from './ui/Button.vue';
const emit = defineEmits<{ (e:'add'):void }>();
</script>
<template>
  <div class="u-flex u-gap-3" style="justify-content:space-between; align-items:center; margin-bottom:1rem;">
    <div style="font-size:1.5rem; font-weight:800;">Task Manager</div>
    <div class="u-flex u-gap-3">
      <Button variant="outline" @click="emit('add')">Add task</Button>
      <ThemeToggle />
    </div>
  </div>
</template>

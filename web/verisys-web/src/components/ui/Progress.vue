<script setup lang="ts">
const props = defineProps<{ value: number }>();
</script>
<template>
  <div class="progress"><span :style="{ '--value': props.value + '%' }"></span></div>
</template>

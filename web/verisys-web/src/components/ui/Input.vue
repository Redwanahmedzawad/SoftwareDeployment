<script setup lang="ts">
const model = defineModel<string>('modelValue');
const props = withDefaults(defineProps<{ placeholder?: string; type?: string }>(), { type: 'text' });
</script>
<template>
  <input class="input" :type="props.type" v-model="model" :placeholder="props.placeholder" />
</template>

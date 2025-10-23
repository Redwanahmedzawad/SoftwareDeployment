<script setup lang="ts">
import { applyTheme, getInitialTheme } from '../lib/theme';
import { Sun, Moon } from 'lucide-vue-next';
import { ref, onMounted } from 'vue';
const theme = ref<'light'|'dark'>(getInitialTheme());
onMounted(()=> applyTheme(theme.value));
function toggle(){ theme.value = theme.value==='light' ? 'dark':'light'; applyTheme(theme.value); }
</script>
<template>
  <button class="btn btn-outline" @click="toggle" aria-label="Toggle theme">
    <Sun v-if="theme==='light'" :size="18" class="u-text-muted" />
    <Moon v-else :size="18" class="u-text-muted" />
  </button>
</template>

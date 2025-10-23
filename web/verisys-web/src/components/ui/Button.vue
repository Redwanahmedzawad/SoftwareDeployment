<script setup lang="ts">
import { cn } from '../../lib/cn';
const props = withDefaults(defineProps<{ variant?: 'primary' | 'outline' | 'ghost'; type?: 'button'|'submit'|'reset'; disabled?: boolean }>(), { variant: 'primary', type: 'button' });
</script>
<template>
  <button :type="props.type" :disabled="props.disabled" :class="cn('btn',
    props.variant==='primary'&&'btn-primary', props.variant==='outline'&&'btn-outline', props.variant==='ghost'&&'btn-ghost')">
    <slot></slot>
  </button>
</template>

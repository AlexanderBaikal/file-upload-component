<script setup lang="ts">
import type { SpinnerProps } from '@/types/ui'

withDefaults(defineProps<SpinnerProps>(), {
  size: 'medium',
})
</script>

<template>
  <span :class="['spinner', `spinner--${size}`]" :aria-label="label" role="status" />
</template>

<style scoped>
.spinner {
  display: inline-block;
  border: 2px solid var(--border-color);
  border-top-color: var(--theme);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

.spinner--small {
  width: 12px;
  height: 12px;
  border-width: 1.5px;
}

.spinner--medium {
  width: 16px;
  height: 16px;
  border-width: 2px;
}

.spinner--large {
  width: 24px;
  height: 24px;
  border-width: 3px;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<script setup lang="ts">
import type { ButtonProps } from '@/types/ui'

withDefaults(defineProps<ButtonProps>(), {
  type: 'button',
  variant: 'default',
  size: 'medium',
})
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :class="['button', `button--${variant}`, `button--${size}`]"
  >
    <slot />
  </button>
</template>

<style scoped>
.button {
  font-family: inherit;
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-md);
  cursor: pointer;
  transition: all var(--transition-base);
  white-space: nowrap;
  border: 1px solid transparent;
}

.button--default {
  background-color: var(--button-bg);
  border-color: var(--border-color);
  color: var(--text-primary);
}

.button--default:hover:not(:disabled) {
  background-color: var(--button-bg-hover);
  border-color: var(--border-hover);
}

.button--default:active:not(:disabled) {
  background-color: var(--button-bg-active);
}

.button--small {
  padding: 6px 12px;
  font-size: var(--text-sm);
}

.button--medium {
  padding: 10px 16px;
  font-size: var(--text-base);
}

.button--large {
  padding: 12px 20px;
  font-size: var(--text-lg);
}

.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button:focus-visible {
  outline: 2px solid var(--border-focus);
  outline-offset: 2px;
}
</style>

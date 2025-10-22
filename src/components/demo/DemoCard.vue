<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="demo-card">
    <h3 v-if="title" class="card-title">{{ title }}</h3>
    <slot />
  </div>
</template>

<style scoped>
.demo-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
}

.card-title {
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-secondary);
}
</style>

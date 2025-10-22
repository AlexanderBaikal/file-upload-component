<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <section class="demo-section">
    <h2 class="section-title">{{ title }}</h2>
    <slot />
  </section>
</template>

<style scoped>
.demo-section {
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  padding: var(--space-2xl);
  margin-bottom: var(--space-2xl);
  box-shadow: var(--shadow-md);
}

.section-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-xl);
  color: var(--bg-dark);
}
</style>

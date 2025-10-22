<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <div class="api-docs">
    <h2 v-if="title" class="api-title">{{ title }}</h2>

    <section class="api-section">
      <h3>Props</h3>
      <ul class="api-list">
        <li><code>label</code> — текст метки над компонентом</li>
        <li><code>buttonText</code> — текст кнопки выбора файла (по умолчанию: "Выбрать файл")</li>
        <li>
          <code>placeholder</code> — текст когда файл не выбран (по умолчанию: "Файл не выбран")
        </li>
        <li><code>hintText</code> — текст подсказки под компонентом</li>
        <li><code>errorMessage</code> — текст ошибки (если есть, отображается красным)</li>
        <li><code>accept</code> — принимаемые типы файлов (например, "image/*,application/pdf")</li>
        <li><code>multiple</code> — разрешить множественный выбор (по умолчанию: false)</li>
        <li><code>disabled</code> — заблокировать компонент</li>
        <li><code>loading</code> — показать состояние загрузки</li>
        <li><code>fileName</code> — имя загруженного файла (для контролируемого состояния)</li>
      </ul>
    </section>

    <section class="api-section">
      <h3>Events</h3>
      <ul class="api-list">
        <li><code>@change</code> — эмитится при выборе файла, передает массив File[]</li>
        <li><code>@update:fileName</code> — эмитится при изменении имени файла</li>
        <li><code>@clear</code> — эмитится при очистке файла</li>
        <li><code>@cancel</code> — эмитится при отмене (только FileInputWithCancel)</li>
      </ul>
    </section>

    <section class="api-section">
      <h3>Методы (через ref)</h3>
      <ul class="api-list">
        <li><code>clearFile()</code> — очистить выбранный файл</li>
        <li><code>openFileDialog()</code> — открыть диалог выбора файла программно</li>
      </ul>
    </section>
  </div>
</template>

<style scoped>
.api-docs {
  font-size: var(--text-sm);
  line-height: 1.6;
}

.api-title {
  font-size: var(--text-2xl);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-xl);
  color: var(--bg-dark);
}

.api-section {
  margin-bottom: var(--space-xl);
}

.api-section:last-child {
  margin-bottom: 0;
}

.api-section h3 {
  font-size: var(--text-lg);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-md);
  color: var(--bg-dark);
}

.api-list {
  list-style: none;
  padding-left: 0;
}

.api-list li {
  padding: var(--space-sm) 0;
  border-bottom: 1px solid var(--border-color);
}

.api-list li:last-child {
  border-bottom: none;
}

.api-list code {
  background-color: var(--bg-tertiary);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  font-family: 'Courier New', monospace;
  font-size: var(--text-sm);
  color: var(--text-code);
}
</style>

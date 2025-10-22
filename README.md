# File Upload Component

Компонент загрузки файлов для Vue 3 + TypeScript

## Установка и запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:5173 — откроется демо со всеми вариантами компонента.

## Использование

### Базовый пример

```vue
<template>
  <FileInput
    label="Выберите файл"
    @change="handleFileChange"
  />
</template>

<script setup lang="ts">
import FileInput from '@/components/ui/FileInput.vue'

const handleFileChange = (files: File[]) => {
  console.log('Выбран файл:', files[0])
}
</script>
```

### С валидацией и загрузкой

```vue
<template>
  <FileInput
    label="Загрузите документ"
    button-text="Выбрать"
    :file-name="fileName"
    :loading="isLoading"
    :error-message="error"
    @change="uploadFile"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileInput from '@/components/ui/FileInput.vue'

const fileName = ref('')
const isLoading = ref(false)
const error = ref('')

const uploadFile = async (files: File[]) => {
  const file = files[0]

  if (file.size > 5 * 1024 * 1024) {
    error.value = 'Файл слишком большой'
    return
  }

  fileName.value = file.name
  isLoading.value = true

  // Логика загрузки
}
</script>
```

### С кнопкой отмены

```vue
<template>
  <FileInputWithCancel
    :file-name="fileName"
    @change="handleChange"
    @cancel="fileName = ''"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileInputWithCancel from '@/components/ui/FileInputWithCancel.vue'

const fileName = ref('')

const handleChange = (files: File[]) => {
  fileName.value = files[0].name
}
</script>
```

## Props

| Prop | Тип | По умолчанию | Описание |
|------|-----|--------------|----------|
| `label` | `string` | — | Текст метки |
| `buttonText` | `string` | `'Выбрать файл'` | Текст кнопки |
| `placeholder` | `string` | `'Файл не выбран'` | Текст когда файл не выбран |
| `hintText` | `string` | — | Подсказка |
| `errorMessage` | `string` | — | Текст ошибки |
| `accept` | `string` | — | Типы файлов (напр. `"image/*"`) |
| `multiple` | `boolean` | `false` | Множественный выбор |
| `disabled` | `boolean` | `false` | Заблокировать |
| `loading` | `boolean` | `false` | Загрузка |
| `fileName` | `string` | — | Имя файла (контролируемое состояние) |
| `ariaLabel` | `string` | — | Кастомная ARIA метка |
| `id` | `string` | — | Кастомный ID элемента |

## Events

| Event | Параметры | Описание |
|-------|-----------|----------|
| `@change` | `files: File[]` | Выбран файл |
| `@update:fileName` | `fileName: string` | Изменилось имя |
| `@clear` | — | Очищен |
| `@cancel` | — | Отменён (WithCancel) |

## Методы

```vue
<template>
  <FileInput ref="inputRef" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FileInput from '@/components/ui/FileInput.vue'

const inputRef = ref()

// Очистить файл
inputRef.value?.clearFile()

// Открыть диалог
inputRef.value?.openFileDialog()
</script>
```

## Скрипты разработки

```bash
# Разработка
npm run dev

# Сборка
npm run build

# Проверка типов
npm run type-check

# Линтинг
npm run lint
npm run lint:fix

# Форматирование
npm run format
npm run format:fix
```

## Архитектура

### CSS переменные

Проект использует глобальные CSS переменные в `src/assets/css/main.css`:

```css
:root {
  --theme: #646cff;
  --error-red: #ef4444;
  --border-color: #e0e0e0;
  /* ... и другие */
}
```

### TypeScript

Все типы определены в `src/types/`:
- `ui.ts` — типы UI компонентов

Импорт типов:

```typescript
import type { FileInputProps, FileInputEmits } from '@/types/ui'
```

### UI Kit

Все переиспользуемые компоненты находятся в `src/components/ui/`:
- `FileInput.vue` — базовый компонент загрузки файлов
- `FileInputWithCancel.vue` — с кнопкой отмены/удаления
- `Button.vue` — универсальная кнопка
- `Spinner.vue` — индикатор загрузки

Импорт компонентов:

```typescript
import FileInput from '@/components/ui/FileInput.vue'
import FileInputWithCancel from '@/components/ui/FileInputWithCancel.vue'
import Button from '@/components/ui/Button.vue'
import Spinner from '@/components/ui/Spinner.vue'
```

### Path Alias

Проект использует alias `@` для импортов:

```typescript
import FileInput from '@/components/ui/FileInput.vue'
import type { FileInputProps } from '@/types/ui'
import '@/assets/css/main.css'
```

## Accessibility

- Навигация с клавиатуры (Tab, Enter, Space)
- ARIA-атрибуты
- Фокус-индикаторы
- Поддержка high contrast mode

## Технологии

- Vue 3 (Composition API)
- TypeScript
- Vite
- vite-svg-loader (SVG как компоненты)
- ESLint + Prettier
- Чистый CSS с переменными

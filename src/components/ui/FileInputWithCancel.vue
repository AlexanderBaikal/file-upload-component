<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import Button from '@/components/ui/Button.vue'
import Spinner from '@/components/ui/Spinner.vue'
import type { FileInputWithCancelProps, FileInputWithCancelEmits } from '@/types/ui'

const props = withDefaults(defineProps<FileInputWithCancelProps>(), {
  buttonText: 'Выбрать файл',
  cancelButtonText: 'Отменить',
  placeholder: 'Файл не выбран',
  multiple: false,
  disabled: false,
  loading: false,
  showCancelButton: true,
})

const emit = defineEmits<FileInputWithCancelEmits>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const isFocused = ref(false)
const internalFileName = ref('')

const inputId = computed(
  () => props.id || `file-input-${Math.random().toString(36).substring(2, 11)}`
)
const hintTextId = computed(() => `${inputId.value}-hint`)
const hasError = computed(() => !!props.errorMessage)
const hasFile = computed(() => !!(props.fileName || internalFileName.value))

const currentButtonText = computed(() => {
  if (hasFile.value && props.showCancelButton) {
    return props.cancelButtonText
  }
  return props.buttonText
})

const displayText = computed(() => {
  if (props.loading) return props.fileName || internalFileName.value
  return props.fileName || internalFileName.value || props.placeholder
})

const getButtonAriaLabel = () => {
  if (hasFile.value && props.showCancelButton) {
    return `${props.cancelButtonText} файл ${props.fileName || internalFileName.value}`
  }
  return props.fileName ? `Выбран файл ${props.fileName}. ${props.buttonText}` : props.buttonText
}

const openFileDialog = () => {
  if (props.disabled || props.loading) return
  fileInputRef.value?.click()
}

const clearFile = () => {
  if (fileInputRef.value) {
    fileInputRef.value.value = ''
  }
  internalFileName.value = ''
  emit('update:fileName', '')
  emit('clear')
  emit('cancel')
}

const handleButtonClick = () => {
  if (hasFile.value && props.showCancelButton) {
    clearFile()
  } else {
    openFileDialog()
  }
}

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = Array.from(target.files || [])

  if (files.length > 0) {
    const fileName = props.multiple ? `Выбрано файлов: ${files.length}` : files[0].name

    internalFileName.value = fileName
    emit('update:fileName', fileName)
    emit('change', files)
  }
}

watch(
  () => props.fileName,
  (newValue) => {
    if (newValue === '' && fileInputRef.value) {
      fileInputRef.value.value = ''
      internalFileName.value = ''
    }
  }
)

defineExpose({
  clearFile,
  openFileDialog,
})
</script>

<template>
  <div class="file-input-wrapper">
    <label v-if="label" :for="inputId" class="file-input-label">
      {{ label }}
    </label>

    <div class="file-input-container">
      <input
        :id="inputId"
        ref="fileInputRef"
        type="file"
        :accept="accept"
        :multiple="multiple"
        :disabled="disabled || loading"
        class="file-input-hidden"
        :aria-label="ariaLabel || label || 'Выбрать файл'"
        :aria-invalid="hasError"
        :aria-describedby="hintTextId"
        @change="handleFileChange"
        @focus="isFocused = true"
        @blur="isFocused = false"
      />

      <Button
        :disabled="disabled || loading"
        :aria-label="getButtonAriaLabel()"
        @click="handleButtonClick"
        @keydown.enter.prevent="handleButtonClick"
        @keydown.space.prevent="handleButtonClick"
      >
        {{ currentButtonText }}
      </Button>

      <span
        class="file-input-filename"
        :class="{ 'file-input-filename--loading': loading }"
        aria-live="polite"
      >
        <Spinner v-if="loading" label="Загрузка" />
        {{ displayText }}
      </span>
    </div>

    <div
      v-if="hintText || errorMessage"
      :id="hintTextId"
      :class="['file-input-hint', { 'file-input-hint--error': hasError }]"
      role="alert"
      :aria-live="hasError ? 'assertive' : 'polite'"
    >
      {{ errorMessage || hintText }}
    </div>
  </div>
</template>

<style scoped>
.file-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
}

.file-input-label {
  font-size: var(--text-base);
  font-weight: var(--font-weight-medium);
  color: var(--text-primary);
  line-height: 20px;
}

.file-input-container {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.file-input-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  clip-path: inset(50%);
  border: 0;
}

.file-input-filename {
  font-size: var(--text-base);
  line-height: 20px;
  color: var(--text-disabled);
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.file-input-filename--loading {
  color: var(--text-primary);
}

.file-input-hint {
  font-size: var(--text-xs);
  line-height: 16px;
  color: var(--text-secondary);
}

.file-input-hint--error {
  color: var(--error-red);
}
</style>

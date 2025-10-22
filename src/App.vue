<script setup lang="ts">
import { ref } from 'vue'
import FileInput from '@/components/ui/FileInput.vue'
import FileInputWithCancel from '@/components/ui/FileInputWithCancel.vue'
import Button from '@/components/ui/Button.vue'
import DemoSection from '@/components/demo/DemoSection.vue'
import DemoCard from '@/components/demo/DemoCard.vue'
import DemoGrid from '@/components/demo/DemoGrid.vue'
import ApiDocumentation from '@/components/demo/ApiDocumentation.vue'
import CheckCircleIcon from '@/assets/svg/check-circle.svg'

const selectedFileName = ref('document.pdf')
const interactiveFileName = ref('')
const isUploading = ref(false)
const uploadError = ref('')
const uploadSuccess = ref(false)

const handleFileChange = (files: File[]) => {
  console.log('Files selected:', files)
}

const handleFileSelect = (files: File[]) => {
  if (files.length > 0) {
    selectedFileName.value = files[0].name
  }
}

const handleCancel = () => {
  console.log('File cancelled')
}

const handleInteractiveUpload = (files: File[]) => {
  uploadError.value = ''
  uploadSuccess.value = false

  if (files.length === 0) return

  const file = files[0]

  if (file.size > 5 * 1024 * 1024) {
    uploadError.value = 'Размер файла не должен превышать 5MB'
    return
  }

  if (!file.type.startsWith('image/')) {
    uploadError.value = 'Пожалуйста, выберите изображение'
    return
  }

  interactiveFileName.value = file.name
  isUploading.value = true

  setTimeout(() => {
    isUploading.value = false
    uploadSuccess.value = true
  }, 2000)
}

const handleInteractiveCancel = () => {
  interactiveFileName.value = ''
  isUploading.value = false
  uploadError.value = ''
  uploadSuccess.value = false
}
</script>

<template>
  <div class="app">
    <header class="app-header">
      <CheckCircleIcon class="app-icon" />
      <h1 class="app-title">File Input</h1>
    </header>

    <main class="app-main">
      <DemoSection title="Основные состояния">
        <DemoGrid>
          <DemoCard title="Базовое состояние">
            <FileInput
              label="Label"
              button-text="Выбрать файл"
              placeholder="Файл не выбран"
              hint-text="Hint text"
              @change="handleFileChange"
            />
          </DemoCard>

          <DemoCard title="С выбранным файлом">
            <FileInput
              label="Label"
              button-text="Выбрать"
              hint-text="Hint text"
              :file-name="selectedFileName"
              @change="handleFileSelect"
            />
          </DemoCard>

          <DemoCard title="Заблокированное">
            <FileInput
              label="Label"
              button-text="Выбрать"
              placeholder="Файл не выбран"
              hint-text="Hint text"
              :disabled="true"
            />
          </DemoCard>

          <DemoCard title="Загрузка">
            <FileInput
              label="Label"
              button-text="Отменить"
              file-name="image.png"
              hint-text="Hint text"
              :loading="true"
            />
          </DemoCard>

          <DemoCard title="После загрузки">
            <FileInputWithCancel
              label="Label"
              button-text="Выбрать"
              cancel-button-text="Удалить"
              file-name="image.png"
              hint-text="Hint text"
              @cancel="handleCancel"
              @change="handleFileChange"
            />
          </DemoCard>

          <DemoCard title="Ошибка">
            <FileInput
              label="Label"
              button-text="Выбрать"
              placeholder="Файл не выбран"
              error-message="Error message"
            />
          </DemoCard>
        </DemoGrid>
      </DemoSection>

      <DemoSection title="Варианты кнопок">
        <DemoCard title="File Input Button">
          <div class="button-grid">
            <Button>Button</Button>
            <Button>Button</Button>
            <Button>Button</Button>
            <Button :disabled="true">Button</Button>
          </div>
        </DemoCard>
      </DemoSection>

      <DemoSection title="Интерактивный пример">
        <div class="interactive-demo">
          <FileInputWithCancel
            label="Загрузите изображение"
            button-text="Выбрать файл"
            cancel-button-text="Отменить"
            placeholder="Файл не выбран"
            hint-text="Поддерживаются форматы: JPG, PNG, GIF (макс. 5MB)"
            accept="image/*"
            :file-name="interactiveFileName"
            :loading="isUploading"
            :error-message="uploadError"
            @change="handleInteractiveUpload"
            @cancel="handleInteractiveCancel"
          />

          <div v-if="uploadSuccess" class="success-message" role="status">
            Файл успешно загружен!
          </div>
        </div>
      </DemoSection>

      <DemoSection title="API документация">
        <ApiDocumentation />
      </DemoSection>
    </main>

    <footer class="app-footer">
      <p>Универсальный компонент загрузки файлов для Vue 3 + TypeScript</p>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #1f2937;
  color: white;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.app-icon {
  width: 32px;
  height: 32px;
  color: #818cf8;
}

.app-title {
  font-size: 24px;
  font-weight: 600;
}

.app-main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 48px 32px;
}

.button-grid {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  margin-top: 16px;
}

.interactive-demo {
  max-width: 500px;
}

.success-message {
  margin-top: 16px;
  padding: 12px 16px;
  background-color: #d1fae5;
  color: #065f46;
  border-radius: 8px;
  font-size: 14px;
}

.app-footer {
  background-color: #1f2937;
  color: #9ca3af;
  padding: 24px 32px;
  text-align: center;
  font-size: 14px;
}

@media (max-width: 768px) {
  .app-main {
    padding: 24px 16px;
  }
}
</style>

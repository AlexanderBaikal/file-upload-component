export interface FileInputProps {
  label?: string
  buttonText?: string
  placeholder?: string
  hintText?: string
  errorMessage?: string
  accept?: string
  multiple?: boolean
  disabled?: boolean
  loading?: boolean
  fileName?: string
  ariaLabel?: string
  id?: string
}

export interface FileInputEmits {
  (e: 'change', files: File[]): void
  (e: 'update:fileName', fileName: string): void
  (e: 'clear'): void
}

export interface FileInputWithCancelProps extends FileInputProps {
  cancelButtonText?: string
  showCancelButton?: boolean
}

export interface FileInputWithCancelEmits extends FileInputEmits {
  (e: 'cancel'): void
}

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset'
  variant?: 'default' | 'primary' | 'danger'
  size?: 'small' | 'medium' | 'large'
  disabled?: boolean
}

export interface SpinnerProps {
  size?: 'small' | 'medium' | 'large'
  label?: string
}

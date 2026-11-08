import styles from './Toast.module.css'

interface ToastProps {
  message: string
  isVisible?: boolean
}

export default function Toast({ message, isVisible = true }: ToastProps) {
  const stateClassName = isVisible ? styles.toastEnter : styles.toastExit

  return (
    <div className={`${styles.toast} ${stateClassName}`} role='status' aria-live='polite'>
      {message}
    </div>
  )
}

interface ToastProps {
  message: string
  isVisible?: boolean
}

export default function Toast({ message, isVisible = true }: ToastProps) {
  const stateClassName = isVisible ? 'toast--enter' : 'toast--exit'

  return (
    <div className={`toast ${stateClassName}`} role='status' aria-live='polite'>
      {message}
    </div>
  )
}

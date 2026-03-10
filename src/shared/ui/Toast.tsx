import React from "react"

interface ToastProps {
  message: string
  onClose: () => void
}

export const Toast: React.FC<ToastProps> = ({ message, onClose }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        background: "green",
        color: "white",
        padding: 12,
        borderRadius: 6
      }}
    >
      {message}
      <button onClick={onClose} style={{ marginLeft: 10 }}>
        x
      </button>
    </div>
  )
}
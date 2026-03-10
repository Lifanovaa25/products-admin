import { Navigate } from "react-router-dom"
import { getToken } from "@/shared/lib/auth"
import { ReactNode } from "react"

interface Props {
  children: ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const token = getToken()

  if (!token) {
    return <Navigate to="/login" replace />
  }

  return children
}
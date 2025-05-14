"use client"

import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/auth-context"

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />
}

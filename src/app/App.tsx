import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { ProtectedRoute } from "./providers/router/ProtectedRoute"

import { LoginPage } from "@/pages/login-page/ui/LoginPage"
import { ProductsPage } from "@/pages/products-page/ui/ProductsPage"
import { getToken } from "@/shared/lib/storage"
import 'normalize.css';
import '@/styles/global.scss'
import '@/styles/variables.scss'
import '@/styles/fonts.scss'

export const App = () => {
  const token = getToken()

  return (
    <BrowserRouter>
      <Routes>

        {/* login */}
        <Route
          path="/login"
          element={!token ? <LoginPage /> : <Navigate to="/products" />}
        />

        {/* protected */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductsPage />
            </ProtectedRoute>
          }
        />

        {/* default */}
        <Route
          path="*"
          element={<Navigate to={token ? "/products" : "/login"} />}
        />

      </Routes>
    </BrowserRouter>
  )
}
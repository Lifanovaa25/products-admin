import React from "react";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";

import { ProtectedRoute } from "./ProtectedRoute";
import { LoginPage } from "@/pages/login-page/ui/LoginPage";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/products",
    element: (
      <ProtectedRoute>
        <div></div>
        {/* <ProductsPage /> */}
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/products" replace />
  }
]);

export const AppRouter = () => <RouterProvider router={router} />;
## Technology Stack Justification

### React 18

React 18 was chosen as the main UI library because it is the current industry standard for building scalable frontend applications. It provides modern features such as concurrent rendering and an efficient component-based architecture, which simplifies the development of complex interfaces like admin panels with tables and forms.

### TypeScript

TypeScript was used to ensure strict type safety and improve maintainability of the codebase. Strong typing reduces runtime errors, improves IDE support, and makes the application easier to scale and refactor.

### Vite

Vite was used as the build tool because it provides extremely fast development startup and hot module replacement compared to traditional bundlers. It is well-suited for modern React + TypeScript projects.

### React Router

React Router is used for client-side routing to manage navigation between the login page and the products page. It is the most widely used routing solution in React applications.

### Axios

Axios was selected for HTTP requests because it provides a clean API, automatic JSON handling, request/response interceptors, and better error handling compared to the native Fetch API.

### React Query (TanStack Query)

React Query was chosen for server-state management. It simplifies data fetching, caching, loading states, and synchronization with the API. This is particularly useful when working with lists of products and search queries.

### React Hook Form

React Hook Form was used for form handling because it provides excellent performance, minimal re-renders, and easy integration with validation libraries.

### Zod

Zod was chosen for schema-based validation. It integrates well with React Hook Form and ensures strict validation rules for user input.

### UI Library (Material UI / Ant Design)

A UI component library was used to speed up development and provide consistent styling for tables, modals, inputs, and loaders. These libraries are widely used in administrative dashboards and enterprise interfaces.

### React Hot Toast

React Hot Toast was used to implement lightweight and user-friendly notifications for actions such as successful product creation.

---

## Additional Architectural Decisions

* The application separates **API logic**, **UI components**, and **feature modules** to keep the codebase maintainable.
* Authentication tokens are stored either in **localStorage** or **sessionStorage** depending on the "Remember me" option, following the requirements of the test task.
* Sorting state is stored in React state to preserve the current view of the table.
Как это соответствует ТЗ
Авторизация
features/auth-by-username

Содержит:

LoginForm
useLogin

Работает с API:

entities/user/api
Таблица товаров
widgets/products-table

Почему widget?

Потому что это большой UI блок страницы.

Поиск
features/product-search

Feature — потому что это пользовательское действие.

Добавление товара
features/add-product

Содержит:

AddProductModal
useAddProduct
Сущность товара
entities/product

Содержит:

types
api
UI

Например:

Product
ProductRating
Пример entity Product

entities/product/model/types.ts

export interface Product {
  id: number
  title: string
  price: number
  rating: number
  brand: string
  sku?: string
}
Пример API

entities/product/api/productApi.ts

import axios from "axios"

export const getProducts = async () => {
  const res = await axios.get("https://dummyjson.com/products")
  return res.data
}

export const searchProducts = async (query: string) => {
  const res = await axios.get(
    `https://dummyjson.com/products/search?q=${query}`
  )
  return res.data
}
Пример shared storage

shared/utils/storage.ts

export const saveToken = (token: string, remember: boolean) => {
  if (remember) {
    localStorage.setItem("token", token)
  } else {
    sessionStorage.setItem("token", token)
  }
}
Почему такая архитектура хороша

Можно написать в README:

clear separation of responsibilities

scalable architecture

reusable entities

isolated business logic

Важный совет для тестового

Не делай слишком глубокую вложенность.

Иногда FSD выглядит так:

feature/model/services/hooks/types
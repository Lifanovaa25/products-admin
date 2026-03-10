Админ-панель управления продуктами
Описание проекта

Проект представляет собой админ-панель для управления товарами. Включает:

Авторизацию пользователей

Таблицу продуктов с сортировкой и поиском

Возможность добавления нового продукта

Архитектура построена по принципам Feature-Sliced Design (FSD), что обеспечивает масштабируемость, повторное использование кода и чистое разделение ответственности.

Стек технологий

React 18 – современный UI-фреймворк с компонентной архитектурой.

TypeScript – строгая типизация для снижения ошибок и улучшения поддержки IDE.

Vite – быстрый сборщик с HMR для React + TypeScript проектов.

React Router – управление клиентской маршрутизацией.

Axios – удобный инструмент для HTTP-запросов с автоматическим JSON и обработкой ошибок.

React Query (TanStack Query) – управление серверным состоянием, кэширование, загрузка и синхронизация с API.

React Hook Form – производительная работа с формами.

Zod – схема валидации данных форм.

UI-библиотека (Material UI / Ant Design) – готовые компоненты интерфейса.

React Hot Toast – уведомления о действиях пользователя (успешное создание продукта и ошибки).

Архитектурные решения

Разделение API, UI-компонентов и фич-модулей.

Токены авторизации хранятся в localStorage или sessionStorage в зависимости от опции "Запомнить данные":

Включено → localStorage (сессия сохраняется после закрытия браузера)

Выключено → sessionStorage (сессия сбрасывается при закрытии вкладки)

Состояние сортировки и поиска хранится в React state для таблицы продуктов.

Используются Widgets для крупных UI-блоков (например, ProductsTable).

Features – действия пользователя (поиск, добавление продукта).

Entities – повторно используемые сущности (Product, User).

Соответствие ТЗ
Авторизация

Папка: features/auth-by-username

LoginForm

useLogin

Работает с API: entities/user/api

Таблица товаров

Папка: widgets/products-table
Крупный UI-блок для отображения списка продуктов.

Поиск

Папка: features/product-search
Feature, так как это пользовательское действие.

Добавление продукта

Папка: features/add-product

AddProductModal

useAddProduct

Сущность продукта

Папка: entities/product

types

api

UI компоненты (ProductCard, ProductRating)

Пример интерфейса Product:

export interface Product {
  id: number;
  title: string;
  price: number;
  rating: number;
  brand: string;
  sku?: string;
}

Пример API:

import axios from "axios";

export const getProducts = async () => {
  const res = await axios.get("https://dummyjson.com/products");
  return res.data;
};

export const searchProducts = async (query: string) => {
  const res = await axios.get(`https://dummyjson.com/products/search?q=${query}`);
  return res.data;
};

Пример shared storage:

export const saveToken = (token: string, remember: boolean) => {
  if (remember) {
    localStorage.setItem("token", token);
  } else {
    sessionStorage.setItem("token", token);
  }
};
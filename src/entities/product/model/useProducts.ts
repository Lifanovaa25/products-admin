import { useState, useEffect } from "react"
import axios from "axios"
import { Product } from "./types"

type SortField = "price" | "rating" | null
type SortOrder = "asc" | "desc"

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const [sortField, setSortField] = useState<SortField>(null)
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc")

  const [error, setError] = useState<string | null>(null)

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const url = search
        ? `https://dummyjson.com/products/search?q=${search}`
        : "https://dummyjson.com/products"

      const res = await axios.get(url)

      let data: Product[] = res.data.products

      if (sortField) {
        data = [...data].sort((a, b) => {
          const aValue = a[sortField] ?? 0
          const bValue = b[sortField] ?? 0

          return sortOrder === "asc"
            ? aValue - bValue
            : bValue - aValue
        })
      }

      setProducts(data)

    } catch (e) {
      setError("Ошибка загрузки товаров")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const debounce = setTimeout(() => {
      fetchProducts()
    }, 400)

    return () => clearTimeout(debounce)
  }, [search, sortField, sortOrder])

  const addProduct = (product: Product) => {
    setProducts((prev) => [
      {
        ...product,
        id: Date.now(),
        rating: product.rating ?? 0
      },
      ...prev
    ])
  }

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  return {
    products,
    isLoading,
    error,

    search,
    setSearch,

    sortField,
    sortOrder,
    toggleSort,

    addProduct
  }
}
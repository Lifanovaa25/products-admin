import { useState, useEffect, useCallback } from "react"
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

  const [page, setPage] = useState(1)
  const [limit] = useState(10)
  const [total, setTotal] = useState(0)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)

    const skip = (page - 1) * limit


    let url = search
      ? `https://dummyjson.com/products/search?q=${encodeURIComponent(search)}`
      : "https://dummyjson.com/products"

    // Создаём параметры запроса
    const params = new URLSearchParams()
    params.append("limit", limit.toString())
    params.append("skip", skip.toString())
    if (sortField) {
      params.append("sortBy", sortField)
      params.append("order", sortOrder)
    }

    const separator = url.includes("?") ? "&" : "?"
    const fullUrl = `${url}${separator}${params.toString()}`

    try {
      const res = await axios.get(fullUrl)
      setProducts(res.data.products)
      setTotal(res.data.total)
    } catch (error) {
      console.error("Ошибка загрузки товаров:", error)
      setProducts([])
      setTotal(0)
    } finally {
      setIsLoading(false)
    }
  }, [search, page, sortField, sortOrder, limit])


  useEffect(() => {
    const debounce = setTimeout(() => fetchProducts(), 400)
    return () => clearTimeout(debounce)
  }, [fetchProducts])

  const addProduct = (product: Product) => {
    setProducts(prev => [
      { ...product, id: Date.now(), rating: product.rating ?? 0 },
      ...prev
    ])
  }


  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === "asc" ? "desc" : "asc"))
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
  }

  const totalPages = Math.ceil(total / limit)

  return {
    products,
    isLoading,
    search,
    setSearch,
    page,
    setPage,
    totalPages,
    sortField,
    sortOrder,
    toggleSort,
    addProduct,
    fetchProducts
  }
}
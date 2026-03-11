import { useState, useEffect, useCallback } from "react"
import axios from "axios"

export type Product = {
  id: number
  title: string
  price: number
  brand: string
  sku: string
  rating: number
}

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
      ? `https://dummyjson.com/products/search?q=${search}`
      : `https://dummyjson.com/products`

    try {
      const res = await axios.get(url, {
        params: { limit, skip }
      })

      let list = res.data.products

      if (sortField) {
        list = [...list].sort((a, b) => {
          const aVal = a[sortField]
          const bVal = b[sortField]

          return sortOrder === "asc"
            ? aVal - bVal
            : bVal - aVal
        })
      }

      setProducts(list)
      setTotal(res.data.total)

    } catch (e) {
      console.error(e)
      setProducts([])
    } finally {
      setIsLoading(false)
    }
  }, [search, page, sortField, sortOrder])

  useEffect(() => {
    const debounce = setTimeout(fetchProducts, 400)
    return () => clearTimeout(debounce)
  }, [fetchProducts])

  const addProduct = (product: Product) => {
    setProducts(prev => [
      { ...product, id: Date.now() },
      ...prev
    ])
  }

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(prev => prev === "asc" ? "desc" : "asc")
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
    toggleSort,
    sortField,
    sortOrder,
    addProduct,
    fetchProducts
  }
}
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

import { useState } from "react"
import { Toast } from "@/shared/ui/Toast"
import { useProducts } from "@/entities/product/model/useProducts"

export const ProductsTable = () => {
  const { products, isLoading, search, setSearch, addProduct } = useProducts()
  const [showToast, setShowToast] = useState(false)

  const handleAdd = () => {
    addProduct({
        title: "Новый товар", price: 0, brand: "Новый бренд", sku: "XXX",
        id: 0,
        rating: 0
    })
    setShowToast(true)
  }

  return (
    <div>
      <input placeholder="Поиск..." value={search} onChange={e => setSearch(e.target.value)} />
      <button onClick={handleAdd}>Добавить</button>
      {isLoading ? <p>Загрузка...</p> : (
        <table>
          <thead>
            <tr>
              <th>Название</th>
              <th>Цена</th>
              <th>Рейтинг</th>
              <th>Бренд</th>
              <th>SKU</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td>{p.title}</td>
                <td>{p.price}</td>
                <td style={{ color: p.rating < 3 ? "red" : "black" }}>{p.rating}</td>
                <td>{p.brand}</td>
                <td>{p.sku}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showToast && <Toast message="Товар добавлен" onClose={() => setShowToast(false)} />}
    </div>
  )
}
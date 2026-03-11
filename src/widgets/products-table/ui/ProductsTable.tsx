import { useState } from "react"
import { Toast } from "@/shared/ui/Toast"
import { useProducts } from "@/entities/product/model/useProducts"
import s from "./ProductsTable.module.scss"
import searchIcon from "@/assets/icons/search.svg"
import updateIcon from "@/assets/icons/update.svg"
import plus from "@/assets/icons/plus.svg"
import { Button } from "@/shared/ui/Button"

export const ProductsTable = () => {
  const {
    products,
    isLoading,
    search,
    setSearch,
    addProduct,
    sortField,
    sortOrder,
    toggleSort,
    page,
    setPage,
    totalPages,
    fetchProducts
  } = useProducts()

  const [showToast, setShowToast] = useState(false)

  const handleAdd = () => {
    const newProduct = {
      title: "Новый товар",
      price: 0,
      brand: "Новый бренд",
      sku: "XXX",
      rating: 0,
      id: 0
    }
    addProduct(newProduct)
    setShowToast(true)
  }

  return (
    <div className={s.product__container}>
      <div className={s.product__header}>
        <h1 className={s.product__title}>Товары</h1>
        <div className={s.search}>
          <img src={searchIcon} alt="search" className={s.search__icon} />
          <input
            className={s.search__input}
            placeholder="Найти"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className={s.product__wrapper}>
        <div className={s.product__table_header}>
          <h2 className={s.product__table_title}>Все позиции</h2>
          <div className={s.product__addblock}>
            <Button className={s.refresh_btn} onClick={fetchProducts}>
              <img src={updateIcon} alt="refresh" className={s.search__icon} />
            </Button>
            <button onClick={handleAdd} className={s.add_btn}>
              <img src={plus} alt="add" className={s.search__icon} /> Добавить
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className={s.loader}>Загрузка...</div>
        ) : (
          <table className={s.product__table}>
            <thead>
              <tr>
                <th>Название</th>
                <th onClick={() => toggleSort("price")}>
                  Цена {sortField === "price" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
                <th onClick={() => toggleSort("rating")}>
                  Рейтинг {sortField === "rating" && (sortOrder === "asc" ? "▲" : "▼")}
                </th>
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

        {/* Пагинация */}
        <div className={s.pagination}>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Назад</button>
          <span>{page} / {totalPages}</span>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>Вперёд</button>
        </div>
      </div>

      {showToast && <Toast message="Товар добавлен" onClose={() => setShowToast(false)} />}
    </div>
  )
}
import { useState } from "react"
import { Toast } from "@/shared/ui/Toast"

import { Product, useProducts } from "@/entities/product/model/useProducts"

import s from "./ProductsTable.module.scss"

import searchIcon from "@/assets/icons/search.svg"
import updateIcon from "@/assets/icons/update.svg"
import plus from "@/assets/icons/plus.svg"

import { Button } from "@/shared/ui/Button"
import { Loader } from "@/shared/ui/Loader/Loader"
import { AddProductModal } from "@/features/auth/add-product/AddProductModal"

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
  const [showModal, setShowModal] = useState(false)

  const [selected, setSelected] = useState<number[]>([])

  const handleAdd = (product: Product) => {
    addProduct(product)
    setShowToast(true)
  }

  const toggleAll = () => {
    if (selected.length === products.length) {
      setSelected([])
    } else {
      setSelected(products.map(p => p.id))
    }
  }

  const toggleOne = (id: number) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : [...prev, id]
    )
  }

  const pages = Array.from({ length: totalPages }).slice(0, 5)

  return (
    <div className={s.product__container}>

      <Loader isLoading={isLoading} />
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

            <button
              onClick={() => setShowModal(true)}
              className={s.add_btn}
            >
              <img src={plus} alt="add" className={s.search__icon} />
              Добавить
            </button>

          </div>

        </div>

        <table className={s.product__table}>

          <thead>

            <tr>

              <th>
                <input
                  type="checkbox"
                  className={s.checkbox}
                  checked={selected.length === products.length}
                  onChange={toggleAll}
                />
              </th>

              <th>Наименование</th>

              <th>Вендор</th>

              <th>Артикул</th>

              <th onClick={() => toggleSort("rating")}>
                Оценка {sortField === "rating" && (sortOrder === "asc" ? "" : "")}
              </th>

              <th onClick={() => toggleSort("price")}>
                Цена, ₽ {sortField === "price" && (sortOrder === "asc" ? "" : "")}
              </th>

              <th></th>

            </tr>

          </thead>

          <tbody>

            {products.map(p => (

              <tr
                key={p.id}
                className={`${s.row} ${selected.includes(p.id) ? s.selectedRow : ""}`}
              >

                <td>
                  <input
                    className={s.checkbox}
                    type="checkbox"
                    checked={selected.includes(p.id)}
                    onChange={() => toggleOne(p.id)}
                  />
                </td>

                <td>

                  <div className={s.product}>

                    <div className={s.photo}></div>

                    <div>

                      <div className={s.name}>
                        {p.title}
                      </div>

                      <div className={s.category}>
                        Аксессуары
                      </div>

                    </div>

                  </div>

                </td>

                <td>{p.brand}</td>

                <td>{p.sku}</td>

                <td className={p.rating < 3 ? s.ratingBad : ""}>
                  {p.rating}/5
                </td>

                <td className={s.price}>
                  {p.price.toLocaleString("ru-RU", {
                    minimumFractionDigits: 2
                  })}
                </td>

                <td>

                  <button className={s.plusBtn}>
                    +
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

        <div className={s.pagination}>

          <div className={s.pagination_info}>
            Показано {(page - 1) * 20 + 1}-{page * 20} из {totalPages * 20}
          </div>

          <div className={s.pagination_pages}>

            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
            >
              ‹
            </button>

            {pages.map((_, i) => {

              const p = i + 1

              return (
                <button
                  key={p}
                  className={p === page ? s.activePage : ""}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              )

            })}

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
            >
              ›
            </button>

          </div>

        </div>

      </div>

      {showModal && (
        <AddProductModal
          onClose={() => setShowModal(false)}
          onAdd={handleAdd}
        />
      )}

      {showToast && (
        <Toast
          message="Товар добавлен"
          onClose={() => setShowToast(false)}
        />
      )}

    </div>
  )
}
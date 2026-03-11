import { useState } from "react"
import s from "./AddProductModal.module.scss"

type AddProductModalProps = {
  onClose: () => void
  onAdd: (product: {
    id: number
    title: string
    price: number
    brand: string
    sku: string
    rating: number
  }) => void
}

export const AddProductModal = ({ onClose, onAdd }: AddProductModalProps) => {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [brand, setBrand] = useState("")
  const [sku, setSku] = useState("")

  const submit = () => {
    onAdd({
      id: Date.now(),
      title,
      price: Number(price),
      brand,
      sku,
      rating: 0
    })

    onClose()
  }

  return (
    <div className={s.overlay}>
      <div className={s.modal}>

        <h3>Добавить товар</h3>

        <input
          placeholder="Название"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />

        <input
          placeholder="Цена"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />

        <input
          placeholder="Вендор"
          value={brand}
          onChange={e => setBrand(e.target.value)}
        />

        <input
          placeholder="Артикул"
          value={sku}
          onChange={e => setSku(e.target.value)}
        />

        <div className={s.actions}>
          <button onClick={onClose}>Отмена</button>
          <button onClick={submit}>Добавить</button>
        </div>

      </div>
    </div>
  )
}
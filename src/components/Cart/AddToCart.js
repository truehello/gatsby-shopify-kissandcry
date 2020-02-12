import React, { useContext } from "react"
import { StoreContext } from "../../context/StoreContext"

const AddToCart = ({ variantId }) => {
  const { addProductToCart } = useContext(StoreContext)
  return (
    <button
      className="mt-4 bg-gray-900 hover:bg-transparent text-gray-200 font-semibold hover:text-gray-900 py-2 px-4 border border-gray-900 hover:border-gray-900 rounded"
      onClick={() => addProductToCart(variantId)}
    >
      Add To Cart
    </button>
  )
}

export default AddToCart

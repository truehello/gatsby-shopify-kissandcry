import React, { useContext, useState } from "react"
import { animated } from "react-spring"
import { StoreContext } from "../../context/StoreContext"

const Cart = ({ style }) => {
  const {
    checkout,
    toggleCartOpen,
    removeProductFromCart,
    checkCoupon,
    removeCoupon,
  } = useContext(StoreContext)

  const [coupon, setCoupon] = useState("")

  return (
    <animated.div
      style={{
        zIndex: 100,
        position: "fixed",
        top: 0,
        right: 0,
        width: "50%",
        height: "100%",
        background: "white",
        padding: "40px 2%",
        boxShadow: "var(--elevation-4)",
        ...style,
      }}
    >
      <button
        style={{
          background: "var(--red)",
          position: "absolute",
          top: 10,
          right: 10,
        }}
        className="delete is-large"
        onClick={toggleCartOpen}
      >
        Close Cart
      </button>
      <h3 className="text-4xl font-semibold tracking-tight">Your Cart</h3>
      {checkout.lineItems.length > 0 ? (
        <>
          {checkout.lineItems.map(item => (
            <div
              key={item.id}
              style={{ display: "flex", marginBottom: "2rem" }}
            >
              <div
                style={{
                  width: 60,
                  height: 60,
                  overflow: "hidden",
                  marginRight: 10,
                }}
              >
                <img src={item.variant.image.src} alt="" />
              </div>
              <div>
                <h4 className="text-2xl tracking-tight">{item.title}</h4>
                <p className="text-xl tracking-tight">${item.variant.price}</p>
                <p className="text-xl tracking-tight">Qty: {item.quantity}</p>
                <button
                  onClick={() => removeProductFromCart(item.id)}
                  className="mt-2 bg-transparent hover:bg-red-700 text-red-700 text-xs hover:text-gray-200 py-1 px-2 border border-red-700 hover:border-gray-200 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div>
            {checkout.discountApplications.length > 0 ? (
              <p>
                Coupon:
                <h5 className="title">
                  {checkout.discountApplications[0].code} -{" "}
                  {checkout.discountApplications[0].value.percentage}% off
                </h5>
                <button
                  onClick={() =>
                    removeCoupon(checkout.discountApplications[0].code)
                  }
                  className="mt-2 bg-transparent hover:bg-red-700 text-red-700 text-xs hover:text-gray-200 py-1 px-2 border border-red-700 hover:border-gray-200 rounded"
                >
                  Remove
                </button>
              </p>
            ) : (
              <form
                onSubmit={e => {
                  e.preventDefault()
                  checkCoupon(coupon)
                }}
              >
                <div className="field">
                  <label htmlFor="coupon" className="label">
                    Coupon
                  </label>
                  <input
                    className="input"
                    id="coupon"
                    value={coupon}
                    onChange={e => setCoupon(e.target.value)}
                    type="text"
                  />
                </div>
                <button className="mt-2 bg-gray-900 hover:bg-transparent text-gray-200 font-semibold hover:text-gray-900 py-2 px-4 border border-gray-900 hover:border-gray-900 rounded">Add Coupon</button>
              </form>
            )}
          </div>
          <hr />
          <div>
            Total: <h5 className="title">${checkout.totalPrice}</h5>
          </div>
         
            <a
              href={checkout.webUrl}
              className="flex w-full justify-center mt-4 bg-gray-900 hover:bg-transparent text-gray-200 font-semibold hover:text-gray-900 py-2 px-4 border border-gray-900 hover:border-gray-900 rounded"
            >
              Checkout Now
            </a>
         
        </>
      ) : (
        <p>No items in cart</p>
      )}
    </animated.div>
  )
}

export default Cart

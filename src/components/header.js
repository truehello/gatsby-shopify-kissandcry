import { Link } from "gatsby"
import PropTypes from "prop-types"
import React, { useContext } from "react"
import { useTransition } from "react-spring"
import { FaShoppingCart } from "react-icons/fa"
import "../style.scss"
import { StoreContext } from "../context/StoreContext"
import logo from "../images/logo.svg"
import Cart from "./Cart/Cart"
import Loader from "./loader"
import Nav from "./Nav"

const Header = ({ siteTitle }) => {
  const { isCartOpen, toggleCartOpen, checkout } = useContext(
    StoreContext
  )
  const transitions = useTransition(isCartOpen, null, {
    from: { transform: "translate3d(100%, 0, 0)" },
    enter: { transform: "translate3d(0, 0, 0)" },
    leave: { transform: "translate3d(100%, 0, 0)" },
  })
  const qty = checkout.lineItems.reduce((total, item) => {
    return total + item.quantity
  }, 0)
  return (
    <>
      <header className="fixed w-full z-10 top-0 shadow p-4">
      <nav className="flex flex-wrap items-center justify-between items-center lg:flex-row">
        <div>
          <Link to="/">
            <img
              style={{ height: 60, maxHeight: "none", marginBottom: 0 }}
              src={logo}
              alt="Kiss & Cry Logo"
            />
           
          </Link>
          
        </div>
        <Nav />
        <div className="level-right">
          <div>
            <button
              className="button"
              style={{
                position: "relative",
                background: "transparent",
                border: "none",
              }}
              onClick={toggleCartOpen}
            >
              {qty > 0 && (
                <div
                  style={{
                    color: "white",
                    position: "absolute",
                    background: "var(--red)",
                    borderRadius: 15,
                    textAlign: "center",
                    height: 30,
                    top: -5,
                    right: -5,
                    width: 30,
                    lineHeight: "30px",
                  }}
                >
                  {qty}
                </div>
              )}
              <FaShoppingCart
                style={{ color: "black", height: 25, width: 25 }}
              />
            </button>
          </div>
        </div>
        {transitions.map(
          ({ item, key, props }) => item && <Cart key={key} style={props} />
        )}
        </nav>
      </header>
      <Loader />
    </>
  )
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

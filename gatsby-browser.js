import React from "react"
import { StoreProvider } from "./src/context/StoreContext"
import "./src/css/tailwind.css"

export const wrapRootElement = ({ element }) => (
  <StoreProvider>{element}</StoreProvider>
)

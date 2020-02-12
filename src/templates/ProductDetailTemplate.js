import React from "react"
import { graphql } from "gatsby"
import Image from "gatsby-image"
import Layout from "../components/layout"
import AddToCart from "../components/Cart/AddToCart"

const ProductDetailTemplate = ({ data }) => {
  const { shopifyProduct: product } = data
  const {
    images: [firstImage],
    variants: [firstVariant],
  } = product
  return (
    <Layout>
      <div className="columns">
        <div className="column">
          <Image fluid={firstImage.localFile.childImageSharp.fluid} />
        </div>
        <div className="column">
          <h1 className="font-semibold text-2xl tracking-tight">{product.title}</h1>
          <p className="font-medium text-3xl tracking-tighter">${firstVariant.price}</p>
          <p className="tracking-tighter">{product.description}</p>
          <AddToCart variantId={firstVariant.shopifyId} />
        </div>
      </div>
    </Layout>
  )
}

export default ProductDetailTemplate

export const query = graphql`
  query($handle: String!) {
    shopifyProduct(handle: { eq: $handle }) {
      id
      handle
      title
      productType
      description
      variants {
        id
        shopifyId
        title
        price
        sku
        availableForSale
      }
      images {
        id
        localFile {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 400) {
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`

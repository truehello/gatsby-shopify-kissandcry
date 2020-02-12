import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

const Nav = () => {
  const { allShopifyCollection } = useStaticQuery(
    graphql`
      query allShopifyCollections {
        allShopifyCollection(filter: {title: {in: ["T-Shirts", "Hoodies", "Hats", "Extras"]}}) {
          edges {
            node {
              title
              handle
            }
          }
        }
      }
    `
  )

  return (
    
      <ul className="flex flex-wrap items-center justify-between items-center lg:flex-row">
      {allShopifyCollection.edges.map(edge => {
        return <li className="lg:mr-3"><Link 
        className="inline-block text-black text-xl no-underline hover:text-underline py-2 px-4"
        key={edge.node.handle} 
        to={`/${edge.node.handle}`}>{edge.node.title}</Link></li>
      })}
      </ul>
    
  )
}

export default Nav

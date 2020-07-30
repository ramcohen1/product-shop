import React from 'react'
import ProductItem from './ProductItem'

const ProductList = ({ products }) => {

   const productsList = products.map(product => {
      return (
         <ProductItem product={product} key={product._id}/>
      )
   })

   return (
      <div className='product-list'>
         {productsList}
      </div>
   )
}

export default ProductList
import React from 'react'
import { Link } from 'react-router-dom'
import apiShop from '../api/api-shop'

const ProductItem = ({product}) => {
   return (
   <Link to={`/product/show/${product._id}`} className='product-item'>
      <div className='product-name'>{product.name}</div>
      <img className='product-img' src={`http://localhost:3001/products/photo/${product._id}`} />
      <div className='product-price'>Price: ${product.price}</div>
   </Link>
   )
}

export default ProductItem
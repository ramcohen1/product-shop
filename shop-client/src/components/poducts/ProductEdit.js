import React from 'react'
import ProductForm from './ProductForm'

const ProductEdit = (props) => {
   return (
      <div>
         <ProductForm operator='patch' id={`/${props.match.params.id}`} action='edit' />
      </div>
   )
}

export default ProductEdit
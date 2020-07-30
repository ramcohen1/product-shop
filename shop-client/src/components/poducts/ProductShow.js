import React from 'react'
import apiShop from '../api/api-shop'
import './ProductShow.css'
import { Link } from 'react-router-dom'

class ProductShow extends React.Component{
   state = { product: null, error: '' }

   componentDidMount = async () => {
      try {
         const {data} = await apiShop.get(`/products/${this.props.match.params.id}`)
         this.setState({ product: data })
      } catch (error) {
         this.setState({ error })
      }
   }

   renderProducts = () => {
      if(!this.state.product){
         return <div></div>
      }else{
         return (
            <div className='body-text-product-show'>
               <h1>{this.state.product.name}</h1>
               <Link className='edit-product-button' to={`/product/edit/${this.state.product._id}`}>
                  <button>Edit Product</button>
               </Link>
               <div className='content-product-show'>
                  <p>description: {this.state.product.description}</p>
                  <div>the price is: <span>{this.state.product.price}</span></div>
                  <img src={`http://localhost:3001/products/photo/${this.state.product._id}`} />
                  <button>Go to buy</button>
               </div>
            </div>
         )
      }
   }
   
   render(){
      return(
         <>
         {this.renderProducts()}
         </>
      )
   }
}
   

export default ProductShow
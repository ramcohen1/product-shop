import React from 'react'
import ProductList from './ProductList'
import apiShop from '../api/api-shop'
import './ProductMain.css'
import { Link } from 'react-router-dom'
import Categories from './ProductCategories'


class ProductMain extends React.Component {
   state = { productsArr: [], error: '' }

   componentDidMount = async () => {
      try {
         const { data } = await apiShop.get('/products')

         this.setState({ productsArr: data })
      } catch (e) {
         this.setState({ error: e })
      }
   }

   displayMainContent = () => {
      if (this.state.error) {
         return 'Error ' + this.state.error
      }
      return (
         <div className='product-main'>
            <h1>sdcdcsdc</h1>
            <h1>sdcdcsdc</h1>
            <h1>sdcdcsdc</h1>
            <div className='button-create'>
               <Link to='/product/create'>
                  <button>
                     Create new Product
               </button>
               </Link>
            </div>
            <div className='categories-list'>
            <h2>Categories</h2>
            <Categories />
            </div>
            <h2>Best Products</h2>
            <ProductList
               products={this.state.productsArr}
               onClick={this.onClickProduct}
            />
         </div>
      )
   }

   render() {
      console.log(this.state.selectedProduct)
      return (
         <>
            {this.displayMainContent()}
         </>
      )
   }
}

export default ProductMain
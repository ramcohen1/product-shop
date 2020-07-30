import React from 'react'

const ProductFormInput = (props) => {
   return (
      <div>
         <label htmlFor='name'>Name:</label>
         <input 
            autoComplete='off'
            onClick={() => {
               this.setState({name: ''})
            }}
            value={this.state.name}
            onChange={(e) => {
               this.setState({name: e.target.value}
               )}}
            type='text' name='name' id='name'
            />
      </div>
   )
}

export default ProductFormInput
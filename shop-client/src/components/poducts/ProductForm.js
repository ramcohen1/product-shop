import React from 'react'
import './ProductForm.css'
import apiShop from '../api/api-shop'
import { Formik, Field, Form } from 'formik'

class ProductForm extends React.Component {

   displayForm = () => {
      return (
         <Formik
            initialValues={{name: '', description: '', price: '' }}
            onSubmit={async (data, { resetForm }) => {
               const newData = {}
               const changes = ['name', 'description', 'price']

               changes.forEach(el => {
                  if(data[el]){
                     return newData[el] = data[el]
                  }
               })
               try {
                  await apiShop({
                     method: this.props.operator,
                     url: `/products${this.props.id}`,
                     data: newData
                  })
                  resetForm()
               } catch (error) {
                  console.log(error.errorMessage)
               }
            }}
            validate={(values) => {
               const error = {}
               if(!values.name && !values.description && !values.price){
                  error.message = 'Yoe MUST select ONE of the options'
               }
               return error
            }}
            >

            {
            ({ errors }) => (
               <Form>
                  <div>
                     <label htmlFor='name'>Name:</label>
                     <Field name='name' type='input'/>
                  </div>
                  <div>
                     <label htmlFor='description'>Description:</label>
                     <Field name='description' type='input'/>
                  </div>
                  <div>
                     <label htmlFor='price'>Price:</label>
                     <Field name='price' type='input'/>
                  </div>
                  <div style={{color: 'red'}}>{errors.message}</div>
                  <button type="submit">send</button>
               </Form>)
            }

         </Formik>
      )
   }
   
   render(){
   return (
      <div>
         {this.displayForm()}
      </div>
      )
   }

}

export default ProductForm
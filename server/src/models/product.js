const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   price: {
      type: Number,
      required: true
   },
   description: {
      type: String
   },
   categories: [{
      category: {
         type: String,
         required: true,
         ref: 'Categor'
      }
   }],
   photo: {
      type: Buffer
   }
},
{
   timestamps: true
})

const Product = mongoose.model('Product', productSchema)

module.exports = Product

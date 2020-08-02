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
         required: true
      }
   }],
   photo: {
      type: Buffer
   }
},
{
   timestamps: true
})

// productSchema.methods.toJSON = function() {
//    const newProductObj = this.toObject()

//    delete newProductObj.photo

//    return newProductObj
// }

const Product = mongoose.model('Product', productSchema)

module.exports = Product

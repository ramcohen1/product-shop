const mongoose = require('mongoose')

const categorSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
      unique: true
   }
})

categorSchema.virtual('products', {
   ref: 'Product',
   localField: 'name',
   foreignField: 'category.categor'
})

const Categor = mongoose.model('Categor', categorSchema)

module.exports = Categor
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:/product-shop',{
      useNewUrlParser: true, useUnifiedTopology: true,
      useCreateIndex:true
})
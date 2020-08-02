const Product = require('../models/product')


exports.postProduct = async (req, res) => {
   const product = new Product(req.body)

   try {
      const productSaved = await product.save()
      res.status(201).send(productSaved)
   } catch (e) {
      res.status(500).send(e)
   }
}

exports.getAllProducts = async (req, res) => {
   const { names } = req.query

   try {
      if (names) {
         const categories = JSON.parse(req.query.names)

         let categor = await Product.find({
            "categories.category": { $in: categories }
         })

         console.log(categor)

         if (!categor) {
            return res.send([])
         } else {
            return res.send(categor)
         }
      }
      const products = await Product.find({})

      res.send(products)
   } catch (e) {
      res.status(500).send(e)
   }
}

exports.getProduct = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)

      if (!product) return res.status(404).send()

      res.send(product)
   } catch (e) {
      res.status(500).send(e)
   }
}

exports.patchProduct = async (req, res) => {
   const allowedUpdates = ["name", "price", "description", "category"]
   const updates = Object.keys(req.body)
   const isValidOperation = updates.every(el => allowedUpdates.includes(el))

   if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

   try {
      const product = await Product.findById(req.params.id)
      if (!product) return res.status(404).send()

      updates.forEach(el => product[el] = req.body[el])

      await product.save()
      res.status(202).send(product)
   } catch (e) {
      res.status(400).send(e)
   }
}

exports.deleteProduct = async (req, res) => {
   try {
      const product = await Product.findByIdAndDelete(req.params.id)
      if (!product) return res.status(404).send()

      res.status(204).send()
   } catch (e) {
      res.status(500).send(e)
   }
}

exports.postPhotoOfProduct = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)
      if (!product) return res.status(404).send()

      product.photo = req.file.buffer

      await product.save()
      res.send()
   } catch (error) {
      res.status(400).send()
   }
}, (error, req, res, next) => {
   res.status(400).send({ error: error.message })
}

exports.getPhotoOfProduct = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)

      if (!product || !product.photo) {
         throw new Error()
      }

      res.set('Content-Type', 'image-jpg')

      res.send(product.photo)
   } catch (error) {
      res.status(404).send()
   }
}

exports.deletePhotoOfProduct = async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)
      if (!product) return res.status(404).send()

      product.photo = undefined

      await product.save()
      res.send()
   } catch (error) {

   }
}
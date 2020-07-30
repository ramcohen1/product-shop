const express = require('express')
const Product = require('../models/product')
const router = new express.Router()
const multer = require('multer')

router.post('/products', async (req, res) => {
   const product = new Product(req.body)

   try {
      const productSaved = await product.save()
      res.status(201).send(productSaved)
   } catch (e) {
      res.status(500).send(e)
   }
})

router.get('/products', async (req, res) => {
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
})

router.get('/products/:id', async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)

      if (!product) return res.status(404).send()

      res.send(product)
   } catch (e) {
      res.status(500).send(e)
   }
})

router.patch('/products/:id', async (req, res) => {
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
})

router.delete('/products/:id', async (req, res) => {
   try {
      const product = await Product.findByIdAndDelete(req.params.id)
      if (!product) return res.status(404).send()

      res.status(204).send()
   } catch (e) {
      res.status(500).send(e)
   }
})

router.delete('/products', async (req, res) => {
   try {
      const products = await Product.find({})

      const filtered = products.filter(async (product, index) => {
         if (index > 9) await Product.deleteOne(product)
      })

      res.send(filtered)
   } catch (error) {
      res.status(500).send(e)
   }
})

const upload = multer({
   limits: {
      fileSize: 1000000
   },
   fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
         return cb(new Error('please send an image'))
      }

      cb(undefined, true)
   }
})

router.post('/products/photo/:id', upload.single('image'), async (req, res) => {
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
})

router.get('/products/photo/:id', async (req, res) => {
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
})

router.delete('/products/photo/:id', async (req, res) => {
   try {
      const product = await Product.findById(req.params.id)
      if (!product) return res.status(404).send()

      product.photo = undefined

      await product.save()
      res.send()
   } catch (error) {

   }
})

module.exports = router
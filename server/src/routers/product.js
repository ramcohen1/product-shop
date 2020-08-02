const express = require('express')
const router = new express.Router()

const multer = require('multer')

const productController = require('../controllers/product')

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

router.post('/products', productController.postProduct)

router.get('/products', productController.getAllProducts)

router.get('/products/:id', productController.getProduct)

router.patch('/products/:id', productController.patchProduct)

router.delete('/products/:id', productController.deleteProduct)

router.post('/products/photo/:id', upload.single('image'), productController.postPhotoOfProduct)

router.get('/products/photo/:id', productController.getPhotoOfProduct)

router.delete('/products/photo/:id', productController.deletePhotoOfProduct)

module.exports = router
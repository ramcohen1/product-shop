const express = require('express')
const router = new express.Router()

const productController = require('../controllers/product')

const upload = require('../middleware/upload')

router.post('/products', productController.postProduct)

router.get('/products', productController.getAllProducts)

router.get('/products/:id', productController.getProduct)

router.patch('/products/:id', productController.patchProduct)

router.delete('/products/:id', productController.deleteProduct)

router.post('/products/photo/:id', upload.single('image'), productController.postPhotoOfProduct)

router.get('/products/photo/:id', productController.getPhotoOfProduct)

router.delete('/products/photo/:id', productController.deletePhotoOfProduct)

module.exports = router
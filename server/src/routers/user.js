const express = require('express')
const router = new express.Router()

const auth = require('../middleware/auth')

const userController = require('../controllers/user')

router.post('/users', userController.postUser)

router.post('/users/login', userController.loginUser)

router.post('/users/logout', auth, userController.logoutUser)

router.post('/users/logoutAll', auth, userController.logoutAllUser)

router.get('/users/me', auth, userController.getUser)

router.delete('/users', auth, userController.deleteUser)

module.exports = router
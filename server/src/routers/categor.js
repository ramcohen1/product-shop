const express = require('express')
const Categor = require('../models/categor')

const router = new express.Router()

router.post('/categors', async (req, res) => {
   const categor = new Categor(req.body) 
   try {
      await categor.save()
      res.status(201).send(categor)
   } catch (e) {
      res.status(500).send(e)
   }
})

module.exports = router
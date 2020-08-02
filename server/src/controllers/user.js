const User = require('../models/user')

exports.postUser = async (req, res) => {
   const user = new User(req.body)

   try {
      await user.save()
      const token = await user.generateAuthToken()
      res.status(201).send({ user, token })
   } catch (e) {
      res.status(500).send(e.errors)
   }
}

exports.loginUser = async (req, res) => {
   try {
      const user = await User.abc(req.body.email, req.body.password)
      const token = await user.generateAuthToken()

      res.send({ user, token })
   } catch (e) {
      res.status(400).send(e)
   }
}

exports.logoutUser = async (req, res) => {
   try {
      req.user.tokens = req.user.tokens.filter((token) => {
         return token.token !== req.token
      })

      await req.user.save()
      res.send()
   } catch (e) {
      res.status(500).send(e)
   }
}

exports.logoutAllUser = async (req, res) => {
   try {
      req.user.tokens = []
      await req.user.save()
      res.send()
   } catch (e) {
      res.status(500).send(e)
   }
}

exports.getUser = async (req, res) => {
   res.send(req.user)
}

exports.deleteUser = async (req, res) => {
   try {
      await req.user.remove()

      res.send()
   } catch (e) {
      res.status(500).send(e)
   }
}
const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true
   },
   email: {
      unique: true,
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
         if (!validator.isEmail(value)) {
            throw new Error('not valid email')
         }
      }
   },
   password: {
      type: String,
      required: true,
      minlength: 7,
      trim: true
   },
   tokens: [{
      token: {
         type: String,
         required: true
      }
   }
   ]
});

userSchema.methods.toJSON = function() {
   const newUserObj = this.toObject()

   delete newUserObj.password
   delete newUserObj.tokens

   return newUserObj
}

userSchema.methods.generateAuthToken = async function () {
   const token = jwt.sign({ _id: this._id.toString() }, 'ramramram')

   this.tokens = this.tokens.concat({token})
   await this.save()

   return token
}

userSchema.static('abc', async (email, password) => {
   const user = await User.findOne({ email })

   if (!user) throw new Error('Unable to login')

   const isMatch = await bcrypt.compare(password, user.password)

   if (!isMatch) throw new Error('Unable to login')

   return user;
})

userSchema.pre('save', async function (next) {
   if (this.isModified('password')) {
      this.password = await bcrypt.hash(this.password, 8)
   }

   next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
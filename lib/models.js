import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const imageSchema = new mongoose.Schema({
  src: { type: String, required: true },
  alt: { type: String, required: true },
})

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
)

userSchema.methods.matchPassword = function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password)
}

userSchema.pre('save', async function () {
  if (!this.isModified('password')) return
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

export const Image = mongoose.models.Image || mongoose.model('Image', imageSchema)
export const User = mongoose.models.User || mongoose.model('User', userSchema)

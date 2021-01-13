const mongoose = require('mongoose')

const imageSchema = mongoose.Schema({
  src: {
    type: String,
    reqired: true,
  },
  alt: {
    type: String,
    required: true,
  },
})

const Image = mongoose.model('Image', imageSchema)

module.exports = Image

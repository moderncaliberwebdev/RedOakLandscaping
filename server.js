const express = require('express')
const path = require('path')
const hbs = require('hbs')
const fs = require('fs')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS
const multer = require('multer')

const connectDB = require('./config/db')
const mailTo = require('./mail')

const generateToken = require('./middleware/generateToken')
const protect = require('./middleware/authMiddleware')

const Image = require('./models/imageModel')
const User = require('./models/userModel')

const app = express()

const PORT = process.env.PORT || 8080

connectDB()

//redirect naked to www domain
app.use(require('express-naked-redirect')())

//redirect http to https
app.use(redirectToHTTPS([/localhost:(\d{4})/], [/\/insecure/], 301))

//setting public directory for css and images
app.use(express.static(path.join(__dirname, './public')))

//setting up hbs
app.set('view engine', 'hbs')
hbs.registerPartials(path.join(__dirname, './views/partials'))

// Data parsing
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// removes trailing "/"
app.use((req, res, next) => {
  if (req.path.substr(-1) == '/' && req.path.length > 1) {
    var query = req.url.slice(req.path.length)
    res.redirect(301, req.path.slice(0, -1) + query)
  } else {
    next()
  }
})

app.get('/email', (req, res) => {
  const { name, email, phone, address, city, state, zip, message } = req.query
  mailTo(
    name,
    email,
    phone,
    address,
    city,
    state,
    zip,
    message,
    (err, data) => {
      res.send({
        name,
        email,
        phone,
        address,
        city,
        state,
        zip,
        message,
        formResponse: err,
      })
    }
  )
})

//routes
app.get('/', (req, res) => {
  res.render('index')
})

app.get('/gallery', async (req, res) => {
  // // map all images to gallery
  fs.readdir('./public/galleryImgs', (err, files) => {
    if (err) {
      res.render('gallery', { errMsg: "Couldn't load images" })
    } else {
      let imgHTML = []
      const allImgs = files.forEach((file) => {
        imgHTML += `<div class="grid-item"><img src="galleryImgs/${file}" alt="Grid Photo" class="galleryImg"></div>`
      })
      res.render('gallery', { imgs: imgHTML })
    }
  })
})

app.get('/services', (req, res) => {
  res.render('services')
})

app.get('/estimate', (req, res) => {
  res.render('estimate')
})

app.get('/login', (req, res) => {
  res.render('login')
})

app.get('/admin', (req, res) => {
  res.render('admin')
})

app.get('/truegrid', (req, res) => {
  res.render('truegrid')
})

app.get('/auth', protect, (req, res) => {
  res.send({
    auth: true,
  })
})

// Image upload
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './public/galleryImgs')
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now().toString().substr(8, 12)}${path.extname(
        file.originalname
      )}`
    )
  },
})

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  const mimetype = filetypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  } else {
    cb('Images only!')
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb)
  },
})

app.post('/upload', upload.single('image'), async (req, res) => {
  const filePath = req.file.path.split('public/')[1]
  const imgName = filePath.split('galleryImgs/')[1]

  const image = new Image({
    src: filePath,
    alt: imgName,
  })

  await image.save()
  res.json(image)
})

app.delete('/upload', async (req, res) => {
  const { imgPath } = req.body

  try {
    fs.unlink(`./public/${imgPath}`, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
    await Image.deleteOne({ src: imgPath })
    res.json({ message: 'Image Deleted' })
  } catch (error) {
    res.status(404)
    throw new Error('Image not found')
  }
})

// Makes a new User
// app.post('/user', async (req, res) => {
//   const user = new User({
//     username: req.body.username,
//     password: req.body.password,
//   })

//   await user.save()
//   res.json(user)
// })

app.post('/login', async (req, res) => {
  const { usernameValue, passwordValue } = req.body
  console.log(usernameValue)

  const user = await User.findOne({ username: usernameValue })

  if (user && (await user.matchPassword(passwordValue))) {
    res.json({
      _id: user._id,
      username: user.username,
      password: user.password,
      token: generateToken(user._id),
    })
  } else {
    res.send({ message: 'User not found' }).status(401)
    throw new Error('User not found')
  }
})

app.get('/sitemap', (req, res) => {
  res.contentType('application/xml')
  res.sendFile(path.join(__dirname, 'sitemap.xml'))
})
// DB Routes
app.get('/image', async (req, res) => {
  const images = await Image.find({})

  if (images) {
    res.json(images)
  } else {
    throw new Error('No Images')
  }
})

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(PORT, () => {
  console.log('Server is starting on PORT', PORT)
})

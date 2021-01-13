const express = require('express')
const path = require('path')
const fs = require('fs')
const redirectToHTTPS = require('express-http-to-https').redirectToHTTPS

const connectDB = require('./config/db')
const mailTo = require('./mail')

const Image = require('./models/imageModel')

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
  const {
    name,
    email,
    phone,
    address,
    city,
    state,
    zip,
    message,
    msg,
  } = req.query
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

app.post('/image', async (req, res) => {
  const image = new Image({
    src: req.body.src,
    alt: req.body.alt,
  })

  await image.save()
  res.json(image)
})

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(PORT, () => {
  console.log('Server is starting on PORT', PORT)
})

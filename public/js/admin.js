const adminAuth = async () => {
  const mainContainer = document.querySelector('.mainContainer')
  const token = localStorage.getItem('token')
  if (token) {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const { data } = await axios.get('/auth', config)
    if (data.auth) {
      mainContainer.style.display = 'block'
    } else {
      window.location.href = '/pagenotfound'
    }
  } else {
    window.location.href = '/pagenotfound'
  }
}

adminAuth()

// Fetches images from database
const fetchImgs = async () => {
  const response = await fetch('/image')
  const data = await response.json()
  return data
}

//maps images into admin panel
const mapImgs = async () => {
  //fetches images from database

  const images = await fetchImgs()

  for (let i = 0; i < images.length; i++) {
    const adminMain = document.getElementById('adminMain')
    // new divs for admin panel
    const admin__upload = document.createElement('div')
    admin__upload.className = 'admin__upload'

    const admin__upload__imgCont = document.createElement('div')
    admin__upload__imgCont.className = 'admin__upload__imgCont'
    admin__upload.appendChild(admin__upload__imgCont)

    const admin__upload__thumb = document.createElement('img')
    admin__upload__thumb.className = 'admin__upload__thumb'
    admin__upload__thumb.src = images[i].src
    const alt = images[i].src.split('galleryImgs/')[1].split('.')[0]
    admin__upload__thumb.alt = alt
    admin__upload__imgCont.appendChild(admin__upload__thumb)

    const admin__upload__text = document.createElement('p')
    admin__upload__text.className = 'admin__upload__text'
    const src = images[i].src.split('galleryImgs/')[1]
    admin__upload__text.textContent = src
    admin__upload.appendChild(admin__upload__text)

    const admin__upload__x = document.createElement('p')
    admin__upload__x.className = `admin__upload__x`
    admin__upload__x.textContent = 'X'
    admin__upload__x.onclick = () => {
      deleteImg(images[i].src)
    }
    admin__upload.appendChild(admin__upload__x)

    adminMain.appendChild(admin__upload)
  }
}

mapImgs()

//upload new image
document.querySelector('#file').addEventListener('change', async (e) => {
  const file = e.target.files[0]
  const formData = new FormData()
  formData.append('image', file)

  try {
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }

    await axios.post('/upload', formData, config)

    location.reload()
  } catch (error) {
    console.error(error)
  }
})

//deletes image

const deleteImg = async (imgPath) => {
  await axios({
    method: 'DELETE',
    url: '/upload',
    data: {
      imgPath,
    },
  })
  location.reload()
}

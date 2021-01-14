// Fetches images from database
const fetchImgs = async () => {
  const response = await fetch('/image')
  const data = await response.json()
  return data
}
//maps images into gallery
const mapImgs = async () => {
  //fetches images from database
  const images = await fetchImgs()

  // masonry grid column elements
  const gridCol1 = document.querySelector('.grid-col--1')
  const gridCol2 = document.querySelector('.grid-col--2')
  const gridCol3 = document.querySelector('.grid-col--3')

  // splits images into 3 grid columns
  let count = 1
  for (let i = 0; i < images.length; i++) {
    // new div and img
    const newImgDiv = document.createElement('div')
    const newImg = document.createElement('img')
    newImg.src = images[i].src
    newImg.alt = images[i].alt
    newImg.className = 'galleryImg'

    newImgDiv.appendChild(newImg)
    newImgDiv.className = 'grid-item'

    //depending on the count, the div goes into a different grid column
    if (count == 1) {
      gridCol1.appendChild(newImgDiv)
    } else if (count == 2) {
      gridCol2.appendChild(newImgDiv)
    } else gridCol3.appendChild(newImgDiv)
    count++
    if (count > 3) {
      count = 1
    }
  }
}

mapImgs()

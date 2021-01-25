// Fetches images from database
const fetchImgs = async () => {
  const response = await fetch('/image')
  const data = await response.json()
  return data
}

//clears all the columns before filling them to prevent duplicated images
const clearCols = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

//maps images into gallery
const mapImgs = async () => {
  //fetches images from database
  const images = await fetchImgs()

  // masonry grid column elements
  const gridCol1 = document.querySelector('.grid-col--1')
  const gridCol2 = document.querySelector('.grid-col--2')
  const gridCol3 = document.querySelector('.grid-col--3')

  //clear cols of previous images
  clearCols(gridCol1)
  clearCols(gridCol2)
  clearCols(gridCol3)

  // splits images into 3 grid columns
  let count = 1
  const width = window.innerWidth > 0 ? window.innerWidth : screen.width

  for (let i = 0; i < images.length; i++) {
    if (width < 600) {
      count = 1
    }
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

//runs mapImgs on page load
mapImgs()

//reruns mapImgs on window resize
window.addEventListener('resize', mapImgs)

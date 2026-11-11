import connectDB from '@/lib/db'
import { Image } from '@/lib/models'
import { imageUrl } from '@/lib/images'
import Gallery from './Gallery'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'Photo Gallery | Red Oak Landscaping Inc' }

async function getImages() {
  try {
    await connectDB()
    const images = await Image.find({}).lean()
    return images.map(({ src, alt }) => ({ src: imageUrl(src), alt }))
  } catch (error) {
    console.error(error)
    return null
  }
}

export default async function GalleryPage() {
  const images = await getImages()
  return (
    <>
      <p id='galleryTitle'>Photo Gallery</p>
      <div id='gallery'>
        {images ? <Gallery images={images} /> : "Couldn't load images"}
      </div>
    </>
  )
}

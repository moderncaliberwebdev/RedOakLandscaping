import { del } from '@vercel/blob'
import connectDB from '@/lib/db'
import { Image } from '@/lib/models'
import { getAuthUser } from '@/lib/auth'
import { imageName } from '@/lib/images'

export const dynamic = 'force-dynamic'

export async function GET() {
  await connectDB()
  const images = await Image.find({}).lean()
  return Response.json(images.map(({ src, alt }) => ({ src, alt })))
}

// Saves a record for an image already uploaded to Vercel Blob
export async function POST(request) {
  if (!(await getAuthUser(request))) {
    return Response.json({ message: 'Not authorized' }, { status: 401 })
  }
  const { url } = await request.json()
  if (!url?.includes('.blob.vercel-storage.com/')) {
    return Response.json({ message: 'Invalid image' }, { status: 400 })
  }

  await connectDB()
  const image = await Image.create({ src: url, alt: imageName(url) })
  return Response.json({ src: image.src, alt: image.alt })
}

export async function DELETE(request) {
  if (!(await getAuthUser(request))) {
    return Response.json({ message: 'Not authorized' }, { status: 401 })
  }
  const { src } = await request.json()

  await connectDB()
  const image = await Image.findOneAndDelete({ src })
  if (!image) return Response.json({ message: 'Image not found' }, { status: 404 })

  if (src.includes('.blob.vercel-storage.com/')) await del(src)
  return Response.json({ message: 'Image Deleted' })
}

// Old records store paths relative to /public (e.g. "galleryImgs/img1.jpg");
// new uploads store full Vercel Blob URLs.
export const imageUrl = (src) => (/^https?:\/\//.test(src) ? src : `/${src}`)

export const imageName = (src) => decodeURIComponent(src.split('/').pop())

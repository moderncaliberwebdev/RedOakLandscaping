'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { upload } from '@vercel/blob/client'
import { imageName, imageUrl } from '@/lib/images'

export default function Admin() {
  const router = useRouter()
  const [token, setToken] = useState(null)
  const [images, setImages] = useState([])
  const [status, setStatus] = useState('')

  const authHeaders = { Authorization: `Bearer ${token}` }

  const loadImages = useCallback(async () => {
    const res = await fetch('/api/images', { cache: 'no-store' })
    setImages(await res.json())
  }, [])

  useEffect(() => {
    const stored = localStorage.getItem('token')
    const checkAuth = async () => {
      const res = stored && (await fetch('/api/auth', { headers: { Authorization: `Bearer ${stored}` } }))
      if (res?.ok) {
        setToken(stored)
        loadImages()
      } else {
        localStorage.removeItem('token')
        router.replace('/login')
      }
    }
    checkAuth()
  }, [router, loadImages])

  const handleUpload = async (e) => {
    const file = e.target.files[0]
    e.target.value = ''
    if (!file) return

    setStatus('Uploading...')
    try {
      const blob = await upload(`galleryImgs/${file.name}`, file, {
        access: 'public',
        handleUploadUrl: '/api/images/upload',
        headers: authHeaders,
      })
      const res = await fetch('/api/images', {
        method: 'POST',
        headers: { ...authHeaders, 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: blob.url }),
      })
      if (!res.ok) throw new Error((await res.json()).message)
      setStatus('')
      loadImages()
    } catch (error) {
      console.error(error)
      setStatus('Upload failed. Images must be JPG or PNG.')
    }
  }

  const deleteImg = async (src) => {
    if (!confirm(`Delete ${imageName(src)}?`)) return
    await fetch('/api/images', {
      method: 'DELETE',
      headers: { ...authHeaders, 'Content-Type': 'application/json' },
      body: JSON.stringify({ src }),
    })
    loadImages()
  }

  return (
    <div className='mainContainer' style={{ display: token ? 'block' : 'none' }}>
      <p id='galleryTitle'>Admin</p>
      <main id='adminMain'>
        <form onSubmit={(e) => e.preventDefault()}>
          <input type='file' name='file' id='file' className='inputfile' accept='image/jpeg,image/png' onChange={handleUpload} />
          <label htmlFor='file' className='admin__add'>
            <img src='/images/plus.png' alt='Add New' className='admin__add__image' /> Add New
          </label>
        </form>
        {status && <p>{status}</p>}

        {images.map(({ src }) => (
          <div className='admin__upload' key={src}>
            <div className='admin__upload__imgCont'>
              <img className='admin__upload__thumb' src={imageUrl(src)} alt={imageName(src)} />
            </div>
            <p className='admin__upload__text'>{imageName(src)}</p>
            <p className='admin__upload__x' onClick={() => deleteImg(src)}>X</p>
          </div>
        ))}
      </main>
    </div>
  )
}

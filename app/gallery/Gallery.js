'use client'

import { useEffect, useState } from 'react'

const MOBILE_WIDTH = 600

// Masonry layout: images go round-robin into 3 columns, or all into one on mobile
export default function Gallery({ images }) {
  const [colCount, setColCount] = useState(3)

  useEffect(() => {
    const update = () => setColCount(window.innerWidth < MOBILE_WIDTH ? 1 : 3)
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const columns = [[], [], []]
  images.forEach((image, i) => columns[i % colCount].push(image))

  return (
    <div className='grid'>
      {columns.map((col, i) => (
        <div key={i} className={`grid-col grid-col--${i + 1}`}>
          {col.map((image) => (
            <div className='grid-item' key={image.src}>
              <img src={image.src} alt={image.alt} className='galleryImg' loading='lazy' />
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

'use client'

import { useState } from 'react'

const fields = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['address', 'Address'],
  ['city', 'City'],
  ['state', 'State'],
  ['zip', 'Zip Code'],
]

export default function EstimateForm() {
  const [formResponse, setFormResponse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form))

    document.getElementById('galleryTitle')?.scrollIntoView({ behavior: 'smooth' })
    // Hidden honeypot field: only bots fill it in
    if (data.msg) return

    setFormResponse('Sending...')
    try {
      const res = await fetch('/api/email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const { formResponse } = await res.json()
      if (formResponse) {
        setFormResponse(formResponse)
      } else {
        setFormResponse('Message Sent')
        form.reset()
      }
    } catch {
      setFormResponse('Something went wrong, please try again')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p id='formResponse'>{formResponse}</p>
      {fields.map(([name, placeholder]) => (
        <input key={name} type='text' name={name} placeholder={placeholder} className='textarea' id={name} />
      ))}
      <input type='text' name='msg' placeholder='msg' className='spamMsg' id='spamMsg' tabIndex={-1} autoComplete='off' />
      <textarea name='message' placeholder='Comments' className='textarea' id='message' />
      <button type='submit'>Get Your Estimate</button>
    </form>
  )
}

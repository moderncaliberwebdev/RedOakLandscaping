'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const router = useRouter()
  const [formResponse, setFormResponse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { username, password } = Object.fromEntries(new FormData(e.currentTarget))

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
    const data = await res.json().catch(() => ({}))

    if (res.ok && data.token) {
      localStorage.setItem('token', data.token)
      router.push('/admin')
    } else {
      setFormResponse('Username or Password Invalid')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <p id='formResponse'>{formResponse}</p>
      <input type='text' name='username' placeholder='Username' className='login__input' id='username' />
      <input type='password' name='password' placeholder='Password' className='login__input' id='password' />
      <button type='submit'>Log In</button>
    </form>
  )
}

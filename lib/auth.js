import jwt from 'jsonwebtoken'
import connectDB from './db'
import { User } from './models'

export const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' })

// Returns the user for a valid "Bearer <token>" header, otherwise null
export async function getAuthUser(request) {
  const header = request.headers.get('authorization') || ''
  if (!header.startsWith('Bearer ')) return null
  try {
    const decoded = jwt.verify(header.split(' ')[1], process.env.JWT_SECRET)
    await connectDB()
    return await User.findById(decoded.id).select('-password')
  } catch {
    return null
  }
}

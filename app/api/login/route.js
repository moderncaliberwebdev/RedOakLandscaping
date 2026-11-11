import connectDB from '@/lib/db'
import { User } from '@/lib/models'
import { generateToken } from '@/lib/auth'

export async function POST(request) {
  const { username, password } = await request.json()

  await connectDB()
  const user = await User.findOne({ username })

  if (user && (await user.matchPassword(password))) {
    return Response.json({ username: user.username, token: generateToken(user._id) })
  }
  return Response.json({ message: 'Username or Password Invalid' }, { status: 401 })
}

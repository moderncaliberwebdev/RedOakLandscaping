import { getAuthUser } from '@/lib/auth'

export async function GET(request) {
  const user = await getAuthUser(request)
  return Response.json({ auth: !!user }, { status: user ? 200 : 401 })
}

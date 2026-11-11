import { handleUpload } from '@vercel/blob/client'
import { getAuthUser } from '@/lib/auth'

// Issues short-lived tokens so the admin page can upload straight to Vercel Blob
export async function POST(request) {
  const body = await request.json()
  try {
    const result = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        if (!(await getAuthUser(request))) throw new Error('Not authorized')
        return {
          allowedContentTypes: ['image/jpeg', 'image/png'],
          addRandomSuffix: true,
        }
      },
    })
    return Response.json(result)
  } catch (error) {
    return Response.json({ message: error.message }, { status: 400 })
  }
}

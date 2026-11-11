import sendEstimate from '@/lib/mail'

export async function POST(request) {
  const data = await request.json()
  const formResponse = await sendEstimate(data)
  return Response.json({ formResponse })
}

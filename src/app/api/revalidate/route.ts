import { revalidatePath } from 'next/cache'
import { type NextRequest } from 'next/server'
 
export async function GET(request: NextRequest) {
  const path = request.nextUrl.searchParams.get('path')
  
  if (path) {
    revalidatePath(path)
  } else {
    revalidatePath('/', 'layout')
  }

  return Response.json({ revalidated: true, now: Date.now() })
}

export async function POST(request: Request) {
  const formData = await request.formData()
  return Response.json(formData)
}
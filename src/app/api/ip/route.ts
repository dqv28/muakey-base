import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0] || 'Unknown IP'

  return NextResponse.json({ ip })
}

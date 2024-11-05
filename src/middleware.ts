import { revalidatePath } from "next/cache"
import { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  // console.log(request.url)
}
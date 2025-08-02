import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')
  
  if (code) {
    try {
      await supabase.auth.exchangeCodeForSession(code)
      return NextResponse.redirect(new URL('/', request.url))
    } catch (_error) {
      // Using underscore to indicate intentionally unused parameter
      return NextResponse.redirect(new URL('/login?error=auth', request.url))
    }
  }
  
  return NextResponse.redirect(new URL('/login', request.url))
}
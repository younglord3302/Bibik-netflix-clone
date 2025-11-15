import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from './jwt'

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string
    email: string
  }
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<Response>) {
  return async (req: NextRequest): Promise<Response> => {
    const token = req.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 })
    }

    const payload = verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const authReq: AuthenticatedRequest = req
    authReq.user = {
      userId: payload.userId,
      email: payload.email,
    }

    return handler(authReq)
  }
}

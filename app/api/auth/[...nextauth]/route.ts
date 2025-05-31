import { authOptions } from '@/lib/auth-options'
import NextAuth from 'next-auth'

const handler = NextAuth(authOptions)

export { handler as POST, handler as GET }

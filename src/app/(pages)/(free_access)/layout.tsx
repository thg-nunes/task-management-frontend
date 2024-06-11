'use client'
import React, { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function FreeAccessLayout({ children }: { children: ReactNode }) {
  const router = useRouter()
  const session = useSession()

  React.useEffect(() => {
    if (session.status === 'authenticated') router.push('/home')
    return () => {}
  }, [session.status, router])

  return <>{session.status === 'unauthenticated' && children}</>
}

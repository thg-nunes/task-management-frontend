'use client'
import React, { ReactNode } from 'react'
import { redirect } from 'next/navigation'
import { useSession } from 'next-auth/react'

export default function FreeAccessLayout({ children }: { children: ReactNode }) {
  const session = useSession()

  React.useEffect(() => {
    if (session.status === 'authenticated') redirect('/home')
    return () => {}
  }, [session.status])

  return <>{session.status === 'unauthenticated' && children}</>
}

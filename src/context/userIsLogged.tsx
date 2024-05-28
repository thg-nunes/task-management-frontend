'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'

const RenderPrivateRouter = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const session = useSession()

  React.useEffect(() => {
    if (session.status === 'unauthenticated')
      signOut({ redirect: true, callbackUrl: '/login' })

    return () => {}
  }, [session.status, pathname])

  return <>{session.status === 'authenticated' && children}</>
}

export { RenderPrivateRouter }

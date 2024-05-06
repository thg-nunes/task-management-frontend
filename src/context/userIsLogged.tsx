'use client'
import React from 'react'
import { signOut, useSession } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'

const RenderPrivateRouter = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const session = useSession()

  React.useEffect(() => {
    if (session.status === 'unauthenticated')
      signOut({ redirect: true, callbackUrl: '/login' })

    return push('/home')
  }, [pathname, session])

  return <>{children}</>
}

export { RenderPrivateRouter }

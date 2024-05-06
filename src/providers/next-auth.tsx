'use client'

import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

/**
 * @function NextAuthSessionProvider - usada para fornecer acesso a sessão do usuário
 * criada pelo next-auth
 */
export const NextAuthSessionProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  return <SessionProvider>{children}</SessionProvider>
}

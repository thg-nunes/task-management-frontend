'use client'
import { usePathname } from 'next/navigation'
import { ReactNode, createContext, useContext, useEffect, useState } from 'react'

type UserIsLoggedContextProps = {
  isLogged: boolean
}

const UserIsLogged = createContext<UserIsLoggedContextProps>(
  {} as UserIsLoggedContextProps
)

const UserIsLoggedProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const [isLogged] = useState(false)

  useEffect(() => {
    localStorage.getItem('taskMgm@islogged')
  }, [pathname])

  return <UserIsLogged.Provider value={{ isLogged }}>{children}</UserIsLogged.Provider>
}

const useUserIsLogged = () => {
  return useContext(UserIsLogged)
}

export { useUserIsLogged, UserIsLoggedProvider }

'use client'
import React, { useContext } from 'react'
import { usePathname } from 'next/navigation'

type UserIsLoggedContextProps = {
  isLogged: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const UserIsLogged = React.createContext<UserIsLoggedContextProps>(
  {} as UserIsLoggedContextProps
)

const UserIsLoggedProvider = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname()
  const [isLogged, setIsLogged] = React.useState(false)

  React.useEffect(() => {
    localStorage.getItem('taskMgm@islogged')
  }, [pathname])

  return (
    <UserIsLogged.Provider value={{ isLogged, setIsLogged }}>
      {children}
    </UserIsLogged.Provider>
  )
}

const useUserIsLogged = () => {
  return useContext(UserIsLogged)
}

export { useUserIsLogged, UserIsLoggedProvider }

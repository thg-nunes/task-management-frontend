'use client'
import React, { useContext } from 'react'
import { usePathname, useRouter } from 'next/navigation'

type UserIsLoggedContextProps = {
  isLogged: boolean
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
}

const UserIsLogged = React.createContext<UserIsLoggedContextProps>(
  {} as UserIsLoggedContextProps
)

const UserIsLoggedProvider = ({ children }: { children: React.ReactNode }) => {
  const { push } = useRouter()
  const pathname = usePathname()
  const [isLogged, setIsLogged] = React.useState(false)

  React.useEffect(() => {
    if (!localStorage.getItem('taskMgm@islogged')) return push('/login')
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

import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { render, renderHook } from '@testing-library/react'

import { UserIsLoggedProvider, useUserIsLogged } from '@context/userIsLogged'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}))
const useStateMock = useState as jest.Mock

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))
const usePathnameMock = usePathname as jest.Mock

describe('<UserIsLogged />', () => {
  beforeAll(() => {
    useStateMock.mockReturnValue([false, jest.fn()])
  })

  it('should call getItem method of localStorage when UserIsLoggedProvider render', async () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem')

    render(
      <UserIsLoggedProvider>
        <div>App</div>
      </UserIsLoggedProvider>
    )

    expect(getItemSpy).toHaveBeenCalledWith('taskMgm@islogged')
  })

  it('should call getItem method of localStorage when pathname change', async () => {
    usePathnameMock.mockReturnValue('/')

    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem')

    const { rerender } = render(
      <UserIsLoggedProvider>
        <div>App</div>
      </UserIsLoggedProvider>
    )

    usePathnameMock.mockReturnValue('/any_path')

    rerender(
      <UserIsLoggedProvider>
        <div>App</div>
      </UserIsLoggedProvider>
    )

    expect(getItemSpy.mock.calls.length).toBe(2)
  })

  it('should return isLogged value and function to change state value', async () => {
    const { result } = renderHook(() => useUserIsLogged(), {
      wrapper: ({ children }) => <UserIsLoggedProvider>{children}</UserIsLoggedProvider>,
    })

    expect(result.current.isLogged).toBe(false)
    expect(result.current.setIsLogged).toBeTruthy()
  })
})

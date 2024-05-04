import React from 'react'
import { usePathname } from 'next/navigation'
import { render } from '@testing-library/react'

import { UserIsLoggedProvider } from '@context/userIsLogged'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
}))

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))
const usePathnameMock = usePathname as jest.Mock

describe('<UserIsLogged />', () => {
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
})

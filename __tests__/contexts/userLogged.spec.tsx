import React from 'react'
import { render } from '@testing-library/react'

import { UserIsLoggedProvider } from '@context/userIsLogged'

jest.mock('react', () => ({
  ...jest.requireActual('react'),
}))

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

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
})

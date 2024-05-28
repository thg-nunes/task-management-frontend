import { render } from '@testing-library/react'
import { signOut, useSession } from 'next-auth/react'

import { RenderPrivateRouter } from '@context/userIsLogged'

jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
  signOut: jest.fn(),
}))
const useSessionMock = useSession as jest.Mock

jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}))

describe('<UserIsLogged />', () => {
  it('should call useSession method of next-auth when RenderPrivateRouter render', async () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated' } as any)

    render(
      <RenderPrivateRouter>
        <div>App</div>
      </RenderPrivateRouter>
    )

    expect(useSession).toHaveBeenCalled()
  })

  it('should redirect user to login page if user is not unauthenticated', async () => {
    useSessionMock.mockReturnValue({ status: 'unauthenticated' } as any)

    render(
      <RenderPrivateRouter>
        <div>App</div>
      </RenderPrivateRouter>
    )

    expect(signOut).toHaveBeenCalledWith({ redirect: true, callbackUrl: '/login' })
  })
})

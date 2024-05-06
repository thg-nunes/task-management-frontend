import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { act, renderHook, waitFor } from '@testing-library/react'

import { toastify } from '@utils/toastify'
import { useConfigSignForm, handleSignIn } from '@hooks/pages/login'

jest.mock('next-auth/react', () => ({
  signIn: jest.fn(),
}))
const signInMock = signIn as jest.Mock

jest.mock('@utils/toastify')

jest.mock('next/navigation')
const useRouterMock = useRouter as jest.Mock

describe('hook handleSignIn', () => {
  beforeAll(() => {
    useRouterMock.mockReturnValue({ push: jest.fn() })
  })

  it('should call push of useRouter if sign is success', async () => {
    const fakeSignData = {
      email: 'fake@example.com',
      password: '123456',
    }

    signInMock.mockResolvedValue({ ok: true })

    renderHook(() => handleSignIn(fakeSignData, useRouterMock().push))

    await waitFor(() =>
      expect(signIn).toHaveBeenCalledWith('credentials', {
        redirect: false,
        ...fakeSignData,
      })
    )
    await waitFor(() => expect(useRouterMock().push).toHaveBeenCalledWith('/home'))
  })

  it('should call toastify if sign fails', async () => {
    const fakeSignData = {
      email: 'fake@example.com',
      password: '123456',
    }

    signInMock.mockResolvedValue({ error: true, ok: false })

    renderHook(() => handleSignIn(fakeSignData, useRouterMock().push))

    await waitFor(() =>
      expect(toastify).toHaveBeenCalledWith('Email ou senha icorreta.', {
        type: 'error',
      })
    )
  })

  it('ensures that email and password fields is required', async () => {
    const { result } = renderHook(() => useConfigSignForm())

    act(() => {
      result.current.handleSubmit({
        email: '',
        password: '',
      } as any)
    })

    const { errors } = await result.current.control._executeSchema(['email', 'password'])

    expect(errors.email?.type).toBe('required')
    expect(errors.password?.type).toBe('required')
  })
})

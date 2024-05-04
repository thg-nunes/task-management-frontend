jest.mock('next/navigation')

import { useRouter } from 'next/navigation'
import { MockedResponse } from '@apollo/client/testing'
import { act, renderHook } from '@testing-library/react'

import { toastify } from '@utils/toastify'
import { GQL_SIGNUP } from '@gql/mutations/user'
import { useConfigSignUpForm, useHandleSignUp } from '@hooks/pages/cadastro'
import { ApolloClientTestProvider } from '@utils/apollo-client-test-provider'

jest.mock('@utils/toastify')
jest.mock('next/navigation')

const useRouterMock = useRouter as jest.Mock

describe('hook useHandleSignUp', () => {
  it('should redirect user to home page if signUp is success', async () => {
    const createUser: MockedResponse = {
      request: {
        operationName: 'createUser',
        query: GQL_SIGNUP,
      },
      variableMatcher: () => true,
      result: {
        data: {
          createUser: {
            id: 'fake_id',
            username: 'jhon_doe',
            email: 'jhon_doe@gmail.com',
          },
        },
      },
    }

    const fakePush = jest.fn()
    useRouterMock.mockReturnValue({ push: fakePush })

    const { result } = renderHook(useHandleSignUp, {
      wrapper: ({ children }) => (
        <ApolloClientTestProvider mocks={[createUser]}>
          {children}
        </ApolloClientTestProvider>
      ),
    })

    await act(async () => await result.current.signUpMutationFn())

    expect(fakePush).toHaveBeenCalledWith('/home')
  })

  it('shold render toast with error message if opataion of signUp throws', async () => {
    const fakeError = new Error('Error to sign')
    const createUserError: MockedResponse = {
      request: {
        operationName: 'createUser',
        query: GQL_SIGNUP,
      },
      error: fakeError,
    }

    const { result } = renderHook(useHandleSignUp, {
      wrapper: ({ children }) => {
        return (
          <ApolloClientTestProvider mocks={[createUserError]}>
            {children}
          </ApolloClientTestProvider>
        )
      },
    })

    await act(() => result.current.signUpMutationFn())

    expect(toastify).toHaveBeenCalledWith(fakeError.message, {
      type: 'error',
    })
  })

  it('ensures that the fields to register user is required to send form', async () => {
    const { result } = renderHook(() => useConfigSignUpForm())

    act(() => {
      result.current.handleSubmit({
        username: '',
        password: '',
        email: '',
        passwordConfirmation: '',
      } as any)
    })

    const { errors } = await result.current.control._executeSchema([
      'username',
      'password',
      'email',
      'passwordConfirmation',
    ])

    expect(errors.username?.message).toBe('O nome de usuário é obrigatório.')
    expect(errors.email?.message).toBe('O email é obrigatório.')
    expect(errors.password?.message).toBe('A senha é obrigatória.')
    expect(errors.passwordConfirmation?.message).toBe(
      'A confirmação de senha é obrigatória.'
    )
  })
})

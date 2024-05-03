jest.mock('next/navigation')

import { useRouter } from 'next/navigation'
import { MockedResponse } from '@apollo/client/testing'
import { act, renderHook } from '@testing-library/react'

import { GQL_SIGNUP } from '@gql/mutations/user'
import { useHandleSignUp } from '@hooks/pages/cadastro'
import { ApolloClientTestProvider } from '@utils/apollo-client-test-provider'

jest.mock('next/navigation')

const useRouterMock = useRouter as jest.Mock

describe('hook useHandleSignUp', () => {
  it('should redirect user to home page if sign is success', async () => {
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
})

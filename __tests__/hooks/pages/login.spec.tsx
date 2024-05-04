import { act, renderHook } from '@testing-library/react'

import { useHandleSignIn } from '@hooks/pages/login'
import { ApolloClientTestProvider } from '@utils/apollo-client-test-provider'
import { MockedResponse } from '@apollo/client/testing'
import { GQL_SIGNIN } from '@gql/mutations/user'
import { useRouter } from 'next/navigation'

jest.mock('next/navigation')
const useRouterMock = useRouter as jest.Mock

describe('hook useHandleSignIn', () => {
  it('should call push of useRouter if sign is success', async () => {
    const fakeQueryResponse: MockedResponse = {
      request: {
        query: GQL_SIGNIN,
        operationName: 'sign',
      },
      variableMatcher: () => true,
      result: {
        data: {
          token: 'fake_token',
          refresh_token: 'fake_refresh_token',
        },
      },
    }

    const fakePush = jest.fn()
    useRouterMock.mockReturnValue({ push: fakePush })

    const { result } = renderHook(() => useHandleSignIn(), {
      wrapper: ({ children }) => (
        <ApolloClientTestProvider mocks={[fakeQueryResponse]}>
          {children}
        </ApolloClientTestProvider>
      ),
    })

    await act(() => result.current.signInMutationFn())

    expect(useRouterMock().push).toHaveBeenCalledWith('/home')
  })
})

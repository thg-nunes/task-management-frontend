import React from 'react'
import { useRouter } from 'next/navigation'
import { MockedResponse } from '@apollo/client/testing'
import { act, renderHook, waitFor } from '@testing-library/react'

import { useSignOut } from '@hooks/signOut'
import { GQL_SIGNOUT } from '@gql/mutations/user'
import { ApolloClientTestProvider } from '@utils/apollo-client-test-provider'
import { toastify } from '@utils/toastify'

jest.mock('@utils/toastify')
jest.mock('next/navigation')
const useRouterMock = useRouter as jest.Mock

describe('hook signOut', () => {
  it('should remove item from localStorage and redirect user to login page on call useSignOut hook', async () => {
    const fakePush = jest.fn()
    useRouterMock.mockReturnValue({ push: fakePush })

    const fakeSignOutResponse: MockedResponse = {
      request: {
        query: GQL_SIGNOUT,
        operationName: 'signOut',
      },
      result: {
        data: {
          signOut: true,
        },
      },
    }

    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem')

    const { result } = renderHook(() => useSignOut(), {
      wrapper: ({ children }) => (
        <ApolloClientTestProvider mocks={[fakeSignOutResponse]}>
          {children}
        </ApolloClientTestProvider>
      ),
    })

    await act(async () => await result.current.handlSignout())

    expect(removeItemSpy).toHaveBeenCalledWith('taskMgm@islogged')
    await waitFor(() => expect(fakePush).toHaveBeenCalledWith('/login'))
  })

  it('should render toastify if call useSignOut hook throws', async () => {
    const fakeError = new Error('fake error message')
    const fakeSignOutResponse: MockedResponse = {
      request: {
        query: GQL_SIGNOUT,
        operationName: 'signOut',
      },
      error: fakeError,
    }

    const { result } = renderHook(() => useSignOut(), {
      wrapper: ({ children }) => (
        <ApolloClientTestProvider mocks={[fakeSignOutResponse]}>
          {children}
        </ApolloClientTestProvider>
      ),
    })

    await act(async () => await result.current.handlSignout())

    await waitFor(() =>
      expect(toastify).toHaveBeenCalledWith(fakeError.message, {
        type: 'error',
      })
    )
  })
})

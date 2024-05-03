import { ReactNode } from 'react'
import { MockedProvider, MockedResponse } from '@apollo/client/testing'

/**
 * @function ApolloClientTestProvider - essa função é responsável por conter a config
 * necessária testar os hooks do apollo client
 * @param param0
 * @returns
 */
export const ApolloClientTestProvider = ({
  children,
  mocks,
}: {
  children: ReactNode
  mocks: readonly MockedResponse<any, any>[]
}): JSX.Element => {
  return (
    <MockedProvider mocks={mocks} addTypename={false}>
      {children}
    </MockedProvider>
  )
}

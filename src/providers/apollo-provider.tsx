'use client'

import { ReactNode } from 'react'
import { ApolloProvider } from '@apollo/client'

import { apolloClient } from '@services/apollo'

/**
 * @function ApolloContextProvider - usada para fornecer acesso ao contexto do apollo
 * onde for necessário
 */
export const ApolloContextProvider = ({
  children,
}: {
  children: ReactNode
}): JSX.Element => {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}

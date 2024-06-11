import { onError } from '@apollo/client/link/error'
import { RetryLink } from '@apollo/client/link/retry'
import { ApolloClient, HttpLink, InMemoryCache, from, fromPromise } from '@apollo/client'

import { requestToServerWithFetchApi } from '@utils/request-to-server-with-fetchApi'

const refreshToken = async () => {
  await requestToServerWithFetchApi<{
    refresh_token: boolean
  }>({
    query: `mutation refresh_token {
      refresh_token 
    }`,
  })
}

const authErrorLink = onError(({ graphQLErrors, networkError, operation, forward }) => {
  if (graphQLErrors) {
    const isUnauthorized = graphQLErrors.some(
      (error) => error.extensions.code === 'FORBIDDEN'
    )

    if (isUnauthorized) {
      return fromPromise(
        refreshToken()
          // Reenviar a operação com o novo token
          .then(() => forward(operation))
          .catch((err) => {
            console.error('Failed to refresh token:', err)
            return
          })
      ).flatMap(() => forward(operation))
    }
  }

  if (networkError) {
    console.error('Network error:', networkError)
  }

  return forward(operation)
})

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 5,
    retryIf: (error, _operation) => !!error,
  },
})

const kttpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_APOLLO_SERVER_URI,
  credentials: 'include',
})

/**
 * @constant apolloClient - instancia única do apollo-client para usar no app
 */
export const apolloClient = new ApolloClient({
  link: from([authErrorLink, retryLink, kttpLink]),
  cache: new InMemoryCache(),
})

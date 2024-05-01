import { ApolloClient, InMemoryCache } from '@apollo/client'

/**
 * @constant apolloClient - instancia única do apollo-client para usar no app
 */
export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_APOLLO_SERVER_URI,
  cache: new InMemoryCache(),
})

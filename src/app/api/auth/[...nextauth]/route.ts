import { cookies } from 'next/headers'
import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { requestToServerWithFetchApi } from '@utils/request-to-server-with-fetchApi'

type SignResponse = {
  signIn: {
    id: string
    token: string
    refresh_token: string
    email: string
    username: string
  }
}

/**
 * @namespace SIGN_MUTATION - string que contém a mutation de sign, isso é usado
 * para executar o sign do user no apollo server e obter os dados para usar com o next-auth
 */
const SIGN_MUTATION = `
  mutation signIn($signData: SignInput!) {
    signIn(signData: $signData) {
      id
      email
      username
      token
      refresh_token
    }
  }
`

/**
 * @namespace authOptions - objeto de configuração das opções do next-auth
 */
export const authOptions: NextAuthOptions = {
  pages: { signIn: '/login' },
  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url === '/login') {
        cookies().delete('authToken')
        cookies().delete('refresh_token')
        return `${baseUrl}${url}`
      }
      return baseUrl
    },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const response = await requestToServerWithFetchApi<SignResponse>({
          query: SIGN_MUTATION,
          variables: {
            signData: { email: credentials?.email, password: credentials?.password },
          },
        })

        if (response?.signIn) {
          const { username, ...rest } = response.signIn

          cookies().set({
            name: 'authToken',
            value: rest.token,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
          })

          cookies().set({
            name: 'refresh_token',
            value: rest.refresh_token,
            domain: 'localhost',
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
          })

          return {
            ...rest,
            name: username,
          }
        }

        return null
      },
    }),
  ],
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }

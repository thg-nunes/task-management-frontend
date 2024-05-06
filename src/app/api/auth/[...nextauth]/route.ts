import NextAuth, { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { requestToServerWithFetchApi } from '@utils/request-to-server-with-fetchApi'

type SignResponse = {
  sign: { id: string; email: string; username: string }
}
/**
 * @namespace SIGN_QUERY_MUTATION - string que contém a mutation de sign, isso é usado
 * para executar o sign do user no apollo server e obter os dados para usar com o next-auth
 */
const SIGN_QUERY_MUTATION = `
  mutation sign($signData: SignInput!) {
    sign(signData: $signData) {
      id
      email
      username
    }
}`

/**
 * @namespace authOptions - objeto de configuração das opções do next-auth
 */
export const authOptions: NextAuthOptions = {
  pages: { signIn: '/login' },
  jwt: {
    maxAge: 60 * 60 * 24, // 1d
  },
  callbacks: {
    // async session({ user, token }) {
    // fazer estratégia de revalidação de token
    // },
  },
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'text' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        const response = await requestToServerWithFetchApi<SignResponse>({
          query: SIGN_QUERY_MUTATION,
          variables: {
            signData: { email: credentials?.email, password: credentials?.password },
          },
        })

        if (response.sign) {
          const { username, ...rest } = response.sign
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

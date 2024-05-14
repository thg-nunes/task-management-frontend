import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import { ToastContainer } from 'react-toastify'

import { NextAuthSessionProvider } from '@providers/next-auth'
import { ApolloContextProvider } from '@providers/apollo-provider'

import './globals.css'
import 'react-toastify/dist/ReactToastify.css'

const inter = Poppins({ subsets: ['latin'], weight: ['400', '600', '700'] })

export const metadata: Metadata = {
  title: {
    template: 'TKM - %s',
    default: 'TKM',
  },
  description:
    'Esse projeto foi desenvolvido com o intuito de aplicar os conhecimentos de graphql\
     e também estudar as novas funcionalidades da integradas ao nextjs a partir da versão 13.',
  keywords: ['nextjs', 'graphql', 'apollo', 'react'],
  creator: 'Thiago Nunes',
  applicationName: 'Task Management',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-gray-900`}>
        <ApolloContextProvider>
          <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        </ApolloContextProvider>
        <ToastContainer />
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import './globals.css'

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
      <body className={`${inter.className} bg-gray-900`}>{children}</body>
    </html>
  )
}

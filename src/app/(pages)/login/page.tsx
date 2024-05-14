import { Metadata } from 'next'
import Image from 'next/image'

import { Logo } from '@components/logo'
import { SignInForm } from './client-components/signForm'

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Essa página é responsável por permitir que o usuário realize seu\
  login no sistema ou seja redirecionado para a página onde possa criar sua conta.',
}

export default function Login() {
  return (
    <main className="h-svh overflow-y-scroll px-6">
      <div className="grid h-full grid-rows-5">
        <Logo />

        <div className="row-span-3 mx-auto h-max w-full space-y-6">
          <Image
            width={256}
            height={256}
            src="/illustrations/welcome_cats.svg"
            alt="imagem de 2 gatos sentados em cima de um texto que diz welcome"
            className="mx-auto size-64"
          />
          <h2 className="mx-auto text-center text-2xl font-semibold">
            Bem Vindo de volta!
          </h2>
          <SignInForm />
        </div>
      </div>
    </main>
  )
}

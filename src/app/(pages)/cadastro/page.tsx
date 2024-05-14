import { Metadata } from 'next'
import Image from 'next/image'

import { Logo } from '@components/logo'
import { SignUpForm } from './client-components/signUpForm'

export const metadata: Metadata = {
  title: 'Cadastro',
  description:
    'Essa página é responsável por permitir que o usuário realize a\
  criação de uma conta para acessar o sistema.',
}

export default function SignUp() {
  return (
    <main className="h-svh overflow-y-scroll px-6">
      <div className="grid h-full grid-rows-5">
        <Logo />

        <div className="row-span-3 mx-auto h-max w-full space-y-6">
          <Image
            width={256}
            height={256}
            src="/illustrations/signUp.svg"
            alt="imagem de 2 gatos sentados em cima de um texto que diz welcome"
            className="mx-auto size-64"
          />
          <h2 className="mx-auto text-center text-2xl font-semibold">Criar Conta</h2>
          <SignUpForm />
        </div>
      </div>
    </main>
  )
}

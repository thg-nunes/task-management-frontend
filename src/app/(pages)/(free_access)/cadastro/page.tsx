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
    <main className="h-svh overflow-y-scroll px-6 lg:px-0">
      <div className="grid h-full grid-rows-5 lg:grid-cols-2 lg:grid-rows-6">
        <Logo />
        <div className="mx-auto h-screen lg:col-start-2 lg:grid lg:w-full lg:grid-rows-6 lg:bg-[#8257e5]">
          <Image
            width={256}
            height={256}
            src="/illustrations/signUp.svg"
            alt="imagem de 2 gatos sentados em cima de um texto que diz welcome"
            className="size-64 md:size-72 lg:row-start-3 lg:mx-auto lg:hidden lg:size-96"
          />
        </div>
        <div className="row-span-3 mx-auto h-max w-full pt-10 md:pt-[80px] lg:row-start-2 lg:pt-0">
          <h2 className="mx-auto text-center text-2xl font-semibold">Criar Conta</h2>
          <SignUpForm />
        </div>
      </div>
    </main>
  )
}

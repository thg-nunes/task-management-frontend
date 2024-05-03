import Image from 'next/image'
import { Metadata } from 'next'

import { Logo } from '@components/logo'
import { SignInForm } from './client-components/signForm'

export const metadata: Metadata = {
  title: 'Login',
  description:
    'Essa página é responsável por permitir que o usuário realize seu\
  login no sistema ou seja redirecionado para a página onde possa criar sua conta.',
}

export default function Login() {
  // APLICAR RESPONSIVIDADE
  return (
    <main className="h-svh overflow-y-scroll px-6 lg:px-0">
      <div className="grid h-full grid-rows-5 lg:grid-cols-2 lg:grid-rows-6">
        <Logo className="lg:row-start-2" />
        <Image
          width={256}
          height={256}
          src="/illustrations/welcome_cats.svg"
          alt="imagem de 2 gatos sentados em cima de um texto que diz welcome"
          className="mx-auto size-56 lg:col-start-1 lg:hidden"
        />
        <div className="row-span-3 mx-auto h-max w-full lg:row-start-3">
          <h2 className="mx-auto text-center text-2xl font-semibold">
            Bem Vindo de volta!
          </h2>
          <SignInForm />
        </div>
        <div className="hidden h-screen bg-[#8257e5] pl-10 lg:col-start-2 lg:grid lg:grid-rows-6 lg:rounded-l-full">
          <Image
            width={256}
            height={256}
            src="/illustrations/completed_tasks.svg"
            alt="imagem de 2 pessoas segurando 1 papel cada 1 ambas estão olhando para um papel com tasks a serem feitas e 1 já está concluída"
            className="justify-self-center lg:row-start-3 lg:size-80 xl:size-[416px]"
          />
          <Image
            width={256}
            height={256}
            src="/illustrations/people_in_pc.svg"
            alt="imagem de 1 cara sentado na mesa do pc, ele está posicionado como se estivesse olhando para as outras 2 pessoas"
            className="mr-10 justify-self-end lg:row-start-2 lg:size-40 xl:size-60"
          />
        </div>
      </div>
    </main>
  )
}

'use client'
import Link from 'next/link'
import { useState } from 'react'
import { PiSignIn } from 'react-icons/pi'
import { Controller } from 'react-hook-form'

import { handleSignIn, useConfigSignForm } from '@hooks/pages/login'

import { Button } from '@components/button'
import { InputContainer, InputElement, InputLabel } from '@components/input'
import { useRouter } from 'next/navigation'

/**
 * @function SignInForm - função usada para criar e retornar um formulário com os inputs necessários
 * para logar um user. Esse componente foi criado para tornar possível a usabilidade de hooks do
 * apollo-client e validação dos campos do formulário.
 */
export const SignInForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false)
  const { push } = useRouter()
  const { control, handleSubmit } = useConfigSignForm()

  return (
    <form
      className="mx-auto flex flex-col pb-40 md:w-3/4 md:max-w-[514px] lg:pb-0"
      onSubmit={handleSubmit(async ({ email, password }) => {
        setIsLoading(true)
        await handleSignIn({ email, password }, push)
        setIsLoading(false)
      })}
    >
      <Controller
        name="email"
        control={control}
        render={({
          field: { value, onChange },
          formState: {
            errors: { email },
          },
        }) => {
          return (
            <InputContainer
              className="items-end gap-2"
              inputErrorMessage={email?.message}
            >
              <InputLabel htmlFor="emailInput" labelText="email" />
              <InputElement
                value={value}
                onChange={onChange}
                id="emailInput"
                placeholder="e-mail"
                type="email"
                hasError={!!email?.message}
              />
            </InputContainer>
          )
        }}
      />
      <Controller
        name="password"
        control={control}
        render={({
          field: { value, onChange },
          formState: {
            errors: { password },
          },
        }) => {
          return (
            <InputContainer
              className="items-end gap-2"
              inputErrorMessage={password?.message}
            >
              <InputLabel htmlFor="passwordInput" labelText="password" />
              <InputElement
                value={value}
                onChange={onChange}
                id="passwordInput"
                placeholder="******"
                type="password"
                hasError={!!password?.message}
              />
            </InputContainer>
          )
        }}
      />

      <Button className="mt-10" type="submit" isLoading={isLoading}>
        Sign
        <PiSignIn className="size-6" />
      </Button>
      <Link
        href="/cadastro"
        className="mt-5 h-max rounded-md bg-zinc-500 p-3 text-center text-white transition-all duration-150 ease-linear hover:bg-zinc-500/90"
      >
        Criar conta
      </Link>
    </form>
  )
}

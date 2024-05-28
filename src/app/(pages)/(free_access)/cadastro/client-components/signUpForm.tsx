'use client'
import { signIn } from 'next-auth/react'
import { PiSignIn } from 'react-icons/pi'
import { useRouter } from 'next/navigation'
import { Controller } from 'react-hook-form'

import { useConfigSignUpForm, useHandleSignUp } from '@hooks/pages/cadastro'

import { Button } from '@components/button'
import { InputContainer, InputElement, InputLabel } from '@components/input'

/**
 * @function SignUpForm - função usada para criar e retornar um formulário com os inputs necessários
 * para cadastrar um user no sistema. Esse componente foi criado para tornar possível a usabilidade
 * de hooks do apollo-client e validação dos campos do formulário.
 */
export const SignUpForm = (): JSX.Element => {
  const { push } = useRouter()
  const { loading, signUpMutationFn } = useHandleSignUp()
  const { control, handleSubmit } = useConfigSignUpForm()

  return (
    <form
      className="mx-auto flex flex-col pb-40 md:w-3/4 md:max-w-[514px] lg:pb-0"
      onSubmit={handleSubmit(async ({ email, password, username }) => {
        // faz cadastro da conta no banco de dados
        await signUpMutationFn({
          variables: { userData: { email, username, password } },
        })

        // cria a sessão com o next-auth
        await signIn('credentials', {
          redirect: false,
          email,
          password,
        })

        push('/home')
      })}
    >
      <Controller
        name="username"
        control={control}
        render={({
          field: { value, onChange },
          formState: {
            errors: { username },
          },
        }) => {
          return (
            <InputContainer
              className="items-end gap-2"
              inputErrorMessage={username?.message}
            >
              <InputLabel htmlFor="usernameInput" labelText="Usuário" />
              <InputElement
                value={value}
                onChange={onChange}
                id="usernameInput"
                placeholder="username"
                type="text"
                hasError={!!username?.message}
              />
            </InputContainer>
          )
        }}
      />
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
              <InputLabel htmlFor="passwordInput" labelText="Senha" />
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

      <Controller
        name="passwordConfirmation"
        control={control}
        render={({
          field: { value, onChange },
          formState: {
            errors: { passwordConfirmation },
          },
        }) => {
          return (
            <InputContainer
              className="items-end gap-2"
              inputErrorMessage={passwordConfirmation?.message}
            >
              <InputLabel
                htmlFor="passwordConfirmationInput"
                labelText="Confirme a Senha"
              />
              <InputElement
                value={value}
                onChange={onChange}
                id="passwordConfirmationInput"
                placeholder="******"
                type="password"
                hasError={!!passwordConfirmation?.message}
              />
            </InputContainer>
          )
        }}
      />
      <Button className="mt-10" type="submit" isLoading={loading}>
        Criar Conta
        <PiSignIn className="size-6" />
      </Button>
    </form>
  )
}

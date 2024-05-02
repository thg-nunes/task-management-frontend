'use client'
import { PiSignIn } from 'react-icons/pi'
import { Controller } from 'react-hook-form'

import { useHandleSignUp } from '@hooks/pages/cadastro'

import { Button } from '@components/button'
import { InputContainer, InputElement, InputLabel } from '@components/input'

/**
 * @function SignUpForm - função usada para criar e retornar um formulário com os inputs necessários
 * para cadastrar um user no sistema. Esse componente foi criado para tornar possível a usabilidade
 * de hooks do apollo-client e validação dos campos do formulário.
 */
export const SignUpForm = (): JSX.Element => {
  const {
    form: { control, handleSubmit },
    mutation: { loading, signUpMutationFn },
  } = useHandleSignUp()

  return (
    <form
      className="flex flex-col pb-40"
      onSubmit={handleSubmit(async ({ email, password, username }) => {
        await signUpMutationFn({ variables: { userData: { email, username, password } } })
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
                placeholder="Username"
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
                placeholder="Email"
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
                placeholder="Password"
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
                placeholder="Password confirmation"
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

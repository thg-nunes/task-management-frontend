'use client'
import { PiSignIn } from 'react-icons/pi'
import { Controller } from 'react-hook-form'

import { useHandleSignIn } from '@hooks/pages/login'

import { Button } from '@components/button'
import { InputContainer, InputElement, InputLabel } from '@components/input'

/**
 * @function SignInForm - função usada para criar e retornar um formulário com os inputs necessários
 * para logar um user. Esse componente foi criado para tornar possível a usabilidade de hooks do
 * apollo-client e validação dos campos do formulário.
 */
export const SignInForm = (): JSX.Element => {
  const {
    form: { control, handleSubmit },
    mutation: { loading, signInMutationFn },
  } = useHandleSignIn()

  return (
    <form
      className="flex flex-col"
      onSubmit={handleSubmit(
        async ({ email, password }) =>
          await signInMutationFn({ variables: { signData: { email, password } } })
      )}
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
              <InputLabel htmlFor="passwordInput" labelText="password" />
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

      <Button className="mt-10" type="submit" isLoading={loading}>
        Sign
        <PiSignIn className="size-6" />
      </Button>
    </form>
  )
}

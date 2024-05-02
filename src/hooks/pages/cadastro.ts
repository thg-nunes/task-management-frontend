/**
 * @file Esse arquivo contém todos os hooks usados pela página de cadastro ou que tem
 * alguma relação com a página
 */

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'

import { GQL_SIGNUP } from '@gql/mutations/user'
import { toastify } from '@utils/toastify'

/**
 * @function useHandleSignUp - hook responsável por encapsular toda a config
 * necessária para o user criar uma conta no sistema
 * @returns {Object} -
 */
const useHandleSignUp = () => {
  const { push } = useRouter()
  /**
   * @namespace signUpSchema - esse objeto contém a config responsável por validar os campos
   * do formulário de signUp
   */
  const signUpSchema = yup.object({
    username: yup
      .string()
      .required('O nome de usuário é obrigatório.')
      .max(12, 'O nome de usuário pode ter no máximo 12 caractéries.'),
    email: yup
      .string()
      .required('O email é obrigatório.')
      .email('Forneça um email válido.'),
    password: yup
      .string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve ter 6 dígitos no mínimo.')
      .max(12, 'A senha deve ter 12 dígitos no máximo.'),
    passwordConfirmation: yup
      .string()
      .required('A confirmação de senha é obrigatória.')
      .min(6, 'A senha deve ter 6 dígitos no mínimo.')
      .max(12, 'A senha deve ter 12 dígitos no máximo.')
      .test('password', 'A confirmação de senha está errada.', (value, { parent }) => {
        return value === parent.password
      }),
  })

  const [signUpMutationFn, { data, loading }] = useMutation<{
    id: string
    username: string
    email: string
  }>(GQL_SIGNUP, {
    onCompleted() {
      push('/home')
    },
    onError(error) {
      return toastify(error.message, {
        type: 'error',
      })
    },
  })

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(signUpSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  return {
    mutation: { signUpMutationFn, loading },
    form: { handleSubmit, control },
  }
}

export { useHandleSignUp }

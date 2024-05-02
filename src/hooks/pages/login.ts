/**
 * @file Esse arquivo contém todos os hooks usados pela página de login ou que tem
 * alguma relação com a página
 */

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { MutationFunctionOptions, useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'

import { GQL_SIGNIN } from '@gql/mutations/user'
import { toastify } from '@utils/toastify'

/**
 * @function useHandleSignIn - hook responsável por configurar a mutation de sign
 * @returns {Object} - o objeto de retorno contém a key chamada mutation: essa contém
 * a função responsável por fazer a chamada ao apollo server e uma veriável para
 * indicar se a chamada está em loading
 */
const useHandleSignIn = () => {
  const { push } = useRouter()

  const [signInMutationFn, { loading }] = useMutation(GQL_SIGNIN, {
    onCompleted() {
      push('/home')
    },
    onError(error) {
      return toastify(error.message, {
        type: 'error',
      })
    },
  })

  return { mutation: { signInMutationFn, loading } }
}

/**
 * @function useConfigForm - hook responsável por configurar tudo que é necessário
 * para validar os campos do formulário de sign
 * @returns {Object} - o objeto de retorno contém a key form: essa contém as funções e
 * variáveis necessárias para a manipulação e validação dos campos do formulário
 */
const useConfigForm = () => {
  /**
   * @namespace signinSchema - esse objeto contém a config responsável por validar os campos
   * do formulário de signin
   */
  const signinSchema = yup.object({
    email: yup
      .string()
      .required('O email é obrigatório.')
      .email('Forneça um email válido.'),
    password: yup
      .string()
      .required('A senha é obrigatória.')
      .min(6, 'A senha deve ter 6 dígitos no mínimo.')
      .max(12, 'A senha deve ter 12 dígitos no máximo.'),
  })

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return { form: { handleSubmit, control } }
}

export { useHandleSignIn, useConfigForm }

/**
 * @file Esse arquivo contém todos os hooks usados pela página de login ou que tem
 * alguma relação com a página
 */

import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { useMutation } from '@apollo/client'
import { yupResolver } from '@hookform/resolvers/yup'

import { GQL_SIGNIN } from '@gql/mutations/user'
import { toastify } from '@utils/toastify'

/**
 * @function useHandleSignIn - hook responsável por encapsular toda a config
 * necessária para o user fazer login
 * @returns {Object} - o objeto de retorno contém a key form(essa contém as funções e
 * variáveis necessárias para a manipulação dos campos do formulário) e uma segunda key
 * chamada mutation(essa contém a função responsável por fazer a chamada ao apollo server
 * e uma veriável para indicar se a chamada está em loading)
 */
const useHandleSignIn = () => {
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

  const [signInMutationFn, { loading }] = useMutation(GQL_SIGNIN, {
    onError(error) {
      toastify(error.message, {
        type: 'error',
      })
    },
  })

  const { handleSubmit, control } = useForm({
    resolver: yupResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  return {
    mutation: { signInMutationFn, loading },
    form: { handleSubmit, control },
  }
}

export { useHandleSignIn }

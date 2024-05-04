import { useRouter } from 'next/navigation'
import { useMutation } from '@apollo/client'

import { GQL_SIGNOUT } from '@gql/mutations/user'
import { toastify } from '@utils/toastify'

/**
 * @function useSignOut - hook responsável por configurar a mutation de signOut
 * @returns {Object} - o objeto de retorno contém a função responsável por fazer
 * a chamada ao apollo server para executar o signOut do usuário
 */
export const useSignOut = () => {
  const { push } = useRouter()

  const [handlSignout] = useMutation(GQL_SIGNOUT, {
    onCompleted() {
      localStorage.removeItem('taskMgm@islogged')
      push('/login')
    },
    onError(error) {
      toastify(error.message, {
        type: 'error',
      })
    },
  })

  return { handlSignout }
}

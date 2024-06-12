'use client'
import { useState } from 'react'
import { useQuery } from '@apollo/client'

import { GQL_GET_USER_PROFILE_DATA } from '@gql/mutations/user'

import { parseTimeStamp } from '@utils/parse-timestamp-to-date'

type UserDataProps = {
  getUser: {
    created_at: string
    email: string
    updated_at: string
    username: string
  }
}

/**
 * @function useFetchUserProfile - busca os dados do perfil do usuário
 * @param useFetchUserProfile.email - email do usuário logado que deve ser
 * enviado ao apollo-server
 */
const useFetchUserProfile = ({ email }: { email: string }) => {
  const [userData, setUserData] = useState<UserDataProps>()

  useQuery<UserDataProps>(GQL_GET_USER_PROFILE_DATA, {
    variables: { email },
    onCompleted({ getUser }) {
      const created_at_parsed = parseTimeStamp(getUser.created_at)
      const updated_at_parsed = parseTimeStamp(getUser.updated_at)

      setUserData({
        getUser: {
          ...getUser,
          created_at: created_at_parsed,
          updated_at: updated_at_parsed,
        },
      })
    },
    onError(error) {
      console.log('error => ' + error)
    },
  })

  return { userData }
}

export { useFetchUserProfile }

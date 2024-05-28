import { gql } from '@apollo/client'

/**
 * @namespace GQL_SIGNIN - mutation usada para fazer login no server
 */
export const GQL_SIGNIN = gql`
  mutation signIn($signData: SignInput!) {
    signIn(signData: $signData) {
      id
      email
      username
      token
      refresh_token
    }
  }

  fragment sign on SignResponse {
    id
    email
    username
    token
    refresh_token
  }
`

/**
 * @namespace GQL_SIGNUP - mutation usada para fazer cadastro de
 * usuário no server
 */
export const GQL_SIGNUP = gql`
  mutation create_account($userData: CreateAccountInput!) {
    createAccount(userData: $userData) {
      ...user
    }
  }

  fragment user on User {
    id
  }
`

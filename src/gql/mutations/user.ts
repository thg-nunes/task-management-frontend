import { gql } from '@apollo/client'

/**
 * @namespace GQL_SIGNIN - mutation usada para fazer login no server
 */
export const GQL_SIGNIN = gql`
  mutation sign($signData: SignInput!) {
    sign(signData: $signData) {
      ...sign
    }
  }

  fragment sign on SignResponse {
    token
    refresh_token
  }
`

/**
 * @namespace GQL_SIGNUP - mutation usada para fazer cadastro de
 * usuário no server
 */
export const GQL_SIGNUP = gql`
  mutation create_account($userData: CreateUserInput!) {
    createUser(userData: $userData) {
      ...userCreated
    }
  }

  fragment userCreated on User {
    id
    username
    email
  }
`

/**
 * @namespace GQL_SIGNOUT - mutation usada para fazer deslogar o
 * usuário do server
 */
export const GQL_SIGNOUT = gql`
  mutation logout {
    signOut
  }
`

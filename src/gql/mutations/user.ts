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

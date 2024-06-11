import { render } from '@testing-library/react'
import { ApolloClientTestProvider } from '@utils/apollo-client-test-provider'

import SignUp, { metadata } from '@pages/(free_access)/cadastro/page'

jest.mock('next/navigation', () => ({
  ...jest.requireActual('next/navigation'),
  useRouter() {
    return {
      push: jest.fn(),
    }
  },
}))

describe('<SignUp />', () => {
  it('should render metadata with title and description', () => {
    render(
      <ApolloClientTestProvider mocks={[]}>
        <SignUp />
      </ApolloClientTestProvider>
    )

    expect(metadata).toHaveProperty('title', 'Cadastro')
    expect(metadata).toHaveProperty('description')
  })
})

import { Logo } from '@components/logo'
import { render, screen } from '@testing-library/react'

describe('<Logo />', () => {
  it('should render image and text of logo', () => {
    render(<Logo />)

    expect(
      screen.getByText((_, element) => {
        return element?.tagName === 'svg'
      })
    ).toBeInTheDocument()
    expect(screen.getByText(/taskmgm/gi)).toBeInTheDocument()
  })
})

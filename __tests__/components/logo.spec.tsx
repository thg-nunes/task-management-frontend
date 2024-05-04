import { Logo } from '@components/logo'
import { render, screen } from '@testing-library/react'
import { twMerge } from 'tailwind-merge'

jest.mock('tailwind-merge')

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

  it('should call twMerge function in className of icon with correct params', () => {
    render(<Logo iconStyle="w-full" />)

    expect(twMerge).toHaveBeenCalledWith('size-12', 'w-full')
  })

  it('should call twMerge function in className of logo paragraph with correct params', () => {
    render(<Logo textStyle="h-max" />)

    expect(twMerge).toHaveBeenCalledWith('text-xl', 'h-max')
  })
})

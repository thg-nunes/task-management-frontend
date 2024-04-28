import { fireEvent, render, screen } from '@testing-library/react'
import { Button } from '@components/button'

describe('<Button />', () => {
  it('should call the function on click if a function is provided', () => {
    const fakeAction = jest.fn()

    render(<Button onClick={fakeAction} />)

    const button = screen.getByRole('button')

    fireEvent.click(button)

    expect(fakeAction).toHaveBeenCalled()
  })

  test('should render loading if button type is submit', () => {
    render(<Button isLoading={true} type="submit" />)

    const button = screen.getByRole('button')

    expect(button).toHaveProperty('type', 'submit')

    fireEvent.click(button)

    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })
})

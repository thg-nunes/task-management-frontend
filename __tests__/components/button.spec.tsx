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
})

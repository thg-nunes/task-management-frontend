import { render, screen } from '@testing-library/react'

import { InputContainer, InputElement, InputLabel } from '@components/input'

describe('<Input />', () => {
  it('should render input with correct content when composite', () => {
    const placeholder = 'Email'
    const type = 'email'
    const labelText = 'Email'
    const labelHtmlForm = 'inputEmail'
    render(
      <InputContainer>
        <InputLabel htmlFor={labelHtmlForm} labelText={labelText} />
        <InputElement id={labelHtmlForm} placeholder={placeholder} type={type} />
      </InputContainer>
    )

    const input = screen.getByPlaceholderText(placeholder)
    const label = screen.getByText(labelText)

    expect(input).toHaveAttribute('type', type)
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', labelHtmlForm)
    expect(input).toHaveAttribute('id', labelHtmlForm)
  })

  it('should render error message if input generate an error', () => {
    const placeholder = 'Email'
    const type = 'email'
    const labelText = 'Email'
    const labelHtmlForm = 'inputEmail'

    render(
      <InputContainer inputErrorMessage="Fake error message">
        <InputLabel htmlFor={labelHtmlForm} labelText={labelText} />
        <InputElement id={labelHtmlForm} placeholder={placeholder} type={type} />
      </InputContainer>
    )

    const errorMessage = screen.getByText('Fake error message')

    expect(errorMessage).toBeInTheDocument()
  })
})

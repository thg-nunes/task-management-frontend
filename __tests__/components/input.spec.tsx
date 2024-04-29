import { render, screen } from '@testing-library/react'

import { Input } from '@components/input'

describe('<Input />', () => {
  it('should render label and input if input type is email', () => {
    const placeholder = 'Email'
    const type = 'email'
    const labelText = 'Email'
    const labelHtmlForm = 'inputEmail'
    render(
      <Input
        placeholder={placeholder}
        type={type}
        labelText={labelText}
        labelHtmlForm={labelHtmlForm}
      />
    )

    const input = screen.getByPlaceholderText(placeholder)
    const label = screen.getByText(labelText)

    expect(input).toHaveAttribute('type', type)
    expect(label).toBeInTheDocument()
    expect(label).toHaveAttribute('for', labelHtmlForm)
    expect(input).toHaveAttribute('id', labelHtmlForm)
  })
})

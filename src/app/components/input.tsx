import { InputHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  labelText?: string
  labelHtmlForm?: string
}

export const Input = ({
  labelText = '',
  labelHtmlForm = '',
  ...rest
}: InputProps): JSX.Element => {
  return (
    <div>
      <label htmlFor={labelHtmlForm}>{labelText}</label>
      <input id={labelHtmlForm} {...rest} />
    </div>
  )
}

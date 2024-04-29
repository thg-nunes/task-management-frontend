import { InputHTMLAttributes } from 'react'

type InputElementProps = InputHTMLAttributes<HTMLInputElement>

export const InputElement = ({ ...rest }: InputElementProps): JSX.Element => {
  return <input {...rest} />
}

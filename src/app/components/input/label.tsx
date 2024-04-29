import { LabelHTMLAttributes } from 'react'

type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  labelText: string
}

export const InputLabel = ({ labelText, ...rest }: InputLabelProps): JSX.Element => {
  return <label {...rest}>{labelText}</label>
}

import { twMerge } from 'tailwind-merge'
import { LabelHTMLAttributes } from 'react'

type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  labelText: string
}

export const InputLabel = ({
  labelText,
  className,
  ...rest
}: InputLabelProps): JSX.Element => {
  return (
    <label className={twMerge('h-max w-max', className)} {...rest}>
      {labelText}
    </label>
  )
}

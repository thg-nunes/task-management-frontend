import { twMerge } from 'tailwind-merge'
import { LabelHTMLAttributes } from 'react'

type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  labelText: string
}

/**
 * @function InputLabel - função usada para criar e retornar uma label para usar com um input
 * @param {InputLabelProps} InputLabel - esse componente recebe todas as props
 * existentes na tag label
 * @param {boolean} InputLabel.labelText - usada para atribuir o texto a ser renderizado pela
 * label
 * @example uma das formas de usar o componente: <InputLabel htmlFor="emailInput" labelText="email" />
 */
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

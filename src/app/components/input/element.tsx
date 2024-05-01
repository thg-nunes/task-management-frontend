import { twMerge } from 'tailwind-merge'
import { InputHTMLAttributes } from 'react'

type InputElementProps = InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean
}

/**
 * @namespace INPUT_STYLES - esse objeto contém as duas possiveis estilizações para o input
 * @property {string} default - contém todas as classes para aplicar o estilo default do input
 * @property {string} error - contém todas as classes para aplicar estilo ao input em caso de erro
 */
const INPUT_STYLES = {
  default:
    'bg-zinc-800 rounded-sm border border-transparent focus-within:border-zinc-200 hover:border-zinc-200 pl-2 py-3 outline-none placeholder:text-zinc-400',
  error: 'bg-zinc-800 rounded-sm border border-red-400 pl-2 py-1 outline-none',
}

/**
 * @function InputElement - função usada para criar e retornar um input element
 * @param {InputElementProps} InputElementProperties - esse componente recebe todas as props
 * existentes na tag input
 * @param {boolean} InputElementProperties.hasError - usada para indicar se houve algum erro gerado
 * por um determinado input, baseado nela o estilo do input é aplicado de forma dinâmica
 * @example uma das formas de usar o componente: <InputElement hasError type="email" className="mt-3" />
 */
export const InputElement = ({
  hasError = false,
  className,
  ...rest
}: InputElementProps): JSX.Element => {
  return (
    <input
      className={twMerge(hasError ? INPUT_STYLES.error : INPUT_STYLES.default, className)}
      {...rest}
    />
  )
}

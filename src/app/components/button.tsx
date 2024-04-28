import { twMerge } from 'tailwind-merge'
import { ButtonHTMLAttributes } from 'react'

/**
 * @function Button - função responsável por retornar um botão com estilos pré-definidos que pode
 * ser reutilizado em qualquer lugar do app, esse componente tem a possibilidade de sobreescrita
 * de estilo sem a possibilidade de conflito de classes
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps - o componente pode receber qualquer
 * propriedade existente na tag button
 */
export const Button = ({
  children,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>): JSX.Element => {
  return (
    <button
      className={twMerge(
        'flex w-max items-center gap-3 rounded-md bg-violet-500 px-3 py-1 text-white transition-all duration-150 ease-linear hover:bg-violet-500/90',
        rest.className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

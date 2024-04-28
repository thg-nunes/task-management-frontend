import { twMerge } from 'tailwind-merge'
import { ButtonHTMLAttributes } from 'react'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isLoading?: boolean
}

/**
 * @function Button - função responsável por retornar um botão com estilos pré-definidos que pode
 * ser reutilizado em qualquer lugar do app, esse componente tem a possibilidade de sobreescrita
 * de estilo sem a possibilidade de conflito de classes
 * @param {ButtonHTMLAttributes<HTMLButtonElement>} ButtonProps - o componente pode receber qualquer
 * propriedade existente na tag button
 * @param {boolean} [ButtonProps.isLoading=false] - caso o botão seja do tipo submit é possível exibir
 * um spinner através dessa prop quando ele for clicado
 */
export const Button = ({
  isLoading = false,
  children,
  ...rest
}: ButtonProps): JSX.Element => {
  return (
    <button
      className={twMerge(
        'flex w-max items-center gap-3 rounded-md bg-violet-500 px-3 py-1 text-white transition-all duration-150 ease-linear hover:bg-violet-500/90',
        rest.className
      )}
      {...rest}
    >
      {isLoading ? (
        <>
          <span
            data-testid="spinner"
            className="size-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          />
          {children}
        </>
      ) : (
        children
      )}
    </button>
  )
}

import { AnchorHTMLAttributes } from 'react'

type LinkRootProps = AnchorHTMLAttributes<HTMLAnchorElement>

/**
 * @function LinkRoot - função responsável por retornar um link com estilos pré-definidos que pode
 * ser reutilizado em qualquer lugar do app,
 * @param {LinkRootProps} -  o componente pode receber qualquer propriedade existente na tag anchor
 */
export const LinkRoot = ({ href = '', ...rest }: LinkRootProps): JSX.Element => {
  return (
    <a className="flex items-center gap-2 px-3 py-2 leading-7" href={href} {...rest} />
  )
}

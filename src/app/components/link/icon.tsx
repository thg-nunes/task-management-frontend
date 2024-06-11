import { IconType } from 'react-icons'

type LinkRootProps = {
  Icon: IconType
}

/**
 * @function LinkIcon - função responsável por retornar um icone com tamanho pré-definido que pode
 * ser reutilizado em qualquer lugar do app
 * @param {IconType} LinkIcon.Icon- o componente recebe uma prop do tipo IconType do react-icons
 */
export const LinkIcon = ({ Icon }: LinkRootProps): JSX.Element => {
  return <Icon className="size-7" />
}

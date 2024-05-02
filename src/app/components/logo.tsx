import { twMerge } from 'tailwind-merge'
import { FcSerialTasks } from 'react-icons/fc'

type LogoProps = {
  textStyle?: string
  iconStyle?: string
}

/**
 * @function Logo - função usada para conter a composição da logo do app
 * @param {Object} LogoProps
 * @param {string} [LogoProps.textStyle=''] - caso necessário mudar estilo do texto
 * em algum lugar, basta passar as classes tailwind para essa prop
 * @param {string} [LogoProps.iconStyle=''] - caso necessário mudar estilo do icone
 * em algum lugar, basta passar as classes tailwind para essa prop
 */
export const Logo = ({ textStyle = '', iconStyle = '' }: LogoProps): JSX.Element => {
  return (
    <div className="mx-auto flex w-max items-center gap-3">
      <FcSerialTasks className={twMerge('size-12', iconStyle)} />
      <p className={twMerge('text-xl', textStyle)}>TaskMgm</p>
    </div>
  )
}

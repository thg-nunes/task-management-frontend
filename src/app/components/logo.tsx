import { twMerge } from 'tailwind-merge'
import { FcSerialTasks } from 'react-icons/fc'
import { HTMLAttributes } from 'react'

type LogoProps = HTMLAttributes<HTMLDivElement> & {
  textStyle?: string
  iconStyle?: string
}

/**
 * @function Logo - função usada para conter a composição da logo do app
 * @param {LogoProps} LogoProps - o componente reber todas as props default da tag div
 * mais 2 para estilizar o texto e imagem da logo
 * @param {string} [LogoProps.textStyle=''] - caso necessário mudar estilo do texto
 * em algum lugar, basta passar as classes tailwind para essa prop
 * @param {string} [LogoProps.iconStyle=''] - caso necessário mudar estilo do icone
 * em algum lugar, basta passar as classes tailwind para essa prop
 */
export const Logo = ({
  textStyle = '',
  iconStyle = '',
  className,
  ...rest
}: LogoProps): JSX.Element => {
  return (
    <div
      className={twMerge('mx-auto flex w-max items-center gap md:gap-3', className)}
      {...rest}
    >
      <FcSerialTasks className={twMerge('size-10 md:size-12', iconStyle)} />
      <p className={twMerge('text-base lg:text-xl', textStyle)}>TaskMgm</p>
    </div>
  )
}

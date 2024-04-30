import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type InputContainerProps = HTMLAttributes<HTMLDivElement>

export const InputContainer = ({
  children,
  className,
  ...rest
}: InputContainerProps): JSX.Element => {
  return (
    <div className={twMerge('grid grid-rows-2 text-white', className)} {...rest}>
      {children}
    </div>
  )
}

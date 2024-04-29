import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type InputContainerProps = HTMLAttributes<HTMLDivElement>

export const InputContainer = ({
  children,
  className,
  ...rest
}: InputContainerProps): JSX.Element => {
  return (
    <div
      className={twMerge(
        'relative w-max max-w-56 rounded-sm border border-transparent bg-zinc-800 text-white focus-within:border-zinc-200 hover:border-zinc-200',
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}

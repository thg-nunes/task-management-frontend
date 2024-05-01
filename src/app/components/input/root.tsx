import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type InputContainerProps = HTMLAttributes<HTMLDivElement> & {
  inputErrorMessage?: string
}

export const InputContainer = ({
  children,
  className,
  inputErrorMessage = '',
  ...rest
}: InputContainerProps): JSX.Element => {
  return (
    <div className={twMerge('grid grid-rows-2 text-white', className)} {...rest}>
      {children}
      {inputErrorMessage && (
        <span className="text-sm text-red-300">{inputErrorMessage}</span>
      )}
    </div>
  )
}

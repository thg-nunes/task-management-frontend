import { twMerge } from 'tailwind-merge'
import { InputHTMLAttributes } from 'react'

type InputElementProps = InputHTMLAttributes<HTMLInputElement>

export const InputElement = ({ className, ...rest }: InputElementProps): JSX.Element => {
  return (
    <input
      className={twMerge(
        'bg-transparent rounded-sm border border-transparent focus-within:border-zinc-200 hover:border-zinc-200 bg-zinc-800 pl-2 py-1 outline-none placeholder:text-zinc-400',
        className
      )}
      {...rest}
    />
  )
}

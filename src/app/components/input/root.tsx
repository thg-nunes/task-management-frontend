import { HTMLAttributes } from 'react'

type InputContainerProps = HTMLAttributes<HTMLDivElement>

export const InputContainer = ({
  children,
  ...rest
}: InputContainerProps): JSX.Element => {
  return <div {...rest}>{children}</div>
}

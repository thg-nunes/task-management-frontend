import { HTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

type InputContainerProps = HTMLAttributes<HTMLDivElement> & {
  inputErrorMessage?: string
}
/**
 * @function InputContainer - função responsável por retornar o componente que pode ser
 * usado como container para uma label e input juntos
 * @param {InputContainerProps} InputContainerProps - o componente recebe todas as props
 * existentes na tag div
 * @param {string} InputContainerProps.inputErrorMessage - usada para passar a mensagem de
 * erro gerada por um determinado input
 * @example uma das formas de usar o componente: <InputContainer
                                                    className="items-end gap-2"
                                                    inputErrorMessage={email?.message}
                                                  >
                                                    <InputLabel htmlFor="emailInput" labelText="email" />
                                                    <InputElement id="emailInput" placeholder="Email" type="email" hasError={!!email?.message} />
                                                  </InputContainer>
 */
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

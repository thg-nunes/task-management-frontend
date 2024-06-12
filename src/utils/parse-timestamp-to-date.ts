/**
 * @function parseTimeStamp - transforma timestamp em string formatada no padrão BR
 * @param {string | number}parseTimeStamp.value - valor timestamp a ser formatado
 */
export const parseTimeStamp = (value: number | string): string => {
  if (typeof value === 'string')
    return new Date(parseInt(value)).toLocaleDateString('pt-BR')

  return new Date(value).toLocaleDateString('pt-BR')
}

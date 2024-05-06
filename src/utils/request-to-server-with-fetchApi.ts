/**
 * @async
 * @function requestToServerWithFetchApi - criada para usar em momentos que for
 * necessário fazer uma requisição para o apollo server e nao for dentro de um
 * componente, uma vez que fora de um componente não há acesso aos hooks do apollo-client
 * @param {string} RequestToServerWithFetchApiParams.query - para usar a função é
 * obrigatório fornecer a string de consulta a ser enviada para o servidor apollo
 * @param {any} [RequestToServerWithFetchApiParams.variables] - caso a string de consulta
 * necessite de variáveis, todas podem ser fornecidas aqui
 */
export const requestToServerWithFetchApi = async <T>({
  query,
  variables,
}: {
  query: string
  variables?: any
}): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_APOLLO_SERVER_URI}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query,
      variables,
    }),
  })

  const { data }: { data: T } = await response.json()
  return data
}

import { renderHook, waitFor } from '@testing-library/react'
import { requestToServerWithFetchApi } from '@utils/request-to-server-with-fetchApi'

describe('request-to-server-with-fetchApi', () => {
  it('should returns data parsed to json of api response', async () => {
    const fakeFetch = jest.fn(() =>
      Promise.resolve({ json: () => Promise.resolve({ data: {} }) })
    )

    // @ts-ignore
    global.fetch = fakeFetch

    const { result } = renderHook(
      async () =>
        await requestToServerWithFetchApi({
          query: 'fake_query',
        })
    )

    const response = await result.current.then((res) => res)

    await waitFor(() => expect(fakeFetch).toHaveBeenCalled())
    await waitFor(() => expect(response).toEqual({}))
  })
})

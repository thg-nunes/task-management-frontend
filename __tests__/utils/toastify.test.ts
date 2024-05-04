import { renderHook } from '@testing-library/react'

jest.mock('@utils/toastify')
import { toastify } from '@utils/toastify'

describe('@util/toastify', () => {
  it('should render toast with provided message', () => {
    renderHook(() =>
      toastify('any message', {
        type: 'success',
      })
    )

    expect(toastify).toHaveBeenCalledWith('any message', {
      type: 'success',
    })
  })

  it('should render toast with provided type', () => {
    renderHook(() =>
      toastify('any message', {
        type: 'error',
      })
    )

    expect(toastify).toHaveBeenCalledWith('any message', {
      type: 'error',
    })
  })
})

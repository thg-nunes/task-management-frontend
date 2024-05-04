import { renderHook } from '@testing-library/react'

jest.mock('@utils/toastify')
import { toastify } from '@utils/toastify'

describe('@util/toastify', () => {
  it('should render toast with provided message', () => {
    renderHook(() => toastify('any message'))

    expect(toastify).toHaveBeenCalledWith('any message')
  })
})

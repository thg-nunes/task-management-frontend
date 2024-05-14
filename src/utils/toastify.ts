import { toast, Bounce } from 'react-toastify'

export const toastify = (
  message: string,
  config: {
    theme?: 'light' | 'dark'
    type: 'info' | 'warning' | 'error' | 'success'
  }
) => {
  return toast[config.type](message, {
    position: 'top-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: config.theme || 'light',
    transition: Bounce,
  })
}

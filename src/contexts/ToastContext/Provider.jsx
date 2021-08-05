import React, { createContext, ReactNode, useCallback, useState } from 'react'
import { kebabCase } from 'lodash'

export const toastTypes = {
  DANGER: 'danger',
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning'
}

export const ToastsContext = createContext(undefined)

export const ToastsProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const toast = useCallback(
    ({ title, description, type }) => {
      setToasts((prevToasts) => {
        const id = title //kebabCase(title)

        // Remove any existing toasts with the same id
        const currentToasts = prevToasts.filter((prevToast) => prevToast.id !== id)

        return [
          {
            id,
            title,
            description,
            type,
          },
          ...currentToasts,
        ]
      })
    },
    [setToasts],
  )

  const toastError = (title, description) => {
    return toast({ title, description, type: toastTypes.DANGER })
  }
  const toastInfo = (title, description) => {
    return toast({ title, description, type: toastTypes.INFO })
  }
  const toastSuccess = (title, description) => {
    return toast({ title, description, type: toastTypes.SUCCESS })
  }
  const toastWarning = (title, description) => {
    return toast({ title, description, type: toastTypes.WARNING })
  }
  const clear = () => setToasts([])
  const remove = (id) => {
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id))
  }

  return (
    <ToastsContext.Provider value={{ toasts, clear, remove, toastError, toastInfo, toastSuccess, toastWarning }}>
      {children}
    </ToastsContext.Provider>
  )
}

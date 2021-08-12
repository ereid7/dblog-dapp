import React, { createContext, ReactNode, useCallback, useState, useEffect } from 'react'
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

  // TODO use this except instead of slicing right away, call remove on the toast
  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(
        () => setToasts(toasts => toasts.slice(1)),
        5200
      );
      return () => clearTimeout(timer)
    }
  }, [toasts])

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
  const remove = useCallback((id) => {
    console.log(`remove${id}`)
    setToasts((prevToasts) => prevToasts.filter((prevToast) => prevToast.id !== id))
  }, [toasts])

  const toast = useCallback(
    ({ title, description, type }) => {
      setToasts((prevToasts) => {
        const id = Math.random();

        // Remove any existing toasts with the same id
        const currentToasts = prevToasts.filter((prevToast) => prevToast.id !== id)

        return [
          {
            id,
            title,
            description,
            type,
            remove
          },
          ...currentToasts,
        ]
      })
    },
    [setToasts, remove],
  )

  return (
    <ToastsContext.Provider value={{ 
      toasts, 
      clear, 
      remove, 
      toastError, 
      toastInfo, 
      toastSuccess, 
      toastWarning 
    }}>
      {children}
    </ToastsContext.Provider>
  )
}

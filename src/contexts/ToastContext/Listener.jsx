import React from 'react'
import useToast from '../../hooks/useToast'
import ToastNotificationContainer from '../../components/ToastNotificationContainer/ToastNotificationContainer'

const ToastListener = () => {
  const { toasts, remove } = useToast()

  return <ToastNotificationContainer toasts={toasts} onRemove={() => console.log("onRemove")} />
}

export default ToastListener

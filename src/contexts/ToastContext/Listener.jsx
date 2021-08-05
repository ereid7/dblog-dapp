import React from 'react'
import useToast from '../../hooks/useToast'

const ToastListener = () => {
  const { toasts, remove } = useToast()

  const handleRemove = (id) => remove(id)

  return <div></div>
  //return <ToastContainer toasts={toasts} onRemove={handleRemove} />
}

export default ToastListener

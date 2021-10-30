import ToastContainer from 'react-bootstrap/ToastContainer'
import ToastNotification from '../ToastNotification/ToastNotification'
import './ToastNotificationContainer.css'
import { useEffect, useState } from 'react'
import React from 'react'
import useToast from '../../hooks/useToast'

const ToastNotificationContainer = (props) => {
  const { remove } = useToast()

  const [show, setShow] = useState(false)
  const [activeToastData, setActiveToasts] = useState({
    activeToasts: {}
  })

  useEffect(() => {
    setShow(true)
    
  }, [activeToastData])

  return (
    <ToastContainer className="toast-notification-container">
      {
        props.toasts.map((toast, index) => {
          return(
          <ToastNotification onClose={() => console.log(toast.id)} title={toast.title} description={toast.description} type={toast.type}  />
          )}
        )
      }
    </ToastContainer>
  )
}

export default ToastNotificationContainer

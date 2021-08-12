//import ToastContainer from 'react-bootstrap/ToastContainer
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'
import ToastNotification from '../ToastNotification/ToastNotification'
import './ToastNotificationContainer.css'
import { useEffect, useState, useCallback } from 'react'
import React from 'react'
import useToast from '../../hooks/useToast'
//https://latteandcode.medium.com/react-toast-an-implementation-with-the-context-api-and-hooks-f52fa564e4a8

// TODo figure out why toast is not auto removing
const ToastNotificationContainer = (props) => {
  const { remove } = useToast()

  const [show, setShow] = useState(false)
  const [activeToastData, setActiveToasts] = useState({
    activeToasts: {}
  })

  useEffect(() => {
    setShow(true)
    
  }, [activeToastData])


  // props.onRemove(toast.id)
  console.log(props.toasts)
  return (
    <ToastContainer className="toast-notification-container">
      {
        props.toasts.map((toast, index) => {
          return(
          <ToastNotification onClose={() => console.log(toast.id)} title={toast.title} description={toast.description} />
          )}
        )
      }
    </ToastContainer>
  )
}

export default ToastNotificationContainer

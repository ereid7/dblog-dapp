import Toast from 'react-bootstrap/Toast'
import { useState, useRef, useCallback } from 'react'
import React from 'react'
//https://latteandcode.medium.com/react-toast-an-implementation-with-the-context-api-and-hooks-f52fa564e4a8

const ToastNotification = (props) => {
  const [show, setShow] = useState(props.show)

  const closeHandler = useRef(props.onClose)
  const handleClose = useCallback(() => closeHandler.current(), [closeHandler])

  const onToastClose = () => {
    setShow(false)
    setTimeout(() => {
      handleClose()
    }, 100)
  }

  console.log(props)
  return(
    <Toast onClose={onToastClose} show={show} delay={5000} autohide>
      <Toast.Header closeButton={false}>
        {props.title}
      </Toast.Header>
      <Toast.Body>
        {props.description}
      </Toast.Body>
    </Toast>
  )
}

export default ToastNotification

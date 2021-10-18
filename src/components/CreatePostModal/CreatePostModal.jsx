
import Modal from 'react-bootstrap/Modal'
import { useCreateBlogData } from '../../hooks/useCreateBlogData'
import { useState, useEffect } from 'react'
import './CreatePostModal.css'
import { ipfsUploadStates, transactionStates } from '../../utils/enums'
import ListGroup from 'react-bootstrap/ListGroup'
import { useCreatePostData } from '../../hooks/useCreatePostData'
import Spinner from 'react-bootstrap/Spinner';
import { ReactComponent as SuccessIcon } from '../../assets/icons/check-circle.svg'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error-circle.svg'
import { ReactComponent as CircleIcon } from '../../assets/icons/circle.svg'

// TODO create hook responsible for checking recent wallet transactions, determining if any pending related to the dapp

const CreatePostModal = (props) => {
  //const [blogName, setBlogName] = useState('Blog Name')
  const [buttonText, setButtonText] = useState('Create')

  const onHide = () => {
    //setTransactionState(transactionStates.NO_REQUEST)

    props.onHide()
  }

  useEffect(() => {
    var buttonMessage = 'Publish'
    switch (props.transactionState) {
      case transactionStates.REQUESTING:
        buttonMessage = "Requesting Transaction..."
        break;
      case transactionStates.SUBMIT:
        buttonMessage = "Transaction Submit."
        break;
    }
    setButtonText(buttonMessage)
  }, [props.transactionState])

  const renderUploadIcon = () => {
    return (
      <span className="state-icon">
      { props.ipfsUploadState == ipfsUploadStates.NO_UPLOAD ? (
        <CircleIcon height="18px" width="18px" />
      ) : props.ipfsUploadState == ipfsUploadStates.UPLOADING ? (
        <Spinner className="publish-loading-spinner" animation="border" variant="secondary" size="sm" />
      ) : props.ipfsUploadState == ipfsUploadStates.SUCCESS ? (
        <SuccessIcon height="18px" width="18px" />
      ) : props.ipfsUploadState == ipfsUploadStates.ERROR ? (
        <ErrorIcon height="18px" width="18px" />
      ) : ''}
      </span>
    )
  }

  const renderSubmitIcon = () => {
    return (
      <span className="state-icon">
      { props.transactionState == transactionStates.NO_REQUEST ? (
        <CircleIcon height="18px" width="18px" />
      ) : props.transactionState == transactionStates.REQUESTING ? (
				<Spinner className="publish-loading-spinner" animation="border" variant="secondary" size="sm" />
			) : props.transactionState == transactionStates.SUBMIT ? (
        <SuccessIcon height="18px" width="18px" />
      ) : props.transactionState == transactionStates.ERROR ? (
        <ErrorIcon height="18px" width="18px" />
      ) : ''}
      </span>
    )
  }

  return (
    <Modal className="modal" show={props.show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Publish Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="title-input">
        <ListGroup>
          <ListGroup.Item>
            {renderUploadIcon()}
            Upload file to IPFS
          </ListGroup.Item>
          <ListGroup.Item>
            {renderSubmitIcon()}
            Submit Transasction
          </ListGroup.Item>
          {/* <ListGroup.Item variant="primary">Primary</ListGroup.Item>
          <ListGroup.Item variant="secondary">Secondary</ListGroup.Item>
          <ListGroup.Item variant="success">Success</ListGroup.Item>
          <ListGroup.Item variant="danger">Danger</ListGroup.Item>
          <ListGroup.Item variant="warning">Warning</ListGroup.Item>
          <ListGroup.Item variant="info">Info</ListGroup.Item>
          <ListGroup.Item variant="light">Light</ListGroup.Item>
          <ListGroup.Item variant="dark">Dark</ListGroup.Item> */}
        </ListGroup>
				<div className="input-group-append">
				</div>
			</div>
      <button onClick={props.onRequestPublish} disabled={props.transactionState !== transactionStates.NO_REQUEST} className="submit-btn btn btn-secondary btn-block btn-lg">{buttonText}</button>
      </Modal.Body>
    </Modal>
  )
}

export default CreatePostModal
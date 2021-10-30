
import Modal from 'react-bootstrap/Modal'
import { useCreateBlogData } from '../../hooks/useCreateBlogData'
import { useState, useEffect } from 'react'
import { transactionStates } from '../../utils/enums'

const CreateBlogModal = (props) => {
  const [blogName, setBlogName] = useState('Blog Name')
  const [buttonText, setButtonText] = useState('Create')

  const [transactionState, setTransactionState, onCreate] = useCreateBlogData()

  const onHide = () => {
    setTransactionState(transactionStates.NO_REQUEST)

    props.onHide()
  }

  useEffect(() => {
    var buttonMessage = 'Create'
    switch (transactionState) {
      case transactionStates.REQUESTING:
        buttonMessage = "Requesting Transaction..."
        break;
      case transactionStates.SUBMIT:
        buttonMessage = "Transaction Submit."
        break;
    }
    setButtonText(buttonMessage)
  }, [transactionState])

  return (
    <Modal className="modal" show={props.show} onHide={onHide} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Create Blog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <div className="title-input">
				<input 
				  type="text"
          onChange={e => setBlogName(e.target.value)}
					className="form-control form-control-lg"
					placeholder='Blog Name'
					required 
          disabled={transactionState !== transactionStates.NO_REQUEST} />
				<div className="input-group-append">
				</div>
			</div>
      <button onClick={() => onCreate(blogName)} disabled={transactionState !== transactionStates.NO_REQUEST} className="submit-btn btn btn-secondary btn-block btn-lg">{buttonText}</button>
      </Modal.Body>
    </Modal>
  )
}

export default CreateBlogModal
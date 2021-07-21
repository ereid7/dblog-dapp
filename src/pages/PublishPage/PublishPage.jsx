import React, { useState } from "react"
import "./PublishPage.css"
import { useHistory } from "react-router-dom";
import Page from '../../components/Page/Page'
import { ethers } from "ethers";
import { usePublishData } from "../../hooks/usePublishData";
import Card from 'react-bootstrap/Card';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal'
import { formatAccountAddress } from "../../utils/stringHelpers";

const PublishPage = (props) => {
	const history = useHistory();

  const [blogList, isLoading] = usePublishData()
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  // TODO check query as well on page load\
  // TODO create bloglist component
  // TODO make create blog a modal on this page instead of own page
  // TODO add blog description variable
  // TODO display message if no blogs created

  const navigateToBlog = (address) => {
    history.push(`/blog?id=${address}`);
  }

  const navigateToCreateBlog = () => {
    history.push('/createblog')
  }

  // TODO make css clickable class
  return (
		<Page isLoading={isLoading}>
      <div className="page-container">
        <h1 className="publish-title">Publish</h1>
        <div className="bloglist-container">
        {
          blogList.map((value, index) => {
            return (
              <div className="bloglist-item">
                <Card>
                  <Card.Body>
                    <Card.Title onClick={() => navigateToBlog(value.blogAddress)}><a>{value.blogName}</a></Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{value.postCount} Posts</Card.Subtitle>
                    <OverlayTrigger placement='right' overlay={
                      <Tooltip>
                        Copy Address to Clipboard
                      </Tooltip>
                    }>
                      <Card.Link href="#">{formatAccountAddress(value.blogAddress)}</Card.Link>
                    </OverlayTrigger>
                  </Card.Body>
                </Card>
              </div>
            )
          })
        }
        <button onClick={handleShow} className="newblog-btn btn btn-secondary btn-block btn-lg">New Blog</button>
        </div>
      </div>
      {/* TODO separate component */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="title-input">
					<input 
					  type="text"
            onChange={e => console.log(e.target.value)}
						className="form-control form-control-lg"
						placeholder="Blog Title"
						required />
					<div className="input-group-append">
					</div>
				</div>
        <button className="submit-btn btn btn-primary btn-block btn-lg">Create</button>
        </Modal.Body>
      </Modal>
    </Page>
  )
}


export default PublishPage

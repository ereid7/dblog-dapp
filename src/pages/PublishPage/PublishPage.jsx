import React, { useState } from "react"
import "./PublishPage.css"
import Page from '../../components/Page/Page'
import { usePublishData } from "../../hooks/usePublishData";
import CreateBlogModal from "../../components/CreateBlogModal/CreateBlogModal"
import BlogList from '../../components/BlogList/BlogList'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const PublishPage = (props) => {
  const [blogList, isLoading] = usePublishData()
  const { active } = useActiveWeb3React()

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = ()  => setShow(true);

  return (
		<Page>
      <div className="page-container">
        {
          active ? (
            <div className="owner-card">
              <Card>
                <Card.Body>
                    <Button onClick={handleShow} variant="outline-secondary">
                      Create Blog
                    </Button>
                </Card.Body>
              </Card>
            </div>
          ) : ''
				}
        <div className="bloglist-container">
        { 
          !active ? (
            <div className="no-blogs-container">
              <h4>Connect wallet to view your blogs</h4>
            </div>
          ) :
          (!isLoading && (blogList === undefined || blogList.length === 0)) ?
          (
            <div className="no-blogs-container">
              <h4> No blogs have been created with the connected address</h4>
            </div>
          ) : (
            <div>
              <BlogList isLoading={isLoading} blogList={blogList}></BlogList>
            </div>
          )
        }
        </div>
      </div>
      <CreateBlogModal show={show} onHide={handleClose} />
    </Page>
  )
}

export default PublishPage

import React, { useState } from "react"
import "./PublishPage.css"
import { useHistory } from "react-router-dom";
import Page from '../../components/Page/Page'
import { ethers } from "ethers";
import { usePublishData } from "../../hooks/usePublishData";
import CreateBlogModal from "../../components/CreateBlogModal/CreateBlogModal"
import BlogList from '../../components/BlogList/BlogList'

// TODO replace all double quotes with single quotes
// TODO display some text if wallet is not connected on this page

const PublishPage = (props) => {
  const [blogList, isLoading] = usePublishData()

  // TODO check query as well on page load\
  // TODO add blog description variable

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
		<Page isLoading={isLoading}>
      <div className="page-container">
        <h1 className="publish-title">Publish</h1>
        <div className="bloglist-container">
        {
          (blogList === undefined || blogList.length === 0) ?
            (
              <div className="no-blogs-container">
                <h4> No blogs have been created with the connected address</h4>
              </div>
            ) :
          <BlogList blogList={blogList}></BlogList>
        }
        <button onClick={handleShow} className="newblog-btn btn btn-secondary btn-block btn-lg">New Blog</button>
        </div>
      </div>
      <CreateBlogModal show={show} onHide={handleClose} />
    </Page>
  )
}

export default PublishPage

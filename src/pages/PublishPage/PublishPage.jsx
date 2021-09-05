import React, { useState } from "react"
import "./PublishPage.css"
import { useHistory } from "react-router-dom";
import Page from '../../components/Page/Page'
import { ethers } from "ethers";
import { usePublishData } from "../../hooks/usePublishData";
import CreateBlogModal from "../../components/CreateBlogModal/CreateBlogModal"
import BlogList from '../../components/BlogList/BlogList'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'

// TODO test
import useToast from '../../hooks/useToast'

// TODO replace all double quotes with single quotes

const PublishPage = (props) => {
  const [blogList, isLoading] = usePublishData()
  const { active } = useActiveWeb3React()

  // TODO TEST
  const { toastInfo } = useToast()

  // TODO check query as well on page load\
  // TODO add blog description variable

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = ()  => setShow(true);

  return (
		<Page>
      <div className="page-container">
        <h1 className="publish-title">Publish</h1>
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
              <button onClick={handleShow} className="newblog-btn btn btn-secondary btn-block btn-lg">New Blog</button>
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

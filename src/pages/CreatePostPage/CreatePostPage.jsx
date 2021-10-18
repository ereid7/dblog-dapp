import Page from '../../components/Page/Page'
import MDEditor from "@uiw/react-md-editor"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import CreatePostModal from "../../components/CreatePostModal/CreatePostModal"
import { useQuery } from '../../utils/routeUtils'
import { useDBlogContract } from '../../hooks/useContract'
import './CreatePostPage.css'
import { useEffect } from 'react'
import { useCreatePostData } from '../../hooks/useCreatePostData'
import { transactionStates } from '../../contexts/UserTransactionContext'


// todo verify wallet is connected
const CreatePostPage = (props) => {

  const blogId = useQuery().get("blogId")
  const history = useHistory();

  if (blogId == null) {
    history.push('/publish')
  }

  const [
    isLoading, 
    transactionState, 
    ipfsUploadState, 
    blogName, 
    value, 
    onTitleChanged, 
    onContentChanged, 
    onRequestPublish] = useCreatePostData(blogId)

  const onBlogSelected = (event) => {
    event.preventDefault()
    // TODO confirm exit page. cache data in local storage

    history.push(`/blog?id=${blogId}`)
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = ()  => setShow(true);

  return (
    <Page >
      <div className="page-container wide-container">
        <h1 className="createpost-title">Create Post</h1>
        <div className="subtitle-container">
          <div onClick={onBlogSelected} className="subtitle-item clickable">
            {blogName}
          </div>
          <div className="subtitle-item">
            Post {0}
          </div>
        </div>
        <div className="search-address-input input-group mb-4">
					<input 
					  type="text"
            onChange={e => {
              onTitleChanged(e.target.value)
            }}
						className="form-control form-control-lg"
						placeholder="Post Title"
						required />
					<div className="input-group-append">
					</div>
				</div>

        <MDEditor value={value} onChange={onContentChanged} />

        <button disabled={isLoading} onClick={handleShow} className="submit-btn btn btn-secondary btn-block btn-lg">Preview Publish</button>
      </div>
      <CreatePostModal 
        show={show} 
        onHide={handleClose} 
        blogId={blogId}
        transactionState={transactionState}
        ipfsUploadState={ipfsUploadState}
        onRequestPublish={onRequestPublish} />
    </Page>
  )
}

export default CreatePostPage
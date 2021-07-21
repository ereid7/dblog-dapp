import Page from '../../components/Page/Page'
import MDEditor from "@uiw/react-md-editor"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useQuery } from '../../utils/routeUtils'
import { useDBlogContract } from '../../hooks/useContract'
import './CreatePostPage.css'
import { useEffect } from 'react'


// todo verify wallet is connected
const CreatePostPage = (props) => {

  const history = useHistory();
  const [blogId, setBlogId] = useState(useQuery().get("blogId"))

  if (blogId == null) {
    history.push('/publish')
  }
  
  const [blogName, setBlogName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [postTitle, setPostTitle] = useState('')
  const [value, setValue] = useState('');
  const dBlogContract = useDBlogContract(blogId)

  const onContentChanged = (content) => {
    console.log(content)
    setValue(content)
  }

  // TODO make into hook
  const onRequestPublish = async () => {
    setIsLoading(true)
    try {
      await dBlogContract.publishBlogPost(postTitle, value, ["mockTag1", "mockTag2", "mockTag3"], true)
      // TODO wait for event. Need to update smart contract
    }
    catch(e) {

    }
    finally {
      setIsLoading(false)
    }
  }

  const onBlogSelected = (event) => {
    event.preventDefault()
    // TODO confirm exit page. cache data in local storage

    history.push(`/blog?id=${blogId}`)
  }

  // todo in hook
  useEffect(() => {
    const fetchData = async () => {
      const blogName = await dBlogContract.blogName()
      setBlogName(blogName);
    }
    fetchData();
  }, [])

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
            onChange={e => setPostTitle(e.target.value)}
						className="form-control form-control-lg"
						placeholder="Post Title"
						required />
					<div className="input-group-append">
					</div>
				</div>

        <MDEditor value={value} onChange={onContentChanged} />

        <button disabled={isLoading} onClick={onRequestPublish} className="submit-btn btn btn-secondary btn-block btn-lg">Publish</button>
      </div>
    </Page>
  )
}

export default CreatePostPage
import Page from '../../components/Page/Page'
import { useState } from "react"
import './CreateBlogPage.css'


// todo verify wallet is connected

const CreateBlogPage = (props) => {
  const [value, setValue] = useState('');

  const [isLoading, setIsLoading] = useState(false)

  const onContentChanged = (content) => {
    console.log(content)
    setValue(content)
  }

  // TODO make into hook
  const onRequestCreate = async () => {
    setIsLoading(true)
    try {
      //await dBlogContract.publishBlogPost(postTitle, value, ["mockTag1", "mockTag2", "mockTag3"], true)
      // TODO wait for event. Need to update smart contract
    }
    catch(e) {

    }
    finally {
      setIsLoading(false)
    }
  }

  return (
    <Page >
      <div className="blog-page-container">
        <h1 className="createblog-title">Create Blog</h1>
        <div className="search-address-input input-group mb-4">
					<input 
					  type="text"
            onChange={e => console.log(e.target.value)}
						className="form-control form-control-lg"
						placeholder="Blog Title"
						required />
					<div className="input-group-append">
					</div>
				</div>

        <button disabled={isLoading} onClick={onRequestCreate} className="submit-btn btn btn-primary btn-block btn-lg">Create</button>
      </div>
    </Page>
  )
}

export default CreateBlogPage
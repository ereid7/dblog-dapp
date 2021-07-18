import Page from '../../components/Page/Page'
import { useState } from "react"
import './CreateBlogPage.css'


// todo verify wallet is connected

const CreateBlogPage = (props) => {
  const [value, setValue] = useState('');

  const onContentChanged = (content) => {
    console.log(content)
    setValue(content)
  }

  return (
    <Page >
      <div className="page-container">
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
      </div>
    </Page>
  )
}

export default CreateBlogPage
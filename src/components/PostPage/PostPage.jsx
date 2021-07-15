import React, { useState } from "react"
import "./PostPage.css"
import DBlogContract from '../../abis/DBlogContract.json'
import DBlogPostContract from '../../abis/DBlogPostContract.json'
import { ReactComponent as LikeIcon } from '../../assets/icons/hand-thumbs-up.svg'
import { useEffect } from "react"
import { useHistory } from "react-router-dom";
import { useQuery } from '../../utils/route-utils'
import TagList from '../Tags/TagList';


const PostPage = (props) => {
	const history = useHistory();
  const web3 = window.web3

  const [postId, setPostId] = useState(useQuery().get("id"))
  //const [postContract,]
  const [postNum, setPostNum] = useState(0)
	const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [likeCount, setLikeCount] = useState(0)
  const [blogName, setBlogName] = useState('')
	const [tagList, setTagList] = useState([])


	const fetchPostData = async () => {
    //const networkId = await web3.eth.net.getId();
    // TODO if contract doesn't exist, navigate to read
    const dBlogPostContract = new web3.eth.Contract(DBlogPostContract.abi, postId)
    const blogAddress = await dBlogPostContract.methods.blog().call()
    const dBlogContract = new web3.eth.Contract(DBlogContract.abi, blogAddress)

    setTitle(await dBlogPostContract.methods.title().call())
    setContent(await dBlogPostContract.methods.content().call())
    setLikeCount(await dBlogPostContract.methods.likeCount().call())
    setPostNum(await dBlogPostContract.methods.postNum().call())
    setBlogName(await dBlogContract.methods.blogName().call())
    // TEMP
    setTagList(["tag1", "tag2"])
  }

	useEffect(() => {
    if (postId == null) {
      history.push('/read')
    }
    else {
      fetchPostData()
    }
	}, [history, postId])

  return (
		<div className="post-page">
      <div className="post-page-container">
        <h1 className="post-title">{title}</h1>
        <div className="post-subtitle-container">
          {/* TODO add blog click. seperate these into different elements */}
          <p>{blogName} - Post {postNum} - 5/12/2021</p>
        </div>
        <div className="post-content">
        {content}
        </div>
        <br />
        <TagList tagList={tagList}></TagList>
        <div className="post-footer-container">
          <div className="likes-display">
            <LikeIcon height="25px" width="25px" />
            <p className="likes-value">{likeCount}</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  )
}


export default PostPage

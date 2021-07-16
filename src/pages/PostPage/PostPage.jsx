import React, { useState } from "react"
import "./PostPage.css"
import DBlogContract from '../../abis/DBlogContract.json'
import DBlogPostContract from '../../abis/DBlogPostContract.json'
import { ReactComponent as LikeIcon } from '../../assets/icons/hand-thumbs-up.svg'
import { useEffect, useCallback } from "react"
import { useHistory } from "react-router-dom";
import { useQuery } from '../../utils/route-utils'
import TagList from '../../components/Tags/TagList';
import Page from '../../components/Page/Page'

const PostPage = (props) => {
	const history = useHistory();
  const web3 = window.web3

  const [blogContract, setBlogContract] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const [postData, setPostData] = useState({
    postId: useQuery().get("id"),
    postNum: 0,
    title: '',
    content: '',
    likeCount: 0,
    blogName: '',
    tagList: []
  })
  const setPartPostData = (partialData) => setPostData({ ...postData, ...partialData })

	const fetchPostData = useCallback(async () => {
    //const networkId = await web3.eth.net.getId();
    // TODO if contract doesn't exist, navigate to read
    const dBlogPostContract = new web3.eth.Contract(DBlogPostContract.abi, postData.postId)
    const blogAddress = await dBlogPostContract.methods.blog().call()
    const dBlogContract = new web3.eth.Contract(DBlogContract.abi, blogAddress)

    // TODO maybe just set address if its all we need
    setBlogContract(dBlogContract)

    setPartPostData({
      postNum: await dBlogPostContract.methods.postNum().call(),
      title: await dBlogPostContract.methods.title().call(),
      content: await dBlogPostContract.methods.content().call(),
      likeCount: await dBlogPostContract.methods.likeCount().call(),
      blogName: await dBlogContract.methods.blogName().call(),
      tagList: []
    })

    setIsLoading(false)
  })

  const onBlogSelected = (event) => {
    event.preventDefault()

    console.log(blogContract)
    history.push(`/blog?id=${blogContract._address}`)
  }

	useEffect(() => {
    if (postData.postId == null) {
      history.push('/read')
    }
    else {
      fetchPostData()
    }
	}, [history, postData])

  return (
		<Page isLoading={isLoading}>
      <div className="post-page-container">
        <h1 className="post-title">{postData.title}</h1>
        <div className="subtitle-container">
          <div onClick={onBlogSelected} className="subtitle-item clickable">
            <a>{postData.blogName}</a>
          </div>
          <div className="subtitle-item">
            Post {postData.postNum}
          </div>
          <div className="subtitle-item">
            5/12/2021
          </div>
        </div>
        <div className="post-content">
          {postData.content}
        </div>
        <br />
        <TagList tagList={postData.tagList}></TagList>
        <div className="post-footer-container">
          <div className="likes-display">
            <LikeIcon height="25px" width="25px" />
            <p className="likes-value">{postData.likeCount}</p>
          </div>
        </div>
        <hr />
      </div>
    </Page>
  )
}


export default PostPage

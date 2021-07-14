import React, { useState } from "react"
import "./BlogPage.css"
import { withRouter } from 'react-router-dom'
import DBlogContract from '../../abis/DBlogContract.json'
import DBlogPostContract from '../../abis/DBlogPostContract.json'
import { ReactComponent as LikeIcon } from '../../assets/icons/hand-thumbs-up.svg'
import { useEffect } from "react"

const BlogPage = (props) => {
	const [blogId, setBlogId] = useState('')
	const [title, setTitle] = useState('')
	const [postCount, setPostCount] = useState(0)
	//const [blogContract, setBlogContract] = useState(null) // TODO
	const [tagList, setTagList] = useState([])
	const [postList, setPostList] = useState([])

	const fetchBlogData = async (blogId) => {
		const web3 = window.web3
		const testAddress = blogId

		const blogContract = new web3.eth.Contract(DBlogContract.abi, testAddress)
		console.log(blogContract)
		//setBlogContract(blogContract);

		// fetch blog contract data
		const title = await blogContract.methods.blogName().call()
		const postCount = await blogContract.methods.postCount().call()
		setTitle(title)
		setPostCount(postCount)

	  // fetch blog post contract data
		var postList = []
		for (var i = 0; i < 1; i++) {
			const postAddress = await blogContract.methods.postMap(i + 1).call()

		  const postContract = new web3.eth.Contract(DBlogPostContract.abi, postAddress)
		  const postTitle = await postContract.methods.title().call() 
			const postNum = await postContract.methods.postNum().call()
			const postLikes = await postContract.methods.likeCount().call()
			// TODO store creationdate
			var postListItem = {
				address: postAddress,
				title: postTitle,
				postNum: postNum,
				likes: postLikes
			}
			postList.push(postListItem);
		}
		setPostList(postList);
	}

	const fetchPostList = async (blogId) => {
		const web3 = window.web3
		const testAddress = blogId

	}
	
	useEffect(() => {
		fetchBlogData("0x07715fB3964363Ce38FEB916368dCB66F51D91c5")
		fetchPostList("0x07715fB3964363Ce38FEB916368dCB66F51D91c5")
	}, [])

  return (
		<div className="blog-page">
			<div className="blog-page-container">
				<h1 className="blog-title">{title}</h1>
				<hr />
				<div className="blog-post-list">
				{
					postList.map((value, index) => {
						return (
							<div className='post-item'>
								<h3>{value.title}</h3>
								<div className="post-item-info">
									<div className="post-date">
										Jun 27
									</div>
									<div className="likes-display">
              			<LikeIcon className="likes-icon" />
              			<p className="likes-value">{0}</p>
            			</div>
								</div>
							</div>
						)
					})
				}
				</div>
			</div>
		</div>
  )
}


export default BlogPage

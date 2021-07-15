import React, { useState } from "react"
import "./BlogPage.css"
import DBlogContract from '../../abis/DBlogContract.json'
import DBlogPostContract from '../../abis/DBlogPostContract.json'
import { useEffect } from "react"
import { useQuery } from '../../utils/route-utils'
import { useHistory } from "react-router-dom";
import PostList from '../PostList/PostList';

const BlogPage = (props) => {
	const history = useHistory();
	const web3 = window.web3;

	const [blogId, setBlogId] = useState(useQuery().get("id"))
	const [title, setTitle] = useState('')
	const [postCount, setPostCount] = useState(0)
	const [blogContract, setBlogContract] = useState({}) // TODO
	const [tagList, setTagList] = useState([])
	const [postList, setPostList] = useState([])

	const fetchBlogData = async () => {

		const blogContract = new web3.eth.Contract(DBlogContract.abi, blogId)
		setBlogContract(blogContract);

		const title = await blogContract.methods.blogName().call()
		const postCount = await blogContract.methods.postCount().call()
		setTitle(title)
		setPostCount(postCount)

		var postList = []
		console.log(postCount)
		for (var i = 0; i < postCount; i++) {
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
	}
	
	useEffect(() => {
		if (blogId == null) {
      history.push('/read')
    }
    else {
      fetchBlogData()
    }
	}, [history, blogId])

  return (
		<div className="blog-page">
			<div className="blog-page-container">
				<h1 className="blog-title">{title}</h1>
				<hr />
				<PostList postList={postList} />
			</div>
		</div>
  )
}


export default BlogPage
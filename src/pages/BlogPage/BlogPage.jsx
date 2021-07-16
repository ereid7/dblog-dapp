import React, { useState } from "react"
import "./BlogPage.css"
import DBlogContract from '../../abis/DBlogContract.json'
import DBlogPostContract from '../../abis/DBlogPostContract.json'
import { useEffect } from "react"
import { useQuery } from '../../utils/route-utils'
import { useHistory } from "react-router-dom";
import PostList from '../../components/PostList/PostList';
import Page from '../../components/Page/Page'

const BlogPage = (props) => {
	const history = useHistory();
	const web3 = window.web3;

	const [isLoading, setIsLoading] = useState(true)
	const [blogData, setBlogData] = useState({
		blogId: useQuery().get("id"),
		title: '',
		postCount: 0,
		tagList:  [],
		postList: []
	})
	const setPartBlogData = (partialData) => setBlogData({ ...blogData, ...partialData })

	const fetchBlogData = async () => {
		const blogContract = new web3.eth.Contract(DBlogContract.abi, blogData.blogId)
		//setBlogContract(blogContract);

		const title = await blogContract.methods.blogName().call()
		const postCount = await blogContract.methods.postCount().call()
		// taglist


		var postList = []
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

		setPartBlogData({
			title: title,
			postCount: postCount,
			tagList: [],
			postList: postList
		})

		setIsLoading(false)
	}
	
	useEffect(() => {
		if (blogData.blogId == null) {
      history.push('/read')
    }
    else {
      fetchBlogData()
    }
	}, [history, blogData, isLoading]) //fetchBlogData // TODO use use callback
 
	return (
		<Page isLoading={isLoading}>
			<div className="blog-page-container">
				<h1 className="blog-title">{blogData.title}</h1>
				<hr />
				<PostList postList={blogData.postList} />	
			</div>
		</Page>
	)
}


export default BlogPage
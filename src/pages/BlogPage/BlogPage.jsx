import React, { useState } from "react"
import "./BlogPage.css"
import DBlogContract from '../../abis/DBlogContract.json'
import DBlogPostContract from '../../abis/DBlogPostContract.json'
import { useEffect } from "react"
import { useQuery } from '../../utils/route-utils'
import { useHistory } from "react-router-dom";
import { useBlogData } from '../../hooks/useBlogData'
import PostList from '../../components/PostList/PostList';
import Page from '../../components/Page/Page'

const BlogPage = (props) => {
	const history = useHistory()
	const blogId = useQuery().get("id")

	const [blogData, isLoading] = useBlogData(blogId)

	
	useEffect(() => {
		if (blogData.blogId == null) {
      history.push('/read')
    }
    else {

    }
	}, []) //fetchBlogData // TODO use use callback
 
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
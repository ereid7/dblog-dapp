import "./BlogPage.css"
import { useQuery } from '../../utils/routeUtils'
import { useHistory } from "react-router-dom";
import { useBlogData } from '../../hooks/useBlogData'
import PostList from '../../components/PostList/PostList';
import Page from '../../components/Page/Page'

const BlogPage = (props) => {
	const history = useHistory()
	const blogId = useQuery().get("id")

	if (blogId == null) {
		history.push('/read')
	}

	const [blogData, isLoading, isPostsLoading] = useBlogData(blogId)
 
	return (
		<Page isLoading={isLoading}>
			<div className="page-container">
				<div className="owner-card">
						TEST
				</div>
				<h1 className="blog-title">{blogData.title}</h1>
				<hr />
				<PostList isLoading={isPostsLoading} postList={blogData.postList} />	
			</div>
		</Page>
	)
}

export default BlogPage
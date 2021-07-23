import "./BlogPage.css"
import { useQuery } from '../../utils/routeUtils'
import { useHistory } from "react-router-dom";
import { useBlogData } from '../../hooks/useBlogData'
import PostList from '../../components/PostList/PostList';
import Page from '../../components/Page/Page'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const BlogPage = (props) => {
	const history = useHistory()
	const blogId = useQuery().get("id")

	if (blogId == null) {
		history.push('/read')
	}

	const [blogData, isLoading, isPostsLoading] = useBlogData(blogId)

	const onCreatePost = () => {
		history.push(`/createpost?blogId=${blogId}`)
	}
 
	return (
		<Page isLoading={isLoading}>
			<div className="page-container">
				<div className="owner-card">
						<Card>
							<Card.Body>
                    <Card.Title >Owner Panel</Card.Title>

										<Button onClick={onCreatePost} variant="outline-secondary">
											Create Post
										</Button>
              </Card.Body>
						</Card>
				</div>
				<h1 className="blog-title">{blogData.title}</h1>
				<hr />
				<PostList isLoading={isPostsLoading} postList={blogData.postList} />	
			</div>
		</Page>
	)
}

export default BlogPage
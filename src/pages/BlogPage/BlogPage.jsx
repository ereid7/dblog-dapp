import "./BlogPage.css"
import { useQuery } from '../../utils/routeUtils'
import { useState } from "react"
import { useHistory } from "react-router-dom";
import { useBlogData } from '../../hooks/useBlogData'
import PostList from '../../components/PostList/PostList';
import Page from '../../components/Page/Page'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const BlogPage = (props) => {
	const history = useHistory()
	const blogId = useQuery().get("id")
	const [searchQuery, setSearchQuery] = useState('')


	if (blogId == null) {
		history.push('/read')
	}

	const [
		blogData, 
		postList, 
		isLoading, 
		isBlogOwner, 
		isPostsLoading, 
		postCount, 
		fetchPostList,
		searchPostList
	] = useBlogData(blogId)

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
				<div className="subtitle-container">
          {/* <div onClick={onBlogSelected} className="subtitle-item clickable">
            {postData.blogName}
          </div> */}
          <div className="subtitle-item">
            {postCount} Posts
          </div>
        </div>
				<div className="blog-controls">
				<InputGroup className="mb-3">
					<input 
					  type="text"
						className="form-control form-control-lg"
						onChange={e => setSearchQuery(e.target.value)}
						placeholder="Search by Title or Post #"
						required />
					<Button onClick={() => searchPostList(searchQuery)} variant="outline-secondary" id="button-addon2">
      			Search
          </Button>	
				</InputGroup>
				
				</div>
				<hr />
				<PostList isLoading={isPostsLoading} postList={postList} />
				<Button onClick={fetchPostList} variant="outline-secondary">Load More Posts</Button>
			</div>
		</Page>
	)
}

export default BlogPage
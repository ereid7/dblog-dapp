import "./PostList.css"
import Spinner from 'react-bootstrap/Spinner'
import PostListItem from './PostListItem'

const PostList = (props) => {
  return (
		<div className="blog-post-list">
		{
			props.postList?.map((value, index) => {
				return (
					<PostListItem key={`post_list_item_${index}`} id={`post_list_item_${index}`} {...value}></PostListItem>
				)
			})
		}
		<div className='post-list-spinner'>
		{ props.isLoading ? (
				<Spinner className="loading-spinner" animation="border" variant="secondary" />
			) : '' }</div>
		</div>
  )
}

export default PostList

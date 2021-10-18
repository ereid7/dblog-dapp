import "./PostList.css"
import { useHistory } from "react-router-dom"
import Spinner from 'react-bootstrap/Spinner'
import PostListItem from './PostListItem'
import { useLikePost } from "../../hooks/useLikePost"
import { hexValue } from "ethers/lib/utils"

const PostList = (props) => {
	// const history = useHistory()
	// const [onRequestLikePost] = useLikePost()

	// const navigateToPost = (address) => {
	// 	history.push(`/post?id=${address}`)
	// }

	// TODO use popover element for share 
	// TODO create likepostbutton component
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

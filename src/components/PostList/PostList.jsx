import "./PostList.css"
import { ReactComponent as LikeIcon } from '../../assets/icons/hand-thumbs-up.svg'
import { useHistory } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';

const PostList = (props) => {
	const history = useHistory();

	const navigateToPost = (address) => {
		history.push(`/post?id=${address}`);
	}
	
  return (
		<div className="blog-post-list">
		{
			props.postList?.map((value, index) => {
				return (
					<div className='post-item' key={`postlistitem_${index}`}>
						<h3 className="post-name clickable" onClick={() => navigateToPost(value.address)}>{value.title}</h3>
						<div className="post-item-info">
							<div className="post-label">
								Jun 27
							</div>
							<div className="post-label">
								Post {value.postNum}
							</div>
							<div className="likes-display">
           			<LikeIcon className="likes-icon" />
           			<p className="likes-value">{value.likes}</p>
         			</div>
						</div>
					</div>
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

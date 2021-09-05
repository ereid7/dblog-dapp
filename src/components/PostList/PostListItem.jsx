import "./PostList.css"
import { useState } from "react"
import { ReactComponent as LikeIcon } from '../../assets/icons/hand-thumbs-up.svg'
import { ReactComponent as LikeIconFill } from '../../assets/icons/hand-thumbs-up-fill.svg'
import { useLikePost } from "../../hooks/useLikePost"
import { useHistory } from "react-router-dom"

const PostListItem = (props) => {
  const history = useHistory()
  const [onRequestLikePost] = useLikePost(props.address)
  const [postLiked, setPostLiked] = useState(props.liked)

  const navigateToPost = () => {
		history.push(`/post?id=${props.address}`)
	}

  return (
    <div className='post-item'>
			<h3 className="post-name clickable" onClick={navigateToPost}>{props?.title}</h3>
			<div className="post-item-info">
				<div className="post-label">
					Jun 27
				</div>
				<div className="post-label">
					Post {props.postNum}
				</div>
				<div className="likes-display">
          {
            postLiked ?
              <LikeIconFill className="likes-icon" /> :
              <LikeIcon onClick={() => onRequestLikePost(props.address, () => setPostLiked(true))} className="likes-icon clickable" />
          }
     			<p className="likes-value">{props?.likes}</p>
    		</div>
			</div>
		</div>
  )
}

export default PostListItem
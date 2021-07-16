import React, { useState } from "react"
import "./PostList.css"
import { ReactComponent as LikeIcon } from '../../assets/icons/hand-thumbs-up.svg'
import { useEffect } from "react"
import { useHistory } from "react-router-dom";

const PostList = (props) => {
	const history = useHistory();

	const navigateToPost = (address) => {
		history.push(`/post?id=${address}`);
	}
	
  return (
		<div className="blog-post-list">
		{
			props.postList.map((value, index) => {
				return (
					<div className='post-item' key={`postlistitem_${index}`}>
						<h3 className="post-name" onClick={() => navigateToPost(value.address)}>{value.title}</h3>
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
		</div>
  )
}

export default PostList

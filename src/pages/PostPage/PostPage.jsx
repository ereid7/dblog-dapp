import React, { useState } from "react"
import "./PostPage.css"
import DBlogContract from '../../abis/DBlogContract.json'
import DBlogPostContract from '../../abis/DBlogPostContract.json'
import { ReactComponent as LikeIcon } from '../../assets/icons/hand-thumbs-up.svg'
import { useEffect } from "react"
import { useHistory } from "react-router-dom";
import { useContract, useDBlogPostContract, useDBlogContract } from '../../hooks/useContract'
import { useQuery } from '../../utils/route-utils'
import TagList from '../../components/Tags/TagList';
import Page from '../../components/Page/Page'
import { getDBlogContract } from "../../utils/contractHelpers"
import { getNumber } from '../../utils/numberHelpers'
import { usePostData } from '../../hooks/usePostData'

// TODO get id param as prop
const PostPage = (props) => {
  const history = useHistory();
  const postId = useQuery().get("id")

  if (postId == null) {
    history.push('/read')
  }
  
  const [postData, isLoading] = usePostData(postId)

  const onBlogSelected = (event) => {
    event.preventDefault()

    // TODO store this in data
    history.push(`/blog?id=${postData.blogAddress}`)
  }

  return (
		<Page isLoading={isLoading}>
      <div className="post-page-container">
        <h1 className="post-title">{postData.title}</h1>
        <div className="subtitle-container">
          <div onClick={onBlogSelected} className="subtitle-item clickable">
            {postData.blogName}
          </div>
          <div className="subtitle-item">
            Post {postData.postNum}
          </div>
          <div className="subtitle-item">
            5/12/2021
          </div>
        </div>
        <div className="post-content">
          {postData.content}
        </div>
        <br />
        <TagList tagList={postData.tagList}></TagList>
        <div className="post-footer-container">
          <div className="likes-display">
            <LikeIcon height="25px" width="25px" />
            <p className="likes-value">{postData.likeCount}</p>
          </div>
        </div>
        <hr />
      </div>
    </Page>
  )
}


export default PostPage

import "./PostPage.css"
import { ReactComponent as LikeIcon } from '../../assets/icons/hand-thumbs-up.svg'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'
import { useHistory } from "react-router-dom"
import { useQuery } from '../../utils/routeUtils'
import TagList from '../../components/Tags/TagList'
import Page from '../../components/Page/Page'
import { usePostData } from '../../hooks/usePostData'
import MDEditor from "@uiw/react-md-editor"

const PostPage = (props) => {
  const history = useHistory();
  const postId = useQuery().get("id")

  if (postId == null) {
    history.push('/read')
  }
  
  const [postData, isLoading] = usePostData(postId)

  const onBlogSelected = (event) => {
    event.preventDefault()

    history.push(`/blog?id=${postData.blogAddress}`)
  }

  return (
		<Page isLoading={isLoading}>
      <div className="page-container">
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
          <MDEditor.Markdown source={postData.content} />
        </div>
        <br />
        <TagList tagList={postData.tagList}></TagList>
        <div className="post-footer-container">
          <div className="likes-display">
            <LikeIcon height="25px" width="25px" />
            <p className="likes-value">{postData.likeCount}</p>
          </div>
          <div className="share-display">
            <ShareIcon height="25px" width="25px" />
          </div>
        </div>
        <hr />
      </div>
    </Page>
  )
}


export default PostPage

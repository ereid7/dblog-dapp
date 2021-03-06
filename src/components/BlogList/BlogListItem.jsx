import { useHistory } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import { formatAccountAddress } from "../../utils/stringHelpers";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { copyToClipboard } from '../../utils/clipboardHelpers';

const BlogListItem = (props) => {
  const history = useHistory();

  const navigateToBlog = () => {
    history.push(`/blog?id=${props.blogAddress}`);
  }

  const copyAddressToClipboard = () => {
    copyToClipboard(props.blogAddress)
  }

  return (
    <div className="bloglist-item">
      <Card>
        <Card.Body>
          <Card.Title onClick={() => navigateToBlog()}><a className="clickable">{props.blogName}</a></Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{props.postCount} Posts</Card.Subtitle>
          <OverlayTrigger placement='right' overlay={
            <Tooltip>
              Copy Address to Clipboard
            </Tooltip>
          }>
            <Card.Link onClick={() => copyAddressToClipboard()} href="#">{formatAccountAddress(props.blogAddress)}</Card.Link>
          </OverlayTrigger>
        </Card.Body>
      </Card>
    </div>
  )
}

export default BlogListItem
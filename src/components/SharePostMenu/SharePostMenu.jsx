import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'
import { copyToClipboard } from '../../utils/clipboardHelpers';

const SharePostMenu = (props) => {

  const copyUrlToClipboard = () => {
    copyToClipboard(window.location.href)
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Share</Popover.Header>
      <Popover.Body onClick={() => copyUrlToClipboard()}> 
        Copy Post Link
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger="click" placement="top" overlay={popover}>
      <ShareIcon height="25px" width="25px" /> 
    </OverlayTrigger>
  )
}

export default SharePostMenu
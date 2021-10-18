
import Modal from 'react-bootstrap/Modal'
import { useCreateBlogData } from '../../hooks/useCreateBlogData'
import { useState, useEffect } from 'react'
import { ipfsUploadStates, transactionStates } from '../../utils/enums'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Button from 'react-bootstrap/Button'
import Popover from 'react-bootstrap/Popover'
import { useCreatePostData } from '../../hooks/useCreatePostData'
import Spinner from 'react-bootstrap/Spinner';
import { ReactComponent as SuccessIcon } from '../../assets/icons/check-circle.svg'
import { ReactComponent as ErrorIcon } from '../../assets/icons/error-circle.svg'
import { ReactComponent as CircleIcon } from '../../assets/icons/circle.svg'
import { ReactComponent as ShareIcon } from '../../assets/icons/share.svg'

// TODO create hook responsible for checking recent wallet transactions, determining if any pending related to the dapp

const SharePostMenu = (props) => {

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">Share</Popover.Header>
      <Popover.Body>
        And here's some <strong>amazing</strong> content. It's very engaging.
        right?
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
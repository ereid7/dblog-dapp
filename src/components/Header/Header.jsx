import "./Header.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { formatAccountAddress } from "../../utils/stringHelpers";
import { useHistory } from "react-router-dom"

const Header = (props) => {
  const history = useHistory()

  return (
    <Navbar className="justify-content-center" bg="light">
      <Navbar.Brand className="header-title">DBlog</Navbar.Brand>
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item onClick={() => history.push('/read')} as="li">
          <Nav.Link href="/read">Read</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => history.push('/publish')} eventKey="link-1" as="li">
          <Nav.Link>Publish</Nav.Link>
        </Nav.Item>
      </Nav>
      <Button className="transaction-button" variant="primary" disabled>
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      </Button>{' '}
      <Button className="connect-button" disabled={props.isConnected} variant={props.isConnected ? "outline-secondary" : "outline-primary"} onClick={async () => {
        if (!props.isConnected) {
          await props.connectWallet()
        }
      }}>{props.isConnected ? formatAccountAddress(props.account) : "Connect"}</Button>
    </Navbar>
  );
}

export default Header
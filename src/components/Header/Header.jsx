import "./Header.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';
import { formatAccountAddress } from "../../utils/stringHelpers";
import { useHistory } from "react-router-dom"
import TransactionHeaderSpinner from "../TransactionHeaderSpinner/TransactionHeaderSpinner";

const Header = (props) => {
  const history = useHistory()

  return (
    <Navbar className="justify-content-center" bg="light">
      <Navbar.Brand className="header-title">DBlog</Navbar.Brand>
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item onClick={() => history.push('/read')} as="li">
          <Nav.Link>Read</Nav.Link>
        </Nav.Item>
        <Nav.Item onClick={() => history.push('/publish')} eventKey="link-1" as="li">
          <Nav.Link>Publish</Nav.Link>
        </Nav.Item>
      </Nav>
      <TransactionHeaderSpinner />
      <Button className="connect-button" disabled={props.isConnected} variant={props.isConnected ? "outline-secondary" : "outline-primary"} onClick={async () => {
        if (!props.isConnected) {
          await props.connectWallet()
        }
      }}>{props.isConnected ? formatAccountAddress(props.account) : "Connect"}</Button>
    </Navbar>
  );
}

export default Header
import "./Header.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import { formatAccountAddress } from "../../utils/stringHelpers";

const Header = (props) => {

  return (
    <Navbar className="justify-content-center" bg="light">
      <Navbar.Brand className="header-title">DBlog</Navbar.Brand>
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/read">Read</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link href="/publish" eventKey="link-1">Publish</Nav.Link>
        </Nav.Item>
      </Nav>
      <Navbar.Text className="account-address-label">
        {formatAccountAddress(props.account)}
      </Navbar.Text>
      <Button className="connect-button" disabled={props.isConnected} variant={props.isConnected ? "outline-secondary" : "outline-primary"} onClick={async () => {
        if (!props.isConnected) {
          await props.connectWallet()
        }
      }}>{props.isConnected ? "Connected" : "Connect"}</Button>
    </Navbar>
  );
}

export default Header
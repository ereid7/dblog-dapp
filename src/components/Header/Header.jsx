import React, { Component } from "react";
import "./Header.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';

class Header extends Component {

  render() {
    return (

    <Navbar className="justify-content-center" bg="light">
      <Navbar.Brand className="header-title">DBlog</Navbar.Brand>
      <Nav defaultActiveKey="/home" as="ul">
        <Nav.Item as="li">
          <Nav.Link href="/home">Read</Nav.Link>
        </Nav.Item>
        <Nav.Item as="li">
          <Nav.Link eventKey="link-1">Publish</Nav.Link>
        </Nav.Item>
      </Nav>
      <Button className="connect-button" onClick={this.props.connectWallet()} variant="outline-success">Connect</Button>
    </Navbar>
    );
  }
}

export default Header
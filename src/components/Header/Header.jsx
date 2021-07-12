import React, { Component } from "react";
import "./Header.css";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Web3 from 'web3';

class Header extends Component {

  formatAccountAddress() {
    if (this.props.account != undefined && this.props.account != "0x0") {
      var strLen = this.props.account.length;
      return `${this.props.account.substr(0, 6)}...${this.props.account.substr(strLen - 4, strLen - 1)}`
    } else {
      return "";
    }
  }

  // TODO disable button if connected
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
      <Navbar.Text className="account-address-label">
        {this.formatAccountAddress()}
      </Navbar.Text>
      <Button className="connect-button" variant={this.props.isConnected ? "outline-secondary" : "outline-primary"} onClick={async () => {
        if (!this.props.isConnected) {
          await this.props.connectWallet()
        }
      }}>{this.props.isConnected ? "Connected" : "Connect"}</Button>
    </Navbar>
    );
  }
}

export default Header
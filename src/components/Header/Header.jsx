import React, { Component } from "react";
import "./Header.css";

class Header extends Component {

  handleConnect() {

  }

  render() {
    return (

    <div className="header">
        <h2>DBlog</h2>
        <button className="connect-button" onClick={() => {
          this.handleConnect()
        }}>Connect</button>
    </div>
    );
  }
}

export default Header
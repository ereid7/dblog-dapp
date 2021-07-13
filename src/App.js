import logo from './logo.svg';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import PostPage from './components/PostPage/PostPage';
import BlogPage from './components/BlogPage/BlogPage';
import React, { Component } from "react";
import Web3 from 'web3';

class App extends Component {

  // TODO fix this
  async componentWillMount() {
    await this.loadWeb3();
    this.setupWalletListeners();
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

      const accounts = await window.web3.eth.getAccounts()

      this.setState({ account: accounts[0]})
      this.setState({ isConnected: true })
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected.')
    }
  }

  setupWalletListeners() {
    window.ethereum.on('accountsChanged', (accounts) => {
      //Time to reload your interface with accounts[0]!
      if (accounts.length > 0) {
        this.setState({ account: accounts[0]})
        this.setState({ isConnected: true })
      } else {
        this.setState({ account: "0x0"})
        this.setState({ isConnected: false })
      }
    })

  }

  loadAccounts = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      this.setState({ account: accounts[0] })
      this.setState({ isConnected: true })
    } catch (err) {
      this.setState({ isConnected: false })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      isConnected: false,
      loading: true,
    }
  }

  render() {
    return (
      <div className="App">
        <Header connectWallet={this.loadAccounts} isConnected={this.state.isConnected} account={this.state.account} />
        <BrowserRouter>
          <Switch>
            <Route path="/post" component={PostPage} />
            <Route path="/blog" component={BlogPage} />
            <Route path="*" component = {() => "404 NOT FOUND"} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

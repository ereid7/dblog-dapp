import logo from './logo.svg';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import PostPage from './components/PostPage/PostPage';
import React, { Component } from "react";
import Web3 from 'web3';

class App extends Component {

  // TODO add connect button
  // lifecycle hook
  async componentWillMount() {
    await this.loadWeb3()
    //await this.loadContractData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected.')
    }
  }

  async loadContractData() {
    // const web3 = window.web3;

    // // const accounts = await web3.eth.getAccounts()
    // // this.setState({ account: accounts[0] })

    // const networkId = await web3.eth.net.getId();


    // // load dBlogContractData
    // const dBlogContractData = DBlogContract.networks[networkId];

  }

  constructor(props) {
    super(props)
    this.state = {
      account: '0x0',
      isConnected: false,
      loading: true,
      // dBlogContract: {},
      // dBlogPostContract: {},
    }
  }
  
  connectWallet = () => {
    // if (window.ethereum) {
    //   window.web3 = new Web3(window.ethereum)
    //   window.ethereum.enable()
    // }
    // else if (window.web3) {
    //   window.web3 = new Web3(window.web3.currentProvider)
    // }
    // else {
    //   window.alert('Non-Ethereum browser detected.')
    // }
  }

  render() {
    return (
      <div className="App">
        <Header connectWallet={this.connectWallet} />
        <BrowserRouter>
          <Switch>
            <Route 
            path="/post"
            component={PostPage} />
            <Route path="*" component = {() => "404 NOT FOUND"} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;

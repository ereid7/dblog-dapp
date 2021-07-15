import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import PostPage from './components/PostPage/PostPage';
import BlogPage from './components/BlogPage/BlogPage';
import React, { useState, useEffect } from "react";
import Web3 from 'web3';

const App = () => {
  const [account, setAccount] = useState('0x0')
  const [isConnected, setIsConnected] = useState(false)
  const [loading, setLoading] = useState(true)

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()

      const accounts = await window.web3.eth.getAccounts()

      setAccount(accounts[0])
      setIsConnected(true)
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected.')
    }
  }

  loadWeb3()
  
  const setupWalletListeners = () => {
    window.ethereum.on('accountsChanged', (accounts) => {
      //Time to reload your interface with accounts[0]!
      if (accounts.length > 0) {
        setAccount(accounts[0])
        setIsConnected(true)
      } else {
        setAccount('0x0')
        setIsConnected(false)
      }
    })
  }

  const loadAccounts = async () => {
    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0])
      setIsConnected(true)
    } catch (err) {
      setIsConnected(false)
    }
  }

  useEffect(() => {
		setupWalletListeners()
	}, [])

  return (
    <div className="App">
      <Header connectWallet={loadAccounts} isConnected={isConnected} account={account} />
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

export default App
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import PostPage from './pages/PostPage/PostPage';
import BlogPage from './pages/BlogPage/BlogPage';
import ReadPage from './pages/ReadPage/ReadPage';
import React, { useState, useEffect } from "react";
import Web3 from 'web3';
import { useWeb3 } from './hooks/web3'

const App = () => {

  const [account, isConnected, loadAccounts] = useWeb3()

  return (
    <div className="App">
      <Header connectWallet={loadAccounts} isConnected={isConnected} account={account} />
      <BrowserRouter>
        <Switch>
          <Route path="/read" component={ReadPage} />
          <Route path="/post" component={PostPage} />
          <Route path="/blog" component={BlogPage} /> 
          <Route path="*" component = {() => "404 NOT FOUND"} />
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
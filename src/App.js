import { Route, Switch, BrowserRouter, Redirect } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import PostPage from './pages/PostPage/PostPage';
import BlogPage from './pages/BlogPage/BlogPage';
import CreatePostPage from './pages/CreatePostPage/CreatePostPage';
import ReadPage from './pages/ReadPage/ReadPage';
import PublishPage from './pages/PublishPage/PublishPage';
import { ToastListener } from './contexts/ToastContext';
import { useState, useEffect } from "react";
import {
  useWeb3React, 
} from '@web3-react/core'
import { useEagerConnect, useInactiveListener } from './hooks/hooks'
import { injected } from './connectors/connectors';

const App = () => {
  const context = useWeb3React()
  // { connector, library, chainId, account, activate, deactivate, active, error }
  const { connector, account, activate, active } = context

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect()

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector)

  useEffect(() => {
    if(window.location.href === window.sessionStorage.getItem("origin")){
      window.sessionStorage.clear();
    }
  }, [])

  console.log("APP")
  return (  
    <div className="App">
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
        crossOrigin="anonymous"
      />

      <BrowserRouter>
        <Header connectWallet={() => { 
          setActivatingConnector(injected)
          activate(injected)
        }} isConnected={active} account={account} />
        <Switch>
          <Route path="/read" component={ReadPage} />
          <Route path="/publish" component={PublishPage} />
          <Route path="/post" component={PostPage} />
          <Route path="/blog" component={BlogPage} />
          <Route path="/createpost" component={CreatePostPage} />
          <Redirect path="*" to="/read" />
        </Switch>
        <ToastListener />
      </BrowserRouter>
    </div>
  )
}

export default App
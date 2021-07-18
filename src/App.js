import { Route, Switch, BrowserRouter } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header/Header';
import PostPage from './pages/PostPage/PostPage';
import BlogPage from './pages/BlogPage/BlogPage';
import ReadPage from './pages/ReadPage/ReadPage';
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

  
  return (  
    <div className="App">
      <Header connectWallet={() => { 
        setActivatingConnector(injected)
        activate(injected)
      }} isConnected={active} account={account} />
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
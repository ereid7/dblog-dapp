import { React, createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Web3ReactProvider } from '@web3-react/core';
import { UserTransactionProvider } from './contexts/UserTransactionContext';
import { ToastsProvider } from './contexts/ToastContext/Provider';
import { EventsProvider } from './contexts/EventContext/Provider';
import { ethers } from 'ethers';

import 'bootstrap/dist/css/bootstrap.min.css';

window.onbeforeunload = () =>{
  window.sessionStorage.setItem("origin", window.location.href);
}

export const getLibrary = (provider) => {
  window.web3 = new ethers.providers.Web3Provider(provider)
  window.web3.pollingInterval = 500
  return window.web3
}

ReactDOM.render(
    <ToastsProvider>
      <Web3ReactProvider getLibrary={getLibrary}>
        <EventsProvider>
          <UserTransactionProvider>
            <App />
          </UserTransactionProvider>
        </EventsProvider>
      </Web3ReactProvider>
    </ToastsProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
//import { getLibrary } from './utils/web3React'
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';

export const getLibrary = (provider) => {
  //window.web3 = new ethers.providers.Web3Provider(provider)
  window.web3 = new ethers.providers.Web3Provider(provider)
  window.web3.pollingInterval = 500
  return window.web3
}

ReactDOM.render(
    <Web3ReactProvider getLibrary={getLibrary}>
      <App />
    </Web3ReactProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();

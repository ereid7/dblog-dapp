// import { useEffect, useState } from "react"
// import Web3 from 'web3';

// export const useWeb3 = () => {
//   const [account, setAccount] = useState('0x0')
//   const [isConnected, setIsConnected] = useState(false)
//   // const [loading, setLoading] = useState(true)
//   const loadAccounts = async () => {
//     try {
//       const accounts = await window.ethereum.request({
//         method: "eth_requestAccounts",
//       });
//       setAccount(accounts[0])
//       setIsConnected(true)
//     } catch (err) {
//       setIsConnected(false)
//     }
//   }

//   const loadWeb3 = async () => {
//     if (window.ethereum) {
//       window.web3 = new Web3(window.ethereum)

//       await loadAccounts()
//     }
//     else if (window.web3) {
//       window.web3 = new Web3(window.web3.currentProvider)
//     }
//     else {
//       window.alert('Non-Ethereum browser detected.')
//     }
//   }

//   loadWeb3()
  
//   const setupWalletListeners = () => {
//     window.ethereum.on('accountsChanged', (accounts) => {
//       //Time to reload your interface with accounts[0]!
//       if (accounts.length > 0) {
//         setAccount(accounts[0])
//         setIsConnected(true)
//       } else {
//         setAccount('0x0')
//         setIsConnected(false)
//       }
//     })
//   }

//   useEffect(() => {
// 		setupWalletListeners()
// 	}, [])

//   return [account, isConnected, loadAccounts]
// }
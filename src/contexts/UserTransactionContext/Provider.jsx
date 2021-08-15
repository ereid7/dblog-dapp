import React, { useState, useEffect, createContext } from 'react'
import { useDBlogFactoryContract } from '../../hooks/useContract'
import {
  useWeb3React, 
} from '@web3-react/core'
import useToast from '../../hooks/useToast'

export const UserTransactionContext = createContext()

export const transactionStates = {
  NO_REQUEST: "no-request",
  REQUESTING: "requesting",
  SUBMIT: "submit",
  ERROR: "error",
}

export const transactionState = {
  PENDING: 'pending',
  SUCCESS: 'success',
  FAILED: 'failed'
}

// TODO 
// helper that can take a ethers library transaction response and add it to the list of transactions
// function useTransactionAdder() {
//   var _a = useWeb3React(), chainId = _a.chainId, account = _a.account;
//   var dispatch = useDispatch();
//   return useCallback(function (response, _a) {
//       var _b = _a === void 0 ? {} : _a, summary = _b.summary, approval = _b.approval, claim = _b.claim;
//       if (!account)
//           return;
//       if (!chainId)
//           return;
//       var hash = response.hash;
//       if (!hash) {
//           throw Error('No transaction hash found.');
//       }
//       //dispatch(addTransaction({ hash: hash, from: account, chainId: chainId, approval: approval, summary: summary, claim: claim }));
//   }, [dispatch, chainId, account]);
// }

export const UserTransactionProvider = (props) => {
  const dBlogFactoryContract = useDBlogFactoryContract("0xb033fA08b485171FDf49987904Da11Eb7CA89A25")

  const [blogTransactions, setBlogTransactions] = useState({})
  const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const context = useWeb3React()
  // { connector, library, chainId, account, activate, deactivate, active, error }
  const { connector, chainId, account, activate, active } = context
  const { toastSuccess, toastError } = useToast()

  // TODO store list of pending transactions and their states
  const addTransaction = (txResponse) => {
    console.log("TEST!")
    //var txResponse = await dBlogFactoryContract.createBlog(blogName)
    const { hash } = txResponse
    blogTransactions[chainId] = {
      ...blogTransactions[chainId],
      [`${hash}`]: { hash: hash, transactionState: 'pending' }
    }

    // blogTransactions = {
    //   ...blogTransactions,
    //   chainId: 
    // }
    //setBlogTransactions(blogTransactions)

    txResponse.wait()
      .then(response => {
        //blogTransactions[chainId][hash].transactionState = 'success';
        console.log('Transaction Success')
        toastSuccess('Transaction Successful', 'test')
      })
      .catch(error => {
        //blogTransactions[chainId][hash].transactionState = 'failed';
        toastError('Transaction Failed', 'test')
      })
      .finally(() => {
        delete blogTransactions[chainId][hash]
      })

    setBlogTransactions(blogTransactions);
    // TODO store transactions in local storage?
  }


  return (
    <UserTransactionContext.Provider value={{
      addTransaction,
      blogTransactions
    }}>
      {props.children}
    </UserTransactionContext.Provider>
  )
}


import React, { useState, useEffect, createContext, useCallback } from 'react'
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
  const [blogTransactions, setBlogTransactions] = useState(Object.create({}))
  const [transactionsPending, setTransactionsPending] = useState(false)
  const [requesting, setRequesting] = useState(false)

  const context = useWeb3React()
  // { connector, library, chainId, account, activate, deactivate, active, error }
  const { connector, chainId, account, activate, active } = context
  const { toastSuccess, toastError } = useToast()


  // TODO store list of pending transactions and their states
  const addTransaction = async (
    transaction, 
    onSuccess = undefined, 
    onFailure = undefined,
    onRejected = undefined,
  ) => {
    setTransactionsPending(true)
    setRequesting(true)
    try {
      var txResponse = await transaction();
      setRequesting(false)

      const { hash } = txResponse
      blogTransactions[`${chainId}`] = {
        ...blogTransactions[chainId],
        [`${hash}`]: { hash: hash, transactionState: 'pending' }
      }
      setBlogTransactions({
        ...blogTransactions
      });

      // after transaction is created, rest is synchronous so callers know the transaction is pending
      txResponse.wait().then(response => {
        blogTransactions[`${chainId}`][`${hash}`].transactionState = 'success';
        toastSuccess('Transaction Successful', response.transactionHash)

        console.log(response)

        if (onSuccess !== undefined) {
          onSuccess()
        }
      })
      .catch(error => {
        blogTransactions[`${chainId}`][`${hash}`].transactionState = 'failed';
        toastError('Transaction Failed', error.message)

        if (onFailure !== undefined) {
          onFailure()
        }
      })
      .finally(() => {
        setTransactionsPending(false)
        // TODO do not delete. TO determine pending count, check transaction state
        //delete blogTransactions[chainId][hash]
        console.log(blogTransactions)

        setBlogTransactions({
          ...blogTransactions
        });
      })
      return hash
    }
    catch (error) {
      setTransactionsPending(false)
      if (error.code === 4001) {
        toastError('Transaction Failed', 'Transaction Rejected')

        if (onRejected !== undefined) {
          onRejected()
        }
      }
      else {
        toastError('Transaction Failed', error.message)
      }
 
      throw error
    }
    // return hash;
    // setBlogTransactions(blogTransactions);
    // TODO store transactions in local storage?
  }

  const pendingCount = () => {
    return (blogTransactions === undefined || blogTransactions[`${chainId}`] === undefined) ? 
      0 : Object.keys(blogTransactions[`${chainId}`]).filter(x => x.transactionState === 'pending')?.length
  }

  useEffect(() => {
    //if (blogTransactions[chainId] === undefined) return
    console.log(Object.keys(blogTransactions))
    //setPendingCount(Object.keys(blogTransactions[chainId]).length)
  }, [blogTransactions])

  return (
    <UserTransactionContext.Provider value={{
      addTransaction,
      transactionsPending,
      pendingCount,
      requesting,
      blogTransactions
    }}>
      {props.children}
    </UserTransactionContext.Provider>
  )
}


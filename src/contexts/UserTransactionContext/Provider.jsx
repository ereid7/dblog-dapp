import React, { useState, useEffect, createContext, useCallback } from 'react'
import {
  useWeb3React, 
} from '@web3-react/core'
import useToast from '../../hooks/useToast'
import useEventsContext from '../../hooks/useEventsContext'
import useActiveWeb3React from '../../hooks/useActiveWeb3React'
import { transactionTypes } from '../../utils/enums'

//https://www.pluralsight.com/guides/how-to-communicate-between-independent-components-in-reactjs

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

export const UserTransactionProvider = (props) => {
  const [blogTransactions, setBlogTransactions] = useState(Object.create({}))
  const [transactionsPending, setTransactionsPending] = useState(false)
  const [pendingCount, setPendingCount] = useState(0)
  const [requesting, setRequesting] = useState(false)

  const context = useActiveWeb3React()
  // { connector, library, chainId, account, activate, deactivate, active, error }
  const { connector, chainId, account, activate, active } = context
  const { toastSuccess, toastError } = useToast()

  const { on, remove, dispatch } = useEventsContext()

  // TODO store list of pending transactions and their states
  const addTransaction = async (
    transaction,
    transactionType,
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
        // TODO create event enums
        console.log(transactionType)
        dispatch("transaction-success", { hash: hash, type: transactionType });

        toastSuccess('Transaction Successful', response.transactionHash)
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
  useEffect(() => {
    var count = (blogTransactions === undefined || blogTransactions[`${chainId}`] === undefined) ? 
      0 : Object.values(blogTransactions[`${chainId}`]).filter(x => x.transactionState === 'pending')?.length

    setPendingCount(count)
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


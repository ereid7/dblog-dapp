import "./TransactionHeaderSpinner.css"
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import { useHistory } from "react-router-dom"
import { useEffect, useState } from "react"
import {
  useWeb3React, 
} from '@web3-react/core'
import useUserTransactionContext from '../../hooks/useUserTransactionContext'

const TransactionHeaderSpinner = (props) => {
  const { transactionsPending, blogTransactions, pendingCount, requesting } = useUserTransactionContext()
  const context = useWeb3React()
  const { connector, chainId, account, activate, active } = context

  // TODO why publishing posts with no title

  return (
    <div className="transaction-item-container">
      {
        transactionsPending ? (
          <Button variant="primary" disabled>
            {
              requesting ? (
                'Requesting'
              ) : `${pendingCount()} Pending`
            }
            <Spinner
              className="transactionSpinner"
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          </Button>
        ) : ''
      }
    </div>
  );
}

export default TransactionHeaderSpinner
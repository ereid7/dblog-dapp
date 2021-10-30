import { useDBlogFactoryContract } from '../hooks/useContract'
import { useState, useContext, useCallback, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import useUserTransactionContext from '../hooks/useUserTransactionContext'
import { transactionStates, transactionTypes } from '../utils/enums'
import config from '../config.json'

export const useCreateBlogData = () => {
  const { addTransaction, blogTransactions } = useUserTransactionContext()
  const history = useHistory()

  const dBlogFactoryContract = useDBlogFactoryContract(config.FACTORY_CONTRACT_ADDRESS)
  const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const onCreate = useCallback(async (blogName) => {
    try {
      setTransactionState(transactionStates.REQUESTING)

      var createBlog = () => dBlogFactoryContract.createBlog(blogName)

      await addTransaction(createBlog, transactionTypes.CREATE_BLOG)

      setTransactionState(transactionStates.SUBMIT)
    }
    catch(e) {
      setTransactionState(transactionStates.ERROR)
    }
    finally {

    }
  }, [addTransaction])

  useEffect(() => {
    console.log(blogTransactions)
  }, [blogTransactions])

  return [transactionState, setTransactionState, onCreate]
}
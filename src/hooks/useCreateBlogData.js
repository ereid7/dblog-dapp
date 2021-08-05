import { useDBlogFactoryContract } from '../hooks/useContract'
import { useState, useContext, useCallback } from 'react'
import { UserTransactionContext } from '../providers/UserTransactionProvider'

// https://levelup.gitconnected.com/using-react-hooks-for-global-state-management-951834054971
// TODO figure out write transaction sequence w/o needing to store transaction info
export const transactionStates = {
  NO_REQUEST: "no-request",
  REQUESTING: "requesting",
  SUBMIT: "submit",
  ERROR: "error",
}

export const useCreateBlogData = () => {

  const transactionContext = useContext(UserTransactionContext)
  const { addTransaction, blogTransaction } = transactionContext

  const dBlogFactoryContract = useDBlogFactoryContract("0xb033fA08b485171FDf49987904Da11Eb7CA89A25")
  const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const onCreate = useCallback(async (blogName) => {
    try {
      setTransactionState(transactionStates.REQUESTING)

      var transaction = await dBlogFactoryContract.createBlog(blogName)
      //console.log(test.hash)
      console.log(transaction.hash)

      addTransaction(transaction)

      setTransactionState(transactionStates.SUBMIT)

      // TODO create file responsible for waiting for all transactions associated with the wallet
      await transaction.wait()

      console.log("Transaction confirmed")
    }
    catch(e) {
      setTransactionState(transactionStates.ERROR)
    }
    finally {
      //  TODO
    }
  }, [addTransaction])

  return [transactionState, setTransactionState, onCreate]
}
import { useDBlogFactoryContract } from '../hooks/useContract'
import { useState, useContext, useCallback, useEffect } from 'react'
import { useHistory } from "react-router-dom"
import useUserTransactionContext from '../hooks/useUserTransactionContext'
import { transactionStates, transactionTypes } from '../utils/enums'

// https://levelup.gitconnected.com/using-react-hooks-for-global-state-management-951834054971
// TODO figure out write transaction sequence w/o needing to store transaction info
// export const transactionStates = {
//   NO_REQUEST: "no-request",
//   REQUESTING: "requesting",
//   SUBMIT: "submit",
//   ERROR: "error",
// }

export const useCreateBlogData = () => {
  const { addTransaction, blogTransactions } = useUserTransactionContext()
  const history = useHistory()

  const dBlogFactoryContract = useDBlogFactoryContract("0x3d810Fe005e7983c7099845699B2899d0Ee3BDCc")
  const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const onCreate = useCallback(async (blogName) => {
    try {
      setTransactionState(transactionStates.REQUESTING)

      var createBlog = () => dBlogFactoryContract.createBlog(blogName)

      // TODO on success, load new post
      var test = await addTransaction(createBlog, transactionTypes.CREATE_BLOG)

      setTransactionState(transactionStates.SUBMIT)
    }
    catch(e) {
      setTransactionState(transactionStates.ERROR)
    }
    finally {
      //  TODO
    }
  }, [addTransaction])

  useEffect(() => {
    console.log(blogTransactions)
  }, [blogTransactions])

  return [transactionState, setTransactionState, onCreate]
}
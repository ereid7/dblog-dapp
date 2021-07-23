import { useDBlogFactoryContract } from '../hooks/useContract'
import { useState } from 'react'

export const transactionStates = {
  NO_REQUEST: "no-request",
  REQUESTING: "requesting",
  SUBMIT: "submit",
  ERROR: "error",
}

export const useCreateBlogData = () => {

  const dBlogFactoryContract = useDBlogFactoryContract("0x9De559835fa0981c269C1BC4eb1D268fCe9C5a43")
  const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const onCreate = async (blogName) => {
    try {
      setTransactionState(transactionStates.REQUESTING)

      await dBlogFactoryContract.createBlog(blogName)

      // TODO provide link to transaction
      setTransactionState(transactionStates.SUBMIT)
    }
    catch(e) {
      setTransactionState(transactionStates.ERROR)
    }
    finally {
      //  TODO
    }
  }

  return [transactionState, setTransactionState, onCreate]
}
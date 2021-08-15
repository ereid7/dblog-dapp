import { useDBlogPostContract, useDBlogContract } from "./useContract"
import { useEffect, useCallback, useState } from 'react'
import { useQuery } from '../utils/routeUtils'
import { useHistory } from "react-router-dom"
import useUserTransactionContext from '../hooks/useUserTransactionContext'

// TODO create shared const
export const transactionStates = {
  NO_REQUEST: "no-request",
  REQUESTING: "requesting",
  SUBMIT: "submit",
  ERROR: "error",
}

export const useCreatePostData = blogId => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [blogName, setBlogName] = useState('')
  const [postTitle, setPostTitle] = useState('')

  const history = useHistory();
  const dBlogContract = useDBlogContract(blogId)

  const { addTransaction } = useUserTransactionContext()
  //const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const onRequestPublish = useCallback(async () => {
    setIsLoading(true)
    try {
      var transaction = await dBlogContract.publishBlogPost(postTitle, value, ["mockTag1", "mockTag2", "mockTag3"], true)
      addTransaction(transaction)
      // TODO wait for event. Need to update smart contract

      await transaction.wait()
    }
    catch(e) {

    }
    finally {
      setIsLoading(false)
    }
  }, [addTransaction])

  const onContentChanged = (content) => {
    // TODO save to local storage
    setValue(content)
  }

  useEffect(() => {
    const fetchData = async () => {
      const blogName = await dBlogContract.blogName()
      setBlogName(blogName);
    }
    fetchData();
  }, [])


  return [isLoading, blogName, value, setPostTitle, onContentChanged, onRequestPublish]
}
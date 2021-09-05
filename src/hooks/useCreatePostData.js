import { useDBlogPostContract, useDBlogContract } from "./useContract"
import { useEffect, useCallback, useState } from 'react'
import { useQuery } from '../utils/routeUtils'
import { useHistory } from "react-router-dom"
import useUserTransactionContext from '../hooks/useUserTransactionContext'
import { transactionStates } from '../utils/enums'

export const useCreatePostData = blogId => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [blogName, setBlogName] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const history = useHistory();
  const dBlogContract = useDBlogContract(blogId)
  const sessionStorage = window.localStorage;

  const { addTransaction } = useUserTransactionContext()
  //const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const onRequestPublish = useCallback(async () => {
    setIsLoading(true)
    try {
      setTransactionState(transactionStates.REQUESTING)
      console.log(postTitle)
      var publishTransaction = () => dBlogContract.publishBlogPost(postTitle, value, ["mockTag1", "mockTag2", "mockTag3"], true)

      var onSuccess = () => {
        history.push(`/blog?id=${blogId}`);
      }

      var publishTx = await addTransaction(publishTransaction, onSuccess)
      // TODO wait for event. Need to update smart contract
      
      setTransactionState(transactionStates.SUBMIT)
    }
    catch(e) {
      setTransactionState(transactionStates.ERROR)
    }
    finally {
      setIsLoading(false)
    }
  }, [addTransaction, postTitle, value])

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
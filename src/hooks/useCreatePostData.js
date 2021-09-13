import { useDBlogPostContract, useDBlogContract } from "./useContract"
import { useEffect, useCallback, useState } from 'react'
import { useQuery } from '../utils/routeUtils'
import { useHistory } from "react-router-dom"
import useUserTransactionContext from '../hooks/useUserTransactionContext'
import { transactionStates } from '../utils/enums'
import { create } from 'ipfs-http-client'

// TODO limit to 1000 characters
export const useCreatePostData = blogId => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [blogName, setBlogName] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const history = useHistory();
  const dBlogContract = useDBlogContract(blogId)
  const sessionStorage = window.localStorage;

  
  /* Create an instance of the client */
  const client = create('https://ipfs.infura.io:5001/api/v0')

  const { addTransaction } = useUserTransactionContext()
  //const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const onRequestPublish = useCallback(async () => {
    setIsLoading(true)
    try {

      // write data to ipfs\
      const cid = await client.add(value)
      console.log(cid)

      setTransactionState(transactionStates.REQUESTING)

      // var options = { gasLimit: 85000, maxFeePerGas: 20, maxPriorityFeePerGas: 1000000000 }
      var publishTransaction = () => dBlogContract.publishBlogPost(postTitle, cid.path, ["mockTag1", "mockTag2", "mockTag3"], true)

      var onSuccess = () => {
        history.push(`/blog?id=${blogId}`);
      }

      var publishTx = await addTransaction(publishTransaction, onSuccess)
      // TODO wait for event. Need to update smart contract

      const added = await client.add(value)

      console.log(added)
      
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
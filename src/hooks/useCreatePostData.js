import { useDBlogContract } from "./useContract"
import { useEffect, useState } from 'react'
import { useHistory } from "react-router-dom"
import useUserTransactionContext from '../hooks/useUserTransactionContext'
import { transactionStates, ipfsUploadStates, transactionTypes } from '../utils/enums'
import { create } from 'ipfs-http-client'

export const useCreatePostData = blogId => {
  const [isLoading, setIsLoading] = useState(false)
  const [value, setValue] = useState('')
  const [blogName, setBlogName] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)
  const [ipfsUploadState, setIpfsUploadState] = useState(ipfsUploadStates.NO_UPLOAD)
  const [ipfsUploadCid, setIpfsUploadCid] = useState('')

  const history = useHistory();
  const dBlogContract = useDBlogContract(blogId)

  
  /* Create an instance of the client */
  const client = create('https://ipfs.infura.io:5001/api/v0')

  const { addTransaction } = useUserTransactionContext()
  //const [transactionState, setTransactionState] = useState(transactionStates.NO_REQUEST)

  const onRequestPublish = async () => {
    setIsLoading(true)

    // upload post content to ipfs
    let cid = null
    try {
      setIpfsUploadState(ipfsUploadStates.UPLOADING)
      cid = await client.add(value)
      setIpfsUploadCid(cid)
      setIpfsUploadState(ipfsUploadStates.SUCCESS)
    }
    catch(e) {
      setIpfsUploadCid('')
      setIpfsUploadState(ipfsUploadStates.ERROR)
      return;
    }

    try {
      setTransactionState(transactionStates.REQUESTING)

      console.log(postTitle)
      var publishTransaction = () => dBlogContract.publishBlogPost(postTitle, cid.path)

      var onSuccess = () => {
        history.push(`/blog?id=${blogId}`);
      }

      var publishTx = await addTransaction(publishTransaction, transactionTypes.CREATE_POST, onSuccess)

      setTransactionState(transactionStates.SUBMIT)
    }
    catch(e) {
      setTransactionState(transactionStates.ERROR)
    }
    finally {
      setIsLoading(false)
    }
  };

  const onContentChanged = (content) => {
    setValue(content)
  }

  const onTitleChanged = (title) => {

    console.log(title)
    setPostTitle(title)
  }

  useEffect(() => {
    const fetchData = async () => {
      const blogName = await dBlogContract.blogName()
      setBlogName(blogName);
    }
    fetchData();
  }, [])


  return [isLoading, transactionState, ipfsUploadState, blogName, value, onTitleChanged, onContentChanged, onRequestPublish]
}
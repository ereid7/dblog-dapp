import { useDBlogPostContract, useDBlogContract } from "./useContract"
import useUserTransactionContext from '../hooks/useUserTransactionContext'
import useActiveWeb3React from '../hooks/useActiveWeb3React'
import { getDBlogPostContract } from "../utils/contractHelpers"
import { useCallback } from 'react'

export const useLikePost = postAddress => {
  const { addTransaction } = useUserTransactionContext()
  const { library } = useActiveWeb3React()

  const onRequestLikePost = useCallback(async (postAddress, onLikePostSuccess) => {
    const postContract = getDBlogPostContract(postAddress, library.getSigner())
    var likeTransaction = () => postContract.likePost()

    await addTransaction(likeTransaction, onLikePostSuccess)
  }, [addTransaction])

  return [onRequestLikePost]
}
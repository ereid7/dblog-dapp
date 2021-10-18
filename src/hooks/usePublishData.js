import { useEffect, useState } from "react"
import { getDBlogContract, getDBlogPostContract, getDBlogFactoryContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogFactoryContract, useDBlogPostContract } from '../hooks/useContract'
import useEventsContext from '../hooks/useEventsContext'
import { transactionTypes } from "../utils/enums"
//import { useEventsContext}
import {
  useWeb3React, 
} from '@web3-react/core'

export const usePublishData = () => {
  const { active, account, library } = useWeb3React()
  const { on, remove, dispatch } = useEventsContext()
  //const { blogTransactions } = useUserTransactionContext()

  const [isLoading, setIsLoading] = useState(true)
	const [publishData, setPublishData] = useState({
    blogList: []
  })
  
  const dBlogFactoryContract = useDBlogFactoryContract("0x3d810Fe005e7983c7099845699B2899d0Ee3BDCc")

  console.log(dBlogFactoryContract)

  const fetchPublishData = async () => {
    // TODO try/catch
    setIsLoading(true)
    const blogCount = (await dBlogFactoryContract.addressBlogCounts(account)).toNumber()
    if (blogCount > 0) {
      var blogList = []
      for (var i = blogCount - 1; i >= 0; i--) {
        const blogId = await dBlogFactoryContract.addressBlogMap(account, i)
        const dBlogContract = getDBlogContract(blogId, library.getSigner())
        const blogName = await dBlogContract.blogName()
        const postCount = (await dBlogContract.postCount()).toNumber()
        const blogListItem = {
          blogAddress: blogId,
          blogName: blogName,
          postCount: postCount
        }
        blogList.push(blogListItem)
        setPublishData({blogList: blogList})
      }
    }
    setIsLoading(false)
  }

  const onTransactionSuccess = (response) => {
    if (response.type === transactionTypes.CREATE_BLOG) {
      fetchPublishData()
    }
  }


  useEffect(() => {
    // TODO events enum
    on("transaction-success", onTransactionSuccess)

    return () => {
      remove("transaction-success", onTransactionSuccess)
    }
  }, [])
  
  useEffect(() => {
    if (active && account !== undefined && dBlogFactoryContract !== undefined) {
        fetchPublishData()
    }
  }, [account])

  return [publishData.blogList, isLoading]
}
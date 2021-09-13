import { useEffect, useState } from "react"
import { getDBlogContract, getDBlogPostContract, getDBlogFactoryContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogFactoryContract, useDBlogPostContract } from '../hooks/useContract'
import {
  useWeb3React, 
} from '@web3-react/core'

export const usePublishData = () => {
  const { active, account, library } = useWeb3React()

  const [isLoading, setIsLoading] = useState(true)
	const [publishData, setPublishData] = useState({
    blogList: []
  })
  const dBlogFactoryContract = useDBlogFactoryContract("0x18d8a38eaF5dEB5FE1abb9c2A0Dbe9bC652873eF")

  // TODO load separately for l=the list
  
  useEffect(() => {
    if (active && account !== undefined) {
      const fetchPublishData = async () => {
        // TODO try/catch
        console.log(account)
        //const dBlogFactoryContract = getDBlogFactoryContract("0x99eE883F3739541953B2a24e8F1848b2A0987703")
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
      fetchPublishData()
    }
  }, [account])

  return [publishData.blogList, isLoading]
}
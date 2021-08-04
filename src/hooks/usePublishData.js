import { useEffect, useState } from "react"
import { getDBlogContract, getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogFactoryContract, useDBlogPostContract } from '../hooks/useContract'
import useActiveWeb3React from "./useActiveWeb3React"

export const usePublishData = () => {
  const { account, library } = useActiveWeb3React()

  const [isLoading, setIsLoading] = useState(true)
	const [publishData, setPublishData] = useState({
    blogList: []
  })
  const dBlogFactoryContract = useDBlogFactoryContract("0xb033fA08b485171FDf49987904Da11Eb7CA89A25")

  // TODO load separately for l=the list
  useEffect(() => {
    if (account !== undefined) {
      const fetchPublishData = async () => {
        const blogCount = (await dBlogFactoryContract.addressBlogCounts(account)).toNumber()
        if (blogCount > 0) {
          var blogList = []
          for (var i = 0; i < blogCount ; i++) {
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
            console.log(blogListItem)

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
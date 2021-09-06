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
  const dBlogFactoryContract = useDBlogFactoryContract("0x40a3c7EFDdabAFf712d2F550eBf1df7e3CA84b02")

  // TODO load separately for l=the list
  useEffect(() => {
    if (account !== undefined) {
      const fetchPublishData = async () => {
        // TODO try/catch
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
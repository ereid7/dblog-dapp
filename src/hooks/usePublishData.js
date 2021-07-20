import { useEffect, useState } from "react"
import { getDBlogContract, getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogFactoryContract, useDBlogPostContract } from '../hooks/useContract'
import useActiveWeb3React from "./useActiveWeb3React"

export const usePublishData = () => {
  const { account, library } = useActiveWeb3React()

  const [isLoading, setIsLoading] = useState(true)
	const [blogList, setBlogList] = useState([])
  const dBlogFactoryContract = useDBlogFactoryContract("0x8A457e2AE233BeC4FD35525325a5D9dFbE7a557a")

  useEffect(() => {
    if (account !== undefined) {
      const fetchPublishData = async () => {
        const blogCount = (await dBlogFactoryContract.addressBlogCounts(account)).toNumber()
        if (blogCount > 0) {
          var blogList = []
          for (var i = 0; i < 1; i++) {
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

            setBlogList(blogList)
          }
        }
        setIsLoading(false)
      }
      fetchPublishData()
    }
  }, [account])

  return [blogList, isLoading]
}
import { useEffect, useState } from "react"
import { getDBlogContract, getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogPostContract } from '../hooks/useContract'
import { getNumber } from '../utils/numberHelpers'

export const useBlogData = blogId => {
  const [isLoading, setIsLoading] = useState(true)
	const [blogData, setBlogData] = useState({
		blogId: blogId,
		title: '',
		postCount: 0,
		tagList:  [],
		postList: []
	})
  const dBlogContract = useDBlogContract(blogData.blogId)

  useEffect(() => {
    const fetchBlogData = async () => {
      const title = await dBlogContract.blogName()
      const postCount = await dBlogContract.postCount()
      console.log(postCount.toNumber())
  
  
      var postList = []
      for (var i = 0; i < postCount; i++) {
        const postAddress = await dBlogContract.postMap(i + 1)
  
        const postContract = getDBlogPostContract(postAddress)
        const postTitle = await postContract.title() 
        
        const postNum = getNumber(await postContract.postNum())
        const postLikes = getNumber(await postContract.likeCount())
        // TODO store creationdate
        var postListItem = {
          address: postAddress,
          title: postTitle,
          postNum: postNum,
          likes: postLikes
        }
        postList.push(postListItem);
      }
  
      const setPartBlogData = (partialData) => setBlogData({ ...blogData, ...partialData })
      setPartBlogData({
        title: title,
        postCount: postCount,
        tagList: [],
        postList: postList
      })
  
      setIsLoading(false)
    }

    fetchBlogData()
  }, [])

  return [blogData, isLoading]
}
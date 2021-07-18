import { useEffect, useState } from "react"
import { getDBlogContract, getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogPostContract } from '../hooks/useContract'

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
  console.log(dBlogContract)


  useEffect(() => {
    const fetchBlogData = async () => {
      const title = await dBlogContract.blogName()
      const postCount = (await dBlogContract.postCount()).toNumber()
      const postAddress = await dBlogContract.postMap(1)
  
      var postList = []
      for (var i = 0; i < postCount; i++) {
        const postAddress = await dBlogContract.postMap(i + 1)
  
        const postContract = getDBlogPostContract(postAddress)
        const postTitle = await postContract.title() 
        
        const postNum = (await postContract.postNum()).toNumber()
        const postLikes = (await postContract.likeCount()).toNumber()
        // TODO store creationdate
        var postListItem = {
          address: postAddress,
          title: postTitle,
          postNum: postNum,
          likes: postLikes
        }
        console.log(postListItem)
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
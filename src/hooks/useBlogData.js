import { useEffect, useState } from "react"
import { getDBlogContract, getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogPostContract } from '../hooks/useContract'

export const useBlogData = blogId => {
  const [isLoading, setIsLoading] = useState(false)
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
      const setPartBlogData = (partialData) => setBlogData({ ...blogData, ...partialData })
      const title = await dBlogContract.blogName()
      const postCount = (await dBlogContract.postCount()).toNumber()
      const postAddress = await dBlogContract.postMap(1)

      setPartBlogData({
        title: title,
        postCount: postCount,
        tagList: [],
      })
  
      var postList = []
      for (var i = postCount; i > 0; i--) {
        const postAddress = await dBlogContract.postMap(i)
        const postContract = getDBlogPostContract(postAddress)
        const postTitle = await postContract.title() 
        
        const postNum = 0 //(await postContract.postNum()).toNumber()
        const postLikes = (await postContract.likeCount()).toNumber()
        // TODO store creationdate
        var postListItem = {
          address: postAddress,
          title: postTitle,
          postNum: postNum,
          likes: postLikes
        }
        postList.push(postListItem);

        setPartBlogData({
          title: title,
          postCount: postCount,
          postList: postList
        })
      }
  
  
      //setIsLoading(false)
    }

    fetchBlogData()
  }, [])

  return [blogData, isLoading]
}
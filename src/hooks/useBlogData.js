import { useEffect, useState } from "react"
import { getDBlogContract, getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogPostContract } from '../hooks/useContract'
import useActiveWeb3React from '../hooks/useActiveWeb3React'

// TODO create load more button
export const useBlogData = blogId => {
  const { account } = useActiveWeb3React()
  const [isLoading, setIsLoading] = useState(true)
  const [isPostsLoading, setIsPostsLoading] = useState(true)
	const [blogData, setBlogData] = useState({
		blogId: blogId,
		title: '',
		postCount: 0,
		tagList:  [],
		postList: []
	})
  const dBlogContract = useDBlogContract(blogData.blogId)
  const [isBlogOwner, setIsBlogOwner] = useState(false)

  // TODO update this file to useBlogPageData. 
  // Create useBlogData hook which getches blog specific data, which this hook uses

  // detect if current account is blog owner
  useEffect(() => {
    if (account !== undefined) {
      const fetchOwner = async () => {
        const owner = await dBlogContract.owner()
  
        setIsBlogOwner(owner === account)
      }
      fetchOwner()
    }
  }, [account])

  useEffect(() => {
    const fetchBlogData = async () => {
      const setPartBlogData = (partialData) => setBlogData({ ...blogData, ...partialData })
      const title = await dBlogContract.blogName()
      var postCount = (await dBlogContract.postCount()).toNumber()

      //postCount = postCount > 8 ? 8 : postCount;
    
      setPartBlogData({
        title: title,
        postCount: postCount,
        tagList: [],
      })
  
      setIsLoading(false)
      var postList = []
      for (var i = postCount; i > 0; i--) {
        const postAddress = await dBlogContract.postMap(i)
        const postContract = getDBlogPostContract(postAddress)
        const postTitle = await postContract.title() 
        
        const postNum = 0 //(await postContract.postNum()).toNumber()
        const postLikes = (await postContract.likeCount()).toNumber()
        // TODO store creationdate (in contract?)
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
      setIsPostsLoading(false)
    }

    console.log(blogData)
    if (blogData.title.length < 1) {
      fetchBlogData()
    }
  }, [])

  return [blogData, isLoading, isBlogOwner, isPostsLoading]
}
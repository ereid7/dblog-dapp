import { useEffect, useState } from "react"
import { getDBlogContract, getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogPostContract } from '../hooks/useContract'
import useActiveWeb3React from '../hooks/useActiveWeb3React'

import { useSelector, useDispatch } from 'react-redux'

// TODO create load more button
export const useBlogData = blogId => {
  const sessionStorage = window.sessionStorage;

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
    
// TODO check if latest loaded blog address is latest that exists. If not, reload data
    const checkSessionData = async () => {
      var existingBlogData = sessionStorage.getItem(`dBlogData_${blogId}`)
      console.log(existingBlogData)

      if (existingBlogData !== null) {

        const latestAddress = await dBlogContract.postMap(0)
        if (blogData.postList[0].address === latestAddress) {
          console.log("UP TO DATE")
        }
  
        setBlogData(JSON.parse(existingBlogData))
        setIsLoading(false)
        setIsPostsLoading(false)
  
  
        return;
      }
    }

    const fetchBlogData = async () => {
      const setPartBlogData = (partialData) => setBlogData({ ...blogData, ...partialData })
      const title = await dBlogContract.blogName()
      var postCount = (await dBlogContract.postCount()).toNumber()
      var postsToLoad = postCount > 10 ? 10 : postCount;
    
      setPartBlogData({
        title: title,
        postCount: postCount,
        tagList: [],
      })
  
      setIsLoading(false)
      var postList = []
      for (var i = postCount; i > postCount - postsToLoad; i--) {
        const postAddress = await dBlogContract.postMap(i)
        const postContract = getDBlogPostContract(postAddress)
        const postTitle = await postContract.title() 
        
        const postNum = 0 
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

    if (blogData.title.length < 1) {
      fetchBlogData()
    }
  }, [])

  useEffect(() => {
    sessionStorage.setItem(`dBlogData_${blogId}`, JSON.stringify(blogData))
  }, [blogData])

  return [blogData, isLoading, isBlogOwner, isPostsLoading]
}
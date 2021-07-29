import { useEffect, useState, useCallback } from "react"
import { getDBlogContract, getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogPostContract } from '../hooks/useContract'
import useActiveWeb3React from '../hooks/useActiveWeb3React'
import { useSessionStorageMap } from "./useSessionStorageMap"

// TODO create load more button
// TODO fix this hook
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
  const setPartBlogData = (partialData) => setBlogData({ ...blogData, ...partialData })
  const dBlogContract = useDBlogContract(blogData.blogId)
  const [isBlogOwner, setIsBlogOwner] = useState(false)

  var [setBlogMapItem, remove, getBlogMapItem, clearBlogMap] = useSessionStorageMap("dBlogDataMap")

  // TODO fix postcreated event subscription
  const postCreatedHandler = useCallback(async (postAddress) => {
    const postContract = getDBlogPostContract(postAddress)
    const postTitle = await postContract.title() 
    const postNum = (await postContract.postNum()).toNumber()
    const postLikes = (await postContract.likeCount()).toNumber()
    // TODO store creationdate (in contract?)
    var postListItem = {
      address: postAddress,
      title: postTitle,
      postNum: postNum,
      likes: postLikes,
    }
    console.log("postcreatedhandler called")
    setPartBlogData({
      postList: [postListItem].concat(blogData.postList)
    })
  }, [])

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

  // TODO setup contract event listeners
  // useEffect(() => {
  //   if (!isPostsLoading) {
  //     dBlogContract.on('PostCreated', postCreatedHandler)
  //   }

  //   return () => {
  //     dBlogContract.removeAllListeners('PostCreated')
  //   }
  // }, [blogDataExists])

  useEffect(() => {
    // TODO store this in method or hook. Clears data if browser refresh, but not navigate with back/forward buttons
    if(window.location.href == window.sessionStorage.getItem("origin")){
      clearBlogMap()
    }

    // TODO check if latest loaded blog address is latest that exists. If not, reload data

    const checkUpToDate = async (existingBlogData) => {
      const postCount = (await dBlogContract.postCount()).toNumber()
      return existingBlogData.postList[0].postNum === postCount
    }

    // TODO separate into post and blog data
    const fetchBlogData = async () => {
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
        
        const postNum = (await postContract.postNum()).toNumber()
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

    var existingBlogData = getBlogMapItem(blogData.blogId) 
    var blogDataExists = existingBlogData != null
    if (blogDataExists) {
      // fetch post data if not up to date
      checkUpToDate(existingBlogData).then((upToDate) => {
        if (upToDate) {
          setBlogData(existingBlogData)

          setIsLoading(false)
          setIsPostsLoading(false)
        }
        else {
          fetchBlogData()

          return
        }
      })
    }

    if (blogData.title.length < 1 && !blogDataExists) {
      fetchBlogData()
    }
  }, [])

  useEffect(() => {
    setBlogMapItem(blogData.blogId, blogData)
  }, [blogData])

  return [blogData, isLoading, isBlogOwner, isPostsLoading]
}
import { useEffect, useState, useCallback } from "react"
import { getDBlogContract, getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract, useDBlogPostContract } from '../hooks/useContract'
import useActiveWeb3React from '../hooks/useActiveWeb3React'
import { useSessionStorageMap } from "./useSessionStorageMap"

export const useBlogData = blogId => {
  const { account } = useActiveWeb3React()
  const [isLoading, setIsLoading] = useState(true)
  const [isPostsLoading, setIsPostsLoading] = useState(true)
  const [postsLoaded, setPostsLoaded] = useState(0);
  const [isBlogOwner, setIsBlogOwner] = useState(false)

	const [blogData, setBlogData] = useState({
		title: '',
		tagList:  []
	})
  const [blogPostData, setBlogPostData] = useState({
    postList: []
  })
  const [postCount, setPostCount] = useState(0)
  const dBlogContract = useDBlogContract(blogId)

  var [setBlogMapItem, remove, getBlogMapItem, clearBlogMap] = useSessionStorageMap("dBlogDataMap")

  // TODO fix postcreated event subscription
  // const postCreatedHandler = useCallback(async (postAddress) => {
  //   const postContract = getDBlogPostContract(postAddress)
  //   const postTitle = await postContract.title() 
  //   const postNum = (await postContract.postNum()).toNumber()
  //   const postLikes = (await postContract.likeCount()).toNumber()
  //   // TODO store creationdate (in contract?)
  //   var postListItem = {
  //     address: postAddress,
  //     title: postTitle,
  //     postNum: postNum,
  //     likes: postLikes,
  //   }
  //   console.log("postcreatedhandler called")
  //   setPartBlogData({
  //     postList: [postListItem].concat(blogData.postList)
  //   })
  // }, [])

  const fetchBlogData = useCallback(async () => {
    const title = await dBlogContract.blogName()
    var postCount = (await dBlogContract.postCount()).toNumber()
    setPostCount(postCount)
  
    setBlogData({
      title: title,
      tagList: [],
    })

    setIsLoading(false)
  }, [])

  const fetchPostList = useCallback(async () => {
    setIsPostsLoading(true)
    //var postCount = (await dBlogContract.postCount()).toNumber()
    var postsToLoad = postCount > 10 ? 10 : postCount;

    var postList = blogPostData.postList
    var startingIndex = postCount - postsLoaded;

    for (var i = startingIndex; i > startingIndex - postsToLoad; i--) {
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
      setBlogPostData({
        postList: postList
      })
    }
    setPostsLoaded(postList.length)
    setIsPostsLoading(false)
  }, [postCount])

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
    const checkUpToDate = async (existingBlogData) => {
      const postCount = (await dBlogContract.postCount()).toNumber()
      return existingBlogData.postList[0].postNum === postCount
    }

    var existingBlogData = getBlogMapItem(blogId) 
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
          fetchPostList()

          return
        }
      })
    }

    if (blogData.title.length < 1 && !blogDataExists) {
      fetchBlogData()
      fetchPostList()
    }
  }, [postCount])

  useEffect(() => {
    setBlogMapItem(blogData.blogId, blogData)
  }, [blogData])

  return [blogData, blogPostData.postList, isLoading, isBlogOwner, isPostsLoading, fetchPostList]
}
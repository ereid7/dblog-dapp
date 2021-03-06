import { useEffect, useState, useCallback } from "react"
import { getDBlogPostContract } from "../utils/contractHelpers"
import { useDBlogContract } from '../hooks/useContract'
import useActiveWeb3React from '../hooks/useActiveWeb3React'
import useEventsContext from '../hooks/useEventsContext'
import { useSessionStorageMap } from "./useSessionStorageMap"

export const useBlogData = blogId => {
  const { account } = useActiveWeb3React()
  const [postsLoaded, setPostsLoaded] = useState(0);
  const [isBlogOwner, setIsBlogOwner] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isPostsLoading, setIsPostsLoading] = useState(true)
  const [isSearchResults, setIsSearchResults] = useState(false)
  
	const [blogData, setBlogData] = useState({
		title: '',
		tagList:  []
	})
  const [blogPostData, setBlogPostData] = useState({
    postList: []
  })
  const [postCount, setPostCount] = useState(0)
  const eventsContext = useEventsContext()

  const dBlogContract = useDBlogContract(blogId)

  var [setBlogMapItem, remove, getBlogMapItem, clearBlogMap] = useSessionStorageMap("dBlogDataMap")

  const postCreatedHandler = useCallback(async (postAddress) => {
    console.log(postAddress)
    const postContract = getDBlogPostContract(postAddress)
    const postTitle = await postContract.title() 
    const postNum = (await postContract.postNum()).toNumber()
    const postLikes = (await postContract.likeCount()).toNumber()
    var postListItem = {
      address: postAddress,
      title: postTitle,
      postNum: postNum,
      likes: postLikes,
    }
    console.log("postcreatedhandler called")
    setBlogPostData({
      postList: [postListItem].concat(blogPostData.postList)
    })
  }, [])

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
    var postsToLoad = postCount > 10 ? 10 : postCount;
    var postList = blogPostData.postList
    var startingIndex = postCount - postsLoaded;

    for (var i = startingIndex; i > startingIndex - postsToLoad; i--) {
      const postAddress = await dBlogContract.postMap(i)
      const postContract = getDBlogPostContract(postAddress)
      const postTitle = await postContract.title() 
      
      const postNum = i
      const postLikes = (await postContract.likeCount()).toNumber()
      const currentAccountLiked = account == undefined ? false : await postContract.likers(account)
   
      var postListItem = {
        address: postAddress,
        title: postTitle,
        postNum: postNum,
        likes: postLikes,
        liked: currentAccountLiked,
      }
      postList.push(postListItem);
      setBlogPostData({
        postList: postList
      })
    }
    setPostsLoaded(postList.length)
    setIsPostsLoading(false)
  }, [postCount, postsLoaded])

  // detect if current account is blog owner
  useEffect(() => {
    console.log(account)
    if (account !== undefined) {
      const fetchOwner = async () => {
        const owner = await dBlogContract.owner()
  
        setIsBlogOwner(owner === account)
      }
      fetchOwner()
    }
    else {
      setIsBlogOwner(false)
    }
  }, [account])

  const searchPostList = useCallback(async (searchQuery) => {
    setIsPostsLoading(true)
    setIsSearchResults(true)
    if (Number.isInteger(parseInt(searchQuery))) {

    } 
    else {
      var postResultList = []
      setBlogPostData({
        postList: postResultList
      })
      for (var i = postCount; i > 0; i--) {
        const postAddress = await dBlogContract.postMap(i)
        const postContract = getDBlogPostContract(postAddress)
        const postTitle = await postContract.title()
        console.log(postTitle.toLowerCase())
        if (postTitle.toLowerCase().includes(searchQuery)) {
          const postNum = i//(await postContract.postNum()).toNumber()
          const postLikes = (await postContract.likeCount()).toNumber()

          var postListItem = {
            address: postAddress,
            title: postTitle,
            postNum: postNum,
            likes: postLikes
          }
          postResultList.push(postListItem)
          setBlogPostData({
            postList: postResultList
          })
        }
      }
    }
    setIsPostsLoading(false)
  }, [postCount])

  useEffect(() => {
    if (!isPostsLoading) {
      dBlogContract.on('PostCreated', postCreatedHandler)
    }
    return () => {
      dBlogContract.removeAllListeners('PostCreated')
    }
  }, [dBlogContract])

  useEffect(() => {
    if(window.location.href == window.sessionStorage.getItem("origin")){
      clearBlogMap()
    }
    const checkUpToDate = async (existingBlogData) => {
      const postCount = (await dBlogContract.postCount()).toNumber()
      setPostCount(postCount)
      return existingBlogData.blogPostData.postList[0]?.postNum === postCount
    }

    var existingBlogData = getBlogMapItem(blogId) 
    var blogDataExists = existingBlogData != null
    if (blogDataExists) {
      // fetch post data if not up to date
      checkUpToDate(existingBlogData).then((upToDate) => {
        if (upToDate) {
          setBlogData(existingBlogData.blogData)
          setBlogPostData(existingBlogData.blogPostData)
          setPostsLoaded(existingBlogData.blogPostData.postList.length)

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
  }, [isLoading])

  useEffect(() => {
    var mapItem = {blogData, blogPostData}
    setBlogMapItem(blogId, mapItem)
  }, [blogData, blogPostData])

  return [blogData, blogPostData.postList, isLoading, isBlogOwner, isPostsLoading, postCount, fetchPostList, searchPostList]
}
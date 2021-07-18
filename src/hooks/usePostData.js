import { useEffect, useState } from "react"
import { getDBlogContract } from "../utils/contractHelpers"
import { useDBlogPostContract } from '../hooks/useContract'
import { getNumber } from '../utils/numberHelpers'

export const usePostData = postId => {
  const [isLoading, setIsLoading] = useState(true)
  const [postData, setPostData] = useState({
    postId: postId,
    postNum: 0,
    title: '',
    content: '',
    likeCount: 0,
    blogAddress: '',
    blogName: '',
    tagList: []
  })
  const dBlogPostContract = useDBlogPostContract(postData.postId)

  useEffect(() => {
    const fetchPostData = async () => {
      const blogAddress = await dBlogPostContract.blog()
      const dBlogContract = getDBlogContract(blogAddress)
      const postNum = getNumber(await dBlogPostContract.postNum())// TODO why bignumber
      const title = await dBlogPostContract.title()
      const content = await dBlogPostContract.content()
      const blogName = await dBlogContract.blogName()
      const likeCount = getNumber(await dBlogPostContract.likeCount())

      const setPartPostData = (partialData) => setPostData({ ...postData, ...partialData })
      setPartPostData({
        postNum: postNum,
        title: title,
        content: content,
        likeCount: likeCount,
        blogAddress: dBlogContract.address,
        blogName: blogName,
        tagList: []
      })
      setIsLoading(false)
    }

    fetchPostData()
  }, [])

  return [postData, isLoading]
}

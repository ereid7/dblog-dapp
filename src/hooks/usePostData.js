import { useEffect, useState } from "react"
import { getDBlogContract } from "../utils/contractHelpers"
import { useDBlogPostContract } from '../hooks/useContract'

export const usePostData = postId => {
  const [isLoading, setIsLoading] = useState(true)
  const [postData, setPostData] = useState({
    creationTimestamp: '',
    postNum: 0,
    title: '',
    content: '',
    likeCount: 0,
    blogAddress: '',
    blogName: '',
    tagList: []
  })
  const dBlogPostContract = useDBlogPostContract(postId)

  // TODO create ipfs provider hook

  useEffect(() => {
    const fetchPostData = async () => {
      const blogAddress = await dBlogPostContract.blog()
      const dBlogContract = getDBlogContract(blogAddress)
      const postNum = (await dBlogPostContract.postNum()).toNumber()
      const title = await dBlogPostContract.title()
      const contentIpfsCid = await dBlogPostContract.contentIpfsCid()
      const blogName = await dBlogContract.blogName()
      const likeCount = (await dBlogPostContract.likeCount()).toNumber()
      let content = await fetch(`https://gateway.pinata.cloud/ipfs/${contentIpfsCid}`);
      let contentText = await content.text();

      const setPartPostData = (partialData) => setPostData({ ...postData, ...partialData })
      setPartPostData({
        postNum: postNum,
        title: title,
        content: contentText,
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

import { useDBlogPostContract, useDBlogContract } from "./useContract"
import { useEffect } from 'react'

export const useCreatePostData = () => {
  const [isLoading, setIsLoading] = useState(false)
  const dBlogContract = useDBlogContract(blogId)

  const onRequestPublish = async () => {
    setIsLoading(true)
    try {
      console.log(await dBlogContract.owner())
      await dBlogContract.publishBlogPost(postTitle, value, ["mockTag1", "mockTag2", "mockTag3"], true)
      // TODO wait for event. Need to update smart contract
    }
    catch(e) {

    }
    finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const blogName = await dBlogContract.blogName()
      setBlogName(blogName);
    }
    fetchData();
  }, [])
}
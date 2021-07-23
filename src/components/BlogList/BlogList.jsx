import BlogListItem from './BlogListItem'

const BlogList = (props) => {
  return (
    <div className="blog-list">
    {
      props?.blogList.map((value, index) => {
        return (
          <BlogListItem id={`blog_list_item_${index}`} {...value}></BlogListItem>
        )
      })
    }
    </div>
  )
}

export default BlogList
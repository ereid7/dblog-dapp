import BlogListItem from './BlogListItem'
import Spinner from 'react-bootstrap/Spinner';

const BlogList = (props) => {
  return (
    <div className="blog-list">
    {
      props?.blogList?.map((value, index) => {
        return (
          <BlogListItem key={`post_list_item_${index}`} id={`blog_list_item_${index}`} {...value}></BlogListItem>
        )
      })
    }
    <div className='post-list-spinner'>
		{ props.isLoading ? (
				<Spinner className="loading-spinner" animation="border" variant="secondary" />
			) : '' }</div>
    </div>
  )
}

export default BlogList
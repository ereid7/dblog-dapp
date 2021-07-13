import React, { Component } from "react"
import "./BlogPage.css"
import { withRouter } from 'react-router-dom';

class BlogPage extends Component {

  constructor(props) {
    super(props)
    this.state = {
      blogId: "",
      dBlogContract: {},
      title: "",
      tagList: ["tag1", "tag2"]
    }
  }

  render() {
    return (
      <div className="blog-page">

      </div>
    );
  }
}

export default withRouter(BlogPage)
import React, { Component } from "react"
import "./PostPage.css"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import TagList from '../Tags/TagList';
import DBlogPostContract from '../../abis/DBlogPostContract.json'
import { ReactComponent as LikeIcon } from '../../assets/icons/hand-thumbs-up.svg'
import { withRouter } from 'react-router-dom';


class PostPage extends Component {

  async componentDidMount() {
    const search = this.props.location.search;    
    const postId = new URLSearchParams(search).get("postId");

    console.log(postId)
    if (postId == null) {

      this.props.history.push('/read')
    }
    else {
      this.setState({ postId: postId })
      await this.fetchPostData(postId)
    }
  }

  async fetchPostData(postId) {
    const web3 = window.web3
    const testAddress = postId

    //const networkId = await web3.eth.net.getId();
    const dBlogPostContract = new web3.eth.Contract(DBlogPostContract.abi, testAddress)
    this.setState({ dBlogPostContract })

    const title = await dBlogPostContract.methods.title().call()
    this.setState({ title })
  }

  constructor(props) {
    super(props)
    this.state = {
      postId: "",
      dBlogPostContract: {},
      title: "",
      tagList: ["tag1", "tag2"]
    }
  }

  render() {
    return (
      <div className="post-page">
        <div className="post-page-container">
          <h1 className="post-title">{this.state.title}</h1>
          <div className="post-subtitle-container">
            <p>Evan's Blog - Post 20 - 5/12/2021</p>
          </div>
          <div className="post-content">
          When I was growing up in the 1960s and 70s, the chief fear on behalf of literary culture was that television was going to destroy it. What if we were becoming a nation of passive, glassy-eyed couch potatoes — mindless consumers of numbing video entertainment?
To some extent, that happened. Yet we survived! And then something came along that challenged TV. The Web was a two-way medium. Each consumer was also a potential creator or contributor in a way that never happened, couldn’t happen, with television. That’s a huge transformation of our media landscape, And we’re still just getting our heads around it.
          </div>
          <br />
          <TagList tagList={this.state.tagList}></TagList>
          <div className="post-footer-container">
            <div className="likes-display">
              <LikeIcon height="25px" width="25px" />
              <p className="likes-value">{0}</p>
            </div>
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default withRouter(PostPage)
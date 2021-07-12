import React, { Component } from "react"
import "./PostPage.css"
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import TagList from '../Tags/TagList';
import DBlogPostContract from '../../abis/DBlogPostContract.json'


// function useQuery() {
//   return new URLSearchParams(useLocation().search);
// }

class PostPage extends Component {

  async componentDidMount() {
    await this.fetchPostData()
  }

  async fetchPostData() {
    const web3 = window.web3

    const testAddress = "0x46cb4522eE3fb769233F6dEe2e2c6d75B24783d1"

    //const networkId = await web3.eth.net.getId();
    const dBlogPostContract = new web3.eth.Contract(DBlogPostContract.abi, testAddress)
    this.setState({ dBlogPostContract })

    const title = await dBlogPostContract.methods.title().call()
    console.log(title)
    this.setState({ title })
  }

  constructor(props) {
    super(props)
    this.state = {
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
          <hr />
          <div className="post-tags-container">
            <TagList tagList={this.state.tagList}></TagList>
          </div>
          <div className="post-footer-container">
            
          </div>
          <hr />
        </div>
      </div>
    );
  }
}

export default PostPage